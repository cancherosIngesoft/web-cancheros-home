import { cn } from "@/lib/utils";
import { STEPS } from "./types";

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                currentStep >= step.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              )}
            >
              {step.id}
            </div>
            <div className="text-sm mx-2">{step.name}</div>
            {index < STEPS.length - 1 && (
              <div className="w-20 h-[2px] bg-gray-200 mx-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
