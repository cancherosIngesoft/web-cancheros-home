import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "./types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface PersonalInfoStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
}

export function PersonalInfoStep({
  register,
  errors,
  setValue,
}: PersonalInfoStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-2xl font-bold mb-6">
        Información Personal
      </h2>
      <Label className="block text-sm md:text-base">
        Cuentanos un poco sobre ti. Estos datos serán usados para la
        verificación de tu cuenta y la facturación de tus reservas. Todos los
        campos son requeridos.
      </Label>
      <div className="flex flex-col md:flex-row pt-5 gap-4 md:space-between">
        <div className="flex flex-col gap-2 w-full md:w-1/3 md:pr-5">
          <Label htmlFor="tipoDocumento">Tipo de documento*</Label>
          <Select
            {...register("tipoDocumento", {
              required: "El tipo de documento es requerido",
            })}
            onValueChange={(value) =>
              setValue("tipoDocumento", value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="C.C">Cédula de ciudadanía</SelectItem>
              <SelectItem value="PEP">PEP</SelectItem>
            </SelectContent>
          </Select>
          {errors.tipoDocumento && (
            <p className="text-sm text-red-500">
              {errors.tipoDocumento.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/2 md:pr-5">
          <Label htmlFor="documento">Documento*</Label>
          <Input
            id="documento"
            {...register("documento", {
              required: "El documento es requerido",
            })}
          />
          {errors.documento && (
            <p className="text-sm text-red-500">{errors.documento.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/2 md:pr-5">
          <Label htmlFor="fechaNacimiento">Fecha de nacimiento*</Label>
          <Input
            id="fechaNacimiento"
            type="date"
            {...register("fechaNacimiento", {
              required: "La fecha de nacimiento es requerida",
              validate: (value) => {
                const birthDate = new Date(value);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();

                if (
                  monthDiff < 0 ||
                  (monthDiff === 0 && today.getDate() < birthDate.getDate())
                ) {
                  age--;
                }

                return age >= 18 || "Debes ser mayor de 18 años";
              },
            })}
          />
          {errors.fechaNacimiento && (
            <p className="text-sm text-red-500">
              {errors.fechaNacimiento.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col md:fle x-row gap-4 md:gap-10 pb-5 pt-5">
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <Label htmlFor="nombre">Nombre*</Label>
          <Input
            id="nombre"
            {...register("nombre", { required: "El nombre es requerido" })}
          />
          {errors.nombre && (
            <p className="text-sm text-red-500">{errors.nombre.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <Label htmlFor="apellidos">Apellidos*</Label>
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
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/3 pb-5">
        <Label htmlFor="email">Correo electrónico*</Label>
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
