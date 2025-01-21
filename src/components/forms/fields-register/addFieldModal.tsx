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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldFormData>();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = await Promise.all(
      Array.from(files).map(async (file) => {
        const preview = URL.createObjectURL(file);

        const base64 = await compressImage(file);

        return { preview, base64 };
      })
    );

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                  AGREGA IMÁGENES DE TU CANCHAS
                </Label>
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
                    type="number"
                    {...register("precioHora", {
                      required: "El precio es requerido",
                      min: { value: 0, message: "El precio debe ser positivo" },
                    })}
                  />
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

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-[#46C556] text-white">Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
