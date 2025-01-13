import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormData } from "./types";
import { useState } from "react";

interface BusinessInfoStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export function BusinessInfoStep({ register, errors }: BusinessInfoStepProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleTipoCanchas = (tipo: string) => {
    setSelectedTypes((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Información del Negocio</h2>

      <div className="space-y-2">
        <Label htmlFor="nombreNegocio">Nombre del negocio</Label>
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
        <Label htmlFor="numeroCanchas">Número de canchas</Label>
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
        <Label>Tipo de canchas</Label>
        <div className="flex gap-2">
          {["Futbol 5", "Futbol 7", "Futbol 11"].map((tipo) => (
            <Button
              key={tipo}
              type="button"
              variant={selectedTypes.includes(tipo) ? "default" : "outline"}
              onClick={() => toggleTipoCanchas(tipo)}
            >
              {tipo}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono">Teléfono</Label>
        <Input
          id="telefono"
          placeholder="+57 XXX XXX XXXX"
          {...register("telefono", {
            required: "El teléfono es requerido",
            pattern: {
              value: /^\+?[0-9]{10,13}$/,
              message: "Ingrese un teléfono válido",
            },
          })}
        />
        {errors.telefono && (
          <p className="text-sm text-red-500">{errors.telefono.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="rut">RUT</Label>
        <Input
          id="rut"
          {...register("rut", {
            required: "El RUT es requerido",
            pattern: {
              value: /^[0-9]{9}$/,
              message: "Ingrese un RUT válido",
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
