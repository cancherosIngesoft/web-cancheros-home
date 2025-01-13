import { UseFormRegister, FieldErrors } from "react-hook-form";
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

interface LocationStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export function LocationStep({ register, errors }: LocationStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Ubicación</h2>

      <div className="space-y-2">
        <Label htmlFor="direccion">Dirección</Label>
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
        <Label htmlFor="localidad">Localidad</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una localidad" />
          </SelectTrigger>
          <SelectContent>
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

      <div className="space-y-2">
        <Label htmlFor="ciudad">Ciudad</Label>
        <Input
          id="ciudad"
          defaultValue="Bogotá"
          disabled
          {...register("ciudad")}
        />
      </div>
    </div>
  );
}
