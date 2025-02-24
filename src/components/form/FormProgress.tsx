
interface FormProgressProps {
  steps: string[];
  currentStep: number;
}

export const FormProgress = ({ steps, currentStep }: FormProgressProps) => {
  return (
    <div className="bg-elegant-beige/50 px-8 py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-serif ${
                index <= currentStep
                  ? "bg-elegant-primary text-white"
                  : "bg-elegant-secondary/30 text-elegant-brown"
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-[2px] w-[calc(100%-2rem)] mx-2 ${
                  index < currentStep ? "bg-elegant-primary" : "bg-elegant-secondary/30"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 text-sm text-elegant-brown text-center font-serif">
        {steps[currentStep]}
      </div>
    </div>
  );
};
