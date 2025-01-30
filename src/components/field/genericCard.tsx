import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IFieldCard } from "./model";
import Image from "next/image";
export const GenericCard = ({ field }: { field: IFieldCard }) => {
  const getFirstNoNullImage = (field: IFieldCard) => {
    return (
      field.imagen1 ||
      field.imagen2 ||
      field.imagen3 ||
      field.imagen4 ||
      field.imagen5
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{field.nombre}</CardTitle>
        <CardContent>
          <Image
            src={getFirstNoNullImage(field) || "/no_image.png"}
            alt={field.nombre}
            width={200}
            height={200}
          />
          <p>Precio: ${field.precio}</p>
          <p>Capacidad: {field.capacidad}</p>
          <p>Tipo: {field.tipo}</p>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
