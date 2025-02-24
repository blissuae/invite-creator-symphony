
import { Progress } from "@/components/ui/progress";

interface FormProgressProps {
  steps: string[];
  currentStep: number;
}

export const FormProgress = ({ steps, currentStep }: FormProgressProps) => {
  const completionPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="bg-elegant-beige/50 px-8 py-6">
      <div className="relative mb-8">
        <Progress value={completionPercentage} className="h-2 bg-elegant-secondary/20" />
        <div className="absolute -top-1 left-0 right-0">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div
                key={step}
                className="relative"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-serif ${
                    index <= currentStep
                      ? "bg-elegant-primary text-white ring-4 ring-elegant-beige"
                      : "bg-white text-elegant-brown border-2 border-elegant-secondary/30"
                  }`}
                >
                  {index + 1}
                </div>
                <div className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-serif ${
                  index === currentStep ? "text-elegant-primary font-medium" : "text-elegant-brown/70"
                }`}>
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-12 pt-2">
        <div className="text-sm text-elegant-brown/70 font-serif">
          Step {currentStep + 1} of {steps.length}
        </div>
        <div className="text-sm font-medium text-elegant-primary font-serif">
          {Math.round(completionPercentage)}% Complete
        </div>
      </div>
    </div>
  );
};
