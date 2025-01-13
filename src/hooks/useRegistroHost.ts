import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "@/components/forms/host-register/types";

export function useRegistroHost() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const form = useForm<FormData>();

  const nextStep = async () => {
    const fieldsToValidate = getFieldsToValidate(currentStep);
    const isStepValid = await form.trigger(fieldsToValidate as any[]);

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(
      "Tu información ha sido enviada, por favor revisa tu correo para más actualizaciones."
    );
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
      return ["nombre", "apellidos", "cedula", "email"];
    case 2:
      return ["nombreNegocio", "numeroCanchas", "telefono", "rut"];
    case 3:
      return ["direccion", "localidad"];
    default:
      return [];
  }
}
