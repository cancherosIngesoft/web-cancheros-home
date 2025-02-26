"use client";

import { StepIndicator } from "@/components/forms/host-register/StepIndicator";
import { PersonalInfoStep } from "@/components/forms/host-register/PersonalInfoStep";
import { BusinessInfoStep } from "@/components/forms/host-register/BusinessInfoStep";
import { LocationStep } from "@/components/forms/host-register/LocationStep";
import { useRegistroHost } from "@/hooks/useRegistroHost";
import { Button } from "@/components/ui/button";
import { CongratulationsStep } from "@/components/forms/host-register/CongratulationsStep";
import { WelcomeStep } from "@/components/forms/host-register/WelcomeStep";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function RegisterBusinessPage() {
  const { currentStep, form, nextStep, prevStep, onSubmit, getGeolocation } =
    useRegistroHost();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("errors", form.formState.errors);
  }, [form.formState.errors]);
  return (
    <div className="py-5 md:py-10 m-2 md:m-10 border border-gray-200 rounded-lg">
      <StepIndicator currentStep={currentStep} />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto px-4 md:px-0"
      >
        {currentStep === 0 && <WelcomeStep />}
        {/* Step 1 : Información personal */}
        {currentStep === 1 && (
          <PersonalInfoStep
            register={form.register}
            errors={form.formState.errors}
            setValue={form.setValue}
          />
        )}

        {/* Step 2 : Información del negocio */}
        {/*Hay que usar setValue porque el tipo de canchas es un array y no se puede usar el register */}
        {currentStep === 2 && (
          <BusinessInfoStep
            register={form.register}
            errors={form.formState.errors}
            setValue={form.setValue}
          />
        )}

        {/* Step 3 : Ubicación */}
        {currentStep === 3 && (
          <LocationStep
            getGeolocation={getGeolocation}
            setValue={form.setValue}
            register={form.register}
            errors={form.formState.errors}
            form={form}
          />
        )}

        <div className="flex flex-col md:flex-row justify-between mt-8 gap-4">
          {currentStep > 1 && currentStep < 4 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Anterior
            </Button>
          )}

          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="w-full md:w-auto"
            >
              Siguiente
            </Button>
          ) : null}
          {currentStep === 3 ? (
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              onClick={() => {
                setIsLoading(true);
                form.handleSubmit(onSubmit);
              }}
              className="w-full md:w-auto"
            >
              Enviar solicitud
              {isLoading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
            </Button>
          ) : null}
          {currentStep === 4 && <CongratulationsStep />}
        </div>
      </form>
    </div>
  );
}
