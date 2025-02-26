import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormData } from "./types";
import { useState } from "react";

interface BusinessInfoStepProps {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
}

export function BusinessInfoStep({
  register,
  setValue,
  errors,
}: BusinessInfoStepProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleTipoCanchas = (tipo: string) => {
    const newSelectedTypes = selectedTypes.includes(tipo)
      ? selectedTypes.filter((t) => t !== tipo)
      : [...selectedTypes, tipo];

    setSelectedTypes(newSelectedTypes);
    setValue("tipoCanchas", newSelectedTypes, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-2xl font-bold mb-6">
        Información del Negocio
      </h2>
      <Label className="block text-sm md:text-base">
        Continuamos con la información del negocio. Todos los campos son
        requeridos.
      </Label>

      <div className="space-y-2">
        <Label htmlFor="nombreNegocio">Nombre del negocio*</Label>
        <Input
          id="nombreNegocio"
          {...register("nombreNegocio", {
            required: "El nombre del negocio es requerido",
          })}
        />
        {errors.nombreNegocio && (
          <p className="text-sm text-red-500">{errors.nombreNegocio.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="numeroCanchas">Número de canchas*</Label>
        <Input
          id="numeroCanchas"
          type="number"
          {...register("numeroCanchas", {
            required: "El número de canchas es requerido",
            min: { value: 1, message: "Debe tener al menos una cancha" },
          })}
        />
        {errors.numeroCanchas && (
          <p className="text-sm text-red-500">{errors.numeroCanchas.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Tipo de canchas*</Label>
        <div className="flex flex-wrap gap-2">
          {["Futbol 5", "Futbol 7", "Futbol 11"].map((tipo) => (
            <Button
              key={tipo}
              type="button"
              variant={selectedTypes.includes(tipo) ? "default" : "outline"}
              onClick={() => toggleTipoCanchas(tipo)}
              className="flex-1 md:flex-none text-sm md:text-base"
            >
              {tipo}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono">Teléfono*</Label>
        <Input
          id="telefono"
          placeholder="+57 XXX XXX XXXX"
          {...register("telefono", {
            required: "El teléfono es requerido",
            pattern: {
              value: /^\+?[0-9]{10,13}$/,
              message: "Ingrese un teléfono válido (10 dígitos)",
            },
          })}
        />
        {errors.telefono && (
          <p className="text-sm text-red-500">{errors.telefono.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="rut">RUT en formato PDF*</Label>
        <Input
          type="file"
          id="rut"
          accept=".pdf"
          {...register("rut", {
            required: "El RUT es requerido",
            validate: {
              isPDF: (value: any) => {
                const file = value?.[0];
                if (!file) return "El archivo es requerido";
                return (
                  file.type === "application/pdf" ||
                  "El archivo debe ser un PDF"
                );
              },
              maxSize: (value: any) => {
                const file = value?.[0];
                return (
                  file.size <= 5 * 1024 * 1024 ||
                  "El archivo no debe superar 5MB"
                );
              },
            },
          })}
        />
        {errors.rut && (
          <p className="text-sm text-red-500">{errors.rut.message}</p>
        )}
      </div>
    </div>
  );
}
