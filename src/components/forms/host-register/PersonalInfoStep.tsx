import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";

interface PersonalInfoStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export function PersonalInfoStep({ register, errors }: PersonalInfoStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Información Personal</h2>

      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          {...register("nombre", { required: "El nombre es requerido" })}
        />
        {errors.nombre && (
          <p className="text-sm text-red-500">{errors.nombre.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="apellidos">Apellidos</Label>
        <Input
          id="apellidos"
          {...register("apellidos", {
            required: "Los apellidos son requeridos",
          })}
        />
        {errors.apellidos && (
          <p className="text-sm text-red-500">{errors.apellidos.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cedula">Cédula</Label>
        <Input
          id="cedula"
          {...register("cedula", {
            required: "La cédula es requerida",
            pattern: {
              value: /^\d{8,10}$/,
              message: "Ingrese una cédula válida",
            },
          })}
        />
        {errors.cedula && (
          <p className="text-sm text-red-500">{errors.cedula.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "El correo es requerido",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Ingrese un correo válido",
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
    </div>
  );
}
