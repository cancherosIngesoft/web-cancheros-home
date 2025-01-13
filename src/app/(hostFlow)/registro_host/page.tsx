"use client";

import { StepIndicator } from "@/components/forms/host-register/StepIndicator";
import { PersonalInfoStep } from "@/components/forms/host-register/PersonalInfoStep";
import { BusinessInfoStep } from "@/components/forms/host-register/BusinessInfoStep";
import { LocationStep } from "@/components/forms/host-register/LocationStep";
import { useRegistroHost } from "@/hooks/useRegistroHost";
import { Button } from "@/components/ui/button";

export default function RegisterBusinessPage() {
  const { currentStep, form, nextStep, prevStep, onSubmit } = useRegistroHost();

  return (
    <div className="container mx-auto py-10">
      <StepIndicator currentStep={currentStep} />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto"
      >
        {/* Step 1 : Información personal */}
        {currentStep === 1 && (
          <PersonalInfoStep
            register={form.register}
            errors={form.formState.errors}
          />
        )}

        {/* Step 2 : Información del negocio */}
        {currentStep === 2 && (
          <BusinessInfoStep
            register={form.register}
            errors={form.formState.errors}
          />
        )}

        {/* Step 3 : Ubicación */}
        {currentStep === 3 && (
          <LocationStep
            register={form.register}
            errors={form.formState.errors}
          />
        )}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Anterior
            </Button>
          )}

          {currentStep < 3 ? (
            <Button type="button" onClick={nextStep}>
              Siguiente
            </Button>
          ) : (
            <Button type="submit">Enviar solicitud</Button>
          )}
        </div>
      </form>
    </div>
  );
}
