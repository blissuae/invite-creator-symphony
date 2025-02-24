
interface FormProgressProps {
  steps: string[];
  currentStep: number;
}

export const FormProgress = ({ steps, currentStep }: FormProgressProps) => {
  return (
    <div className="bg-form-100 px-6 py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                index <= currentStep
                  ? "bg-black text-white"
                  : "bg-form-200 text-gray-400"
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-[2px] w-[calc(100%-2rem)] mx-2 ${
                  index < currentStep ? "bg-black" : "bg-form-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-600 text-center">
        {steps[currentStep]}
      </div>
    </div>
  );
};
