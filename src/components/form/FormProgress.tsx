
import { Progress } from "@/components/ui/progress";

interface FormProgressProps {
  steps: readonly string[];
  currentStep: number;
  maxStep: number;
  onStepClick?: (step: number) => void;
}

export const FormProgress = ({ steps, currentStep, maxStep, onStepClick }: FormProgressProps) => {
  return (
    <div className="w-full bg-white border-b border-elegant-secondary/20">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => {
            const isCompleted = index <= maxStep;
            const isCurrent = index === currentStep;

            return (
              <button
                key={step}
                onClick={() => onStepClick?.(index)}
                disabled={index > maxStep}
                className={`flex flex-col items-center ${
                  index < steps.length - 1 ? "relative" : ""
                } ${index > maxStep ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                    ${isCompleted || isCurrent
                      ? "bg-[#8b7256] text-white"
                      : "bg-gray-100 text-gray-400"
                    } ${index <= maxStep ? "hover:bg-[#8b7256]/90" : ""}`}
                >
                  {isCompleted && index < currentStep ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-[50%] w-full h-[2px] top-4 -z-10 ${
                      isCompleted ? "bg-[#8b7256]" : "bg-gray-100"
                    }`}
                  />
                )}
                <span className="hidden md:block text-xs mt-2 font-medium text-center min-w-[80px] px-2">
                  {step}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
