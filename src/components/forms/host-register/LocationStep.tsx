import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormReturn,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import CustomMap from "@/components/georeference/map";

interface LocationStepProps {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
  form: UseFormReturn<FormData>;
  getGeolocation: (address: string) => Promise<any>;
}

const BOGOTA_COORDS = { lat: 4.60971, lng: -74.08175 };

export function LocationStep({
  register,
  setValue,
  errors,
  form,
  getGeolocation,
}: LocationStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(BOGOTA_COORDS);

  useEffect(() => {
    const lat = form.watch("latitud");
    const lng = form.watch("longitud");

    if (lat && lng) {
      setMapCenter({ lat, lng });
    }
  }, [form.watch("latitud"), form.watch("longitud")]);

  const handleCheckboxChange = (
    field: "aceptoTerminos" | "aceptoPrivacidad"
  ) => {
    setValue(field, !form.watch(field), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  return (
    <form className="space-y-4 relative">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Ubicación</h2>
      <Label className="block text-sm md:text-base">
        Finalizamos con la información de la ubicación. Completa la información
        para continuar. Todos los campos son requeridos.
      </Label>
      <div className="space-y-2">
        <Label htmlFor="direccion">Dirección*</Label>
        <Input
          id="direccion"
          {...register("direccion", {
            required: "La dirección es requerida",
          })}
        />
        {errors.direccion && (
          <p className="text-sm text-red-500">{errors.direccion.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="localidad">Localidad*</Label>
        <Select
          {...register("localidad", { required: "La localidad es requerida" })}
          onValueChange={(value) =>
            setValue("localidad", value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una localidad" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px] bg-white">
            <SelectItem value="usaquen">Usaquén</SelectItem>
            <SelectItem value="chapinero">Chapinero</SelectItem>
            <SelectItem value="santafe">Santa Fe</SelectItem>
            <SelectItem value="sancristobal">San Cristóbal</SelectItem>
            <SelectItem value="usme">Usme</SelectItem>
            <SelectItem value="tunjuelito">Tunjuelito</SelectItem>
            <SelectItem value="bosa">Bosa</SelectItem>
            <SelectItem value="kennedy">Kennedy</SelectItem>
            <SelectItem value="fontibon">Fontibón</SelectItem>
            <SelectItem value="engativa">Engativá</SelectItem>
            <SelectItem value="suba">Suba</SelectItem>
            <SelectItem value="barriosunidos">Barrios Unidos</SelectItem>
            <SelectItem value="teusaquillo">Teusaquillo</SelectItem>
            <SelectItem value="martires">Los Mártires</SelectItem>
            <SelectItem value="antonionarino">Antonio Nariño</SelectItem>
            <SelectItem value="puente">Puente Aranda</SelectItem>
            <SelectItem value="candelaria">La Candelaria</SelectItem>
            <SelectItem value="rafaeluribe">Rafael Uribe Uribe</SelectItem>
            <SelectItem value="ciudadbolivar">Ciudad Bolívar</SelectItem>
            <SelectItem value="sumapaz">Sumapaz</SelectItem>
          </SelectContent>
        </Select>
        {errors.localidad && (
          <p className="text-sm text-red-500">{errors.localidad.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="ciudad">Ciudad*</Label>
        <Input
          id="ciudad"
          defaultValue="Bogotá"
          disabled
          {...register("ciudad")}
        />
        <Label className="text-xs text-gray-500">
          *Por el momento solo se aceptan canchas en <b>Bogotá</b>
        </Label>
        <div className="flex flex-col md:flex-row gap-2">
          <Button
            className="mb-10 w-full md:w-auto"
            type="button"
            onClick={async () => {
              const direccion_completa = `${form.watch("direccion")} ${
                form.watch("localidad") ?? ""
              } ${form.watch("ciudad")}`;
              if (!direccion_completa) {
                toast.error("Por favor ingresa una dirección primero");
                return;
              }
              setIsLoading(true);
              try {
                await getGeolocation(direccion_completa);
              } finally {
                setIsLoading(false);
              }
            }}
            variant="outline"
          >
            {isLoading ? <Spinner className="mr-2" /> : null}
            Obtener ubicación
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <Label className="text-sm text-gray-500 block">
          Utiliza el mapa para confirmar la ubicación de tu establecimiento.
        </Label>
        <div className="relative w-full h-[300px] md:h-[400px] bg-gray-100 rounded-lg overflow-hidden">
          <div className="absolute inset-0">
            <CustomMap
              center={mapCenter}
              zoom={15}
              showInfoWindow={false}
              gestureHandling="greedy"
            />
          </div>
        </div>
        <div className="space-y-4 mt-8">
          <div className="flex items-start gap-2">
            <Checkbox
              id="acepto-terminos"
              checked={form.watch("aceptoTerminos")}
              onCheckedChange={() => handleCheckboxChange("aceptoTerminos")}
              {...register("aceptoTerminos", {
                required:
                  "Debes aceptar los términos y condiciones para continuar",
              })}
            />
            <Label htmlFor="acepto-terminos" className="text-sm">
              Acepto los{" "}
              <Link href="/terms" target="_blank" className="underline">
                términos y condiciones
              </Link>
            </Label>
          </div>
          {errors.aceptoTerminos && (
            <p className="text-sm text-red-500">
              *Debes aceptar los términos y condiciones para continuar.
            </p>
          )}

          <div className="flex items-start gap-2">
            <Checkbox
              id="acepto-privacidad"
              checked={form.watch("aceptoPrivacidad")}
              onCheckedChange={() => handleCheckboxChange("aceptoPrivacidad")}
              {...register("aceptoPrivacidad", {
                required:
                  "Debes aceptar la política de privacidad para continuar",
              })}
            />
            <Label htmlFor="acepto-privacidad" className="text-sm">
              Acepto la{" "}
              <Link href="/privacy" target="_blank" className="underline">
                política de privacidad
              </Link>
            </Label>
          </div>
          {errors.aceptoPrivacidad && (
            <p className="text-sm text-red-500">
              *Debes aceptar la política de privacidad para continuar.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
