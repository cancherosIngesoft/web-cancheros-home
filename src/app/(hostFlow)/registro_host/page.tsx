"use client";

import { StepIndicator } from "@/components/forms/host-register/StepIndicator";
import { PersonalInfoStep } from "@/components/forms/host-register/PersonalInfoStep";
import { BusinessInfoStep } from "@/components/forms/host-register/BusinessInfoStep";
import { LocationStep } from "@/components/forms/host-register/LocationStep";
import { useRegistroHost } from "@/hooks/useRegistroHost";
import { Button } from "@/components/ui/button";
import { CongratulationsStep } from "@/components/forms/host-register/CongratulationsStep";
import { WelcomeStep } from "@/components/forms/host-register/WelcomeStep";

export default function RegisterBusinessPage() {
  const { currentStep, form, nextStep, prevStep, onSubmit, getGeolocation } =
    useRegistroHost();

  return (
    <div className="container mx-auto py-10 border border-gray-200 rounded-lg  self-center">
      <StepIndicator currentStep={currentStep} />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto h-90vh"
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

        <div className="flex justify-between mt-8">
          {currentStep > 1 && currentStep < 4 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Anterior
            </Button>
          )}

          {currentStep < 3 ? (
            <Button type="button" onClick={nextStep}>
              Siguiente
            </Button>
          ) : null}
          {currentStep === 3 && (
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              onClick={() => {
                form.handleSubmit(onSubmit);
              }}
            >
              Enviar solicitud
            </Button>
          )}
          {currentStep === 4 && <CongratulationsStep />}
        </div>
      </form>
    </div>
  );
}
