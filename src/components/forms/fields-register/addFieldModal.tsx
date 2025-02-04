"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useShallow } from "@/store";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGlobalStore } from "@/store";
import { compressImage } from "@/utils/utils";
import { X } from "lucide-react";
import { ScheduleSelector } from "./scheduleSelector";
import { toast } from "@/hooks/use-toast";
import { formatCOP, parseCOP } from "@/utils/utils";
import { registerField } from "@/actions/registro_host/field";
interface FieldFormData {
  nombre: string;
  tipo: string;
  capacidad: number;
  descripcion: string;
  precioHora: number;
  imagenes: FileList;
}

interface AddFieldModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddFieldModal({ open, onOpenChange }: AddFieldModalProps) {
  const [images, setImages] = useState<{ preview: string; base64: string }[]>(
    []
  );
  const [displayPrice, setDisplayPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { field } = useGlobalStore();
  const auth = useGlobalStore(useShallow((state) => state.auth));
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldFormData>();

  // Función para limpiar todos los estados
  const clearForm = () => {
    setImages([]);
    setDisplayPrice("");
    reset(); // Limpia el formulario
    useGlobalStore.getState().clearStore("field"); // Limpia el estado global
  };

  // Manejar el cierre del modal
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      clearForm();
    }
    onOpenChange(open);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > 5) {
      toast({
        title: "Solo se permiten hasta 5 imágenes",
        variant: "destructive",
      });
      return;
    }

    const newImages = await Promise.all(
      Array.from(files).map(async (file) => {
        const preview = URL.createObjectURL(file);
        const base64 = await compressImage(file);
        return { preview, base64 };
      })
    );

    e.target.value = "";

    setImages((prev) => [...prev, ...newImages]);

    useGlobalStore.getState().updateStore("field", {
      field_images: [
        ...images.map((img) => img.base64),
        ...newImages.map((img) => img.base64),
      ],
    });
  };

  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);

    useGlobalStore.getState().updateStore("field", {
      field_images: newImages.map((img) => img.base64),
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseCOP(e.target.value);
    const formattedValue = formatCOP(rawValue);
    setDisplayPrice(formattedValue);
    setValue("precioHora", rawValue);
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        capacidad: parseInt(data.capacidad.toString()),
        precioHora: parseCOP(data.precioHora.toString()),
      };

      if (images.length === 0) {
        toast({
          title: "Error",
          description: "Debes agregar al menos una imagen",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!field.field_schedule || field.field_schedule.length === 0) {
        toast({
          title: "Error",
          description: "Debes agregar al menos un horario",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      useGlobalStore.getState().updateStore("field", {
        field_name: formattedData.nombre,
        field_description: formattedData.descripcion,
        field_price: formattedData.precioHora,
        field_type: formattedData.tipo,
        field_capacity: formattedData.capacidad,
        field_images: images.map((img) => img.base64),
      });

      if (auth.id) {
        await registerField(
          useGlobalStore.getState().field,
          auth.id.toString()
        );
      } else {
        toast({
          title: "Error",
          description: "No se pudo obtener el ID del usuario",
          variant: "destructive",
        });
      }

      toast({
        title: "Éxito",
        description: "Cancha guardada correctamente",
      });
      clearForm();
      handleOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al guardar la cancha",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-none w-[80vw] h-[90vh] border overflow-y-auto overflow-x-hidden p-20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Agregar Nueva Cancha
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="info"
              className="data-[state=active]:bg-[#46C556] data-[state=active]:text-white"
            >
              Información de la Cancha
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-[#46C556] data-[state=active]:text-white"
            >
              Horarios de la Cancha
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label
                  htmlFor="imagenes"
                  className="text-center text-xl text-[#1A6B51] font-bold"
                >
                  AGREGA IMÁGENES DE TU CANCHAS ({images.length}/5)
                </Label>
                {images.length < 5 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <Input
                      id="imagenes"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      {...register("imagenes")}
                      onChange={handleImageChange}
                    />
                    <Label
                      htmlFor="imagenes"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <div className="w-full h-64 bg-gray-100 rounded-lg mb-4" />
                      <p className="text-center text-sm text-gray-500">
                        Arrastra y suelta las imágenes aquí o haz clic para
                        seleccionar
                      </p>
                    </Label>
                  </div>
                )}

                {images.length > 0 && (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {images.map((image, index) => (
                        <CarouselItem
                          key={index}
                          className="basis-1/3 relative"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full"
                            onClick={() => handleDeleteImage(index)}
                          >
                            <X className="h-4 w-4 text-white" />
                          </Button>
                          <img
                            src={image.preview}
                            alt={`Cancha ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre de la cancha</Label>
                  <Input
                    id="nombre"
                    {...register("nombre", {
                      required: "El nombre es requerido",
                    })}
                  />
                  {errors.nombre && (
                    <p className="text-sm text-red-500">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de cancha</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("tipo", value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="futbol5">Fútbol 5</SelectItem>
                      <SelectItem value="futbol7">Fútbol 7</SelectItem>
                      <SelectItem value="futbol11">Fútbol 11</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacidad">Capacidad de jugadores</Label>
                  <Input
                    id="capacidad"
                    type="number"
                    {...register("capacidad", {
                      required: "La capacidad es requerida",
                      min: { value: 1, message: "Mínimo 1 jugador" },
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="precioHora">Precio por hora</Label>
                  <Input
                    id="precioHora"
                    type="text"
                    value={displayPrice}
                    placeholder="0"
                    {...register("precioHora", {
                      required: "El precio es requerido",
                      min: {
                        value: 1000,
                        message: "El precio debe ser mayor a 1000",
                      },
                      validate: {
                        isNumber: (value) =>
                          !isNaN(parseCOP(value.toString())) ||
                          "Debe ser un número válido",
                      },
                      onChange: handlePriceChange,
                    })}
                  />
                  {errors.precioHora && (
                    <p className="text-sm text-red-500">
                      {errors.precioHora.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  {...register("descripcion", {
                    required: "La descripción es requerida",
                  })}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleSelector />
          </TabsContent>
        </Tabs>

        <form onSubmit={onSubmit}>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#46C556] text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">🕒</span>
                  Guardando...
                </>
              ) : (
                "Guardar"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
