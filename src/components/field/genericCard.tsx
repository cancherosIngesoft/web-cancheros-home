import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditIcon } from "lucide-react";
import { IFieldCard } from "./model";
import Image from "next/image";
import { AddFieldModal } from "@/components/forms/fields-register/addFieldModal";
import { useState } from "react";
import { IExistingField } from "@/actions/registro_host/field";

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

  const [open, setOpen] = useState(false);
  const [fieldData, setFieldData] = useState<IFieldCard | null>(null);

  const handleEditClick = () => {
    console.log('field', field);
    setFieldData(field);
    setOpen(true);
  };

  return (
    <Card className="h-full flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle className="mb-4">{field.nombre}</CardTitle>
        <CardContent>
          <Image
            src={getFirstNoNullImage(field) || "/no_image.png"}
            alt={field.nombre}
            width={200}
            height={200}
            className="mb-2"
          />
          <section className="flex flex-col gap-2 items-start">
            <p><b>Precio:</b> ${field.precio}</p>
            <p><b>Capacidad:</b> {field.capacidad}</p>
            <p><b>Tipo:</b> {field.tipo}</p>
            <div>
              <EditIcon onClick={handleEditClick} />
            </div>
          </section>
        </CardContent>
      </CardHeader>
      <CardFooter>
        <AddFieldModal 
          open={open} 
          onOpenChange={setOpen} 
          existingField={fieldData as IExistingField} 
          isEdit={true} 
        />
      </CardFooter>
    </Card>
  );
};
