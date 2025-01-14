import { useState } from "react";
import { useForm } from "react-hook-form";
import { type FormData } from "@/components/forms/host-register/types";
import { toast } from "sonner";

export function useRegistroHost() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

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
      console.log("isStepValid", isStepValid);
      console.log("current data", form.getValues());
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async (data: FormData) => {
    try {
      // 1. Enviar datos principales como JSON
      const { rut, ...jsonData } = data;
      const response = await fetch("/api/register-host", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) throw new Error("Error al registrar host");
      const { hostId } = await response.json();

      // 2. Si hay RUT, enviarlo en otro endpoint
      if (rut?.[0]) {
        const formData = new FormData();
        formData.append("rut", rut[0]);

        await fetch(`/api/upload-rut/${hostId}`, {
          method: "POST",
          body: formData,
        });
      }

      toast.success("¡Registro exitoso! Bienvenido a Cancheros");
      setCurrentStep(4); // Ir al paso de felicitaciones
    } catch (error) {
      toast.error("Error al registrar el host, intente nuevamente");
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
