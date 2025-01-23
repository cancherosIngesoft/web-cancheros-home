import { useState } from "react";
import { useForm } from "react-hook-form";
import { type FormData } from "@/components/forms/host-register/types";
import { toast } from "sonner";
import { registerHost } from "@/actions/registro_host/host";
import { getRut } from "@/actions/registro_host/rut";
import { useToast } from "./use-toast";

export function useRegistroHost() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormData>({
    defaultValues: {
      aceptoTerminos: false,
      aceptoPrivacidad: false,
      tipoCanchas: [],
      nombre: "",
      apellidos: "",
      tipoDocumento: "",
      documento: "",
      email: "",
      nombreNegocio: "",
      numeroCanchas: 0,
      telefono: "",
      rut: null,
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    const fieldsToValidate = getFieldsToValidate(currentStep);
    const isStepValid = await form.trigger(fieldsToValidate as any[]);

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const body = {
        tipo_doc_duenio: form.getValues("tipoDocumento"),
        doc_duenio: form.getValues("documento"),
        fecha_nacimiento: new Date(
          form.getValues("fechaNacimiento")
        ).toISOString(),
        nombre_duenio: form.getValues("nombre"),
        apellido_duenio: form.getValues("apellidos"),
        email_duenio: form.getValues("email"),
        tel_duenio: form.getValues("telefono"),
        tel_est: form.getValues("telefono"),
        nombre_est: form.getValues("nombreNegocio"),
        num_canchas: Number(form.getValues("numeroCanchas")),
        localidad: form.getValues("localidad"),
        direccion: form.getValues("direccion"),
        latitud: form.getValues("latitud").toString(),
        longitud: form.getValues("longitud").toString(),
      };
      const response = await registerHost(body);
      if (response) {
        const requestId = response.id;
        try {
          const rutResponse = await getRut(
            (form.getValues("rut") as FileList)[0],
            requestId
          );
          setCurrentStep(4); // Avanza al paso de felicitaciones
          toast({
            title: "Registro exitoso",
            description: "Tu solicitud ha sido registrada con éxito",
          });
        } catch (error) {
          toast({
            title: "Error al subir el RUT",
            description: "Vuelve a intentarlo",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error en el registro",
          description: response,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error en el registro",
        description: "Vuelve a intentarlo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getGeolocation = async (address: string) => {
    try {
      const response = await fetch("/api/geocode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      form.setValue("latitud", data.latitude);
      form.setValue("longitud", data.longitude);
      return data;
    } catch (error) {
      toast({
        title: "Error al obtener ubicación",
        description: "Vuelve a intentarlo",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    currentStep,
    selectedTypes,
    form,
    nextStep,
    prevStep,
    onSubmit,
    setSelectedTypes,
    getGeolocation,
    isLoading,
  };
}

function getFieldsToValidate(step: number): string[] {
  switch (step) {
    case 0:
      return ["aceptoTerminos", "aceptoPrivacidad"];
    case 1:
      return [
        "nombre",
        "apellidos",
        "tipoDocumento",
        "email",
        "fechaNacimiento",
        "documento",
      ];
    case 2:
      return [
        "nombreNegocio",
        "numeroCanchas",
        "telefono",
        "rut",
        "tipoCanchas",
      ];
    case 3:
      return [
        "direccion",
        "localidad",
        "ciudad",
        "aceptoTerminos",
        "aceptoPrivacidad",
      ];
    default:
      return [];
  }
}
