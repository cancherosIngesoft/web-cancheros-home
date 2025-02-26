import { cn } from "@/lib/utils";
import { STEPS } from "./types";

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="px-4 md:px-8 mb-8">
      <div className="relative">
        {/* Barra de progreso base */}
        <div className="overflow-hidden">
          <div className="flex justify-between text-xs md:text-sm mb-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 text-center ${
                  index === currentStep
                    ? "text-[#1A6B51] font-medium"
                    : index < currentStep
                    ? "text-[#1A6B51]"
                    : "text-gray-400"
                }`}
              >
                <span className="hidden md:block">{step.name}</span>
                <span className="block md:hidden">
                  {index === 0 ? "Inicio" : `Paso ${index}`}
                </span>
              </div>
            ))}
          </div>

          {/* Línea de progreso */}
          <div className="h-2 flex">
            {STEPS.map((_, index) => (
              <div
                key={index}
                className={`flex-1 ${index === 0 ? "rounded-l-full" : ""} ${
                  index === STEPS.length - 1 ? "rounded-r-full" : ""
                } ${
                  index < currentStep
                    ? "bg-[#1A6B51]"
                    : index === currentStep
                    ? "bg-[#31B642]"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
