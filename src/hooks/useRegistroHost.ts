import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "@/components/forms/host-register/types";

export function useRegistroHost() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const form = useForm<FormData>();

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

  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data, null, 2));
    setCurrentStep(4);
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
    case 1:
      return ["nombre", "apellidos", "tipoDocumento", "cedula", "email"];
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
