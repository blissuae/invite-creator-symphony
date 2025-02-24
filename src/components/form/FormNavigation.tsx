
interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}

export const FormNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSubmit,
}: FormNavigationProps) => {
  return (
    <div className="mt-6 sm:mt-8 flex justify-between">
      <button
        onClick={onPrev}
        className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base text-elegant-brown hover:bg-elegant-beige transition-colors font-serif ${
          currentStep === 0 ? "invisible" : ""
        }`}
      >
        Back
      </button>
      <button
        onClick={currentStep === totalSteps - 1 ? onSubmit : onNext}
        className="px-4 sm:px-6 py-2 bg-elegant-primary text-white rounded-lg hover:bg-elegant-primary/90 transition-colors text-sm sm:text-base font-serif"
      >
        {currentStep === totalSteps - 1 ? "Submit" : "Continue"}
      </button>
    </div>
  );
};
