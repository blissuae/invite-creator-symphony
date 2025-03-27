
import { FormProgress } from "./form/FormProgress";
import { BasicDetails } from "./form/BasicDetails";
import { CharacterOptions } from "./form/CharacterOptions";
import { ColorPalette } from "./form/ColorPalette";
import { DeadlinePicker } from "./form/DeadlinePicker";
import { ContentEditor } from "./form/ContentEditor";
import { ReviewDetails } from "./form/ReviewDetails";
import { SuccessScreen } from "./form/SuccessScreen";
import { AnimationStyleSelector } from "./form/AnimationStyleSelector";
import { FormNavigation } from "./form/FormNavigation";
import { DeliveryFormats } from "./form/DeliveryFormats";
import { useInviteForm, FORM_STEPS } from "@/hooks/use-invite-form";
import { useEffect, useState } from "react";
import { IntroPopup } from "./IntroPopup";

export const InviteForm = () => {
  const {
    currentStep,
    maxStep,
    isSubmitted,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
    setCurrentStep,
  } = useInviteForm();

  const [showIntro, setShowIntro] = useState(true);

  const handleStepClick = (step: number) => {
    if (step <= maxStep) {
      setCurrentStep(step);
    }
  };

  useEffect(() => {
    const progressValue = isSubmitted 
      ? 100 
      : Math.min(95, Math.ceil((maxStep / (FORM_STEPS.length - 1)) * 100));
    
    const progressEvent = new CustomEvent('formProgressUpdate', { 
      detail: { 
        progress: progressValue,
        currentStep: currentStep
      } 
    });
    window.dispatchEvent(progressEvent);
  }, [currentStep, maxStep, isSubmitted]);

  const renderStep = () => {
    if (isSubmitted) {
      return <SuccessScreen formData={formData} />;
    }

    switch (currentStep) {
      case 0:
        return (
          <BasicDetails
            formData={formData}
            onChange={updateFormData}
          />
        );
      case 1:
        return (
          <DeliveryFormats
            formData={formData}
            onChange={updateFormData}
          />
        );
      case 2:
        return (
          <CharacterOptions
            formData={formData}
            onChange={updateFormData}
          />
        );
      case 3:
        return (
          <ContentEditor
            formData={{
              content: formData.content,
              hasVideoIdea: formData.hasVideoIdea,
              videoIdea: formData.videoIdea
            }}
            onChange={updateFormData}
          />
        );
      case 4:
        return (
          <ColorPalette
            selected={formData.colorPalette}
            onSelect={(value) => updateFormData("colorPalette", value)}
          />
        );
      case 5:
        return (
          <AnimationStyleSelector
            selected={formData.animationStyles}
            onSelect={(value) => updateFormData("animationStyles", value)}
          />
        );
      case 6:
        return (
          <DeadlinePicker
            selected={formData.deadline}
            onSelect={(value) => updateFormData("deadline", value)}
          />
        );
      case 7:
        return (
          <ReviewDetails
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-elegant-secondary/20 overflow-hidden animate-fadeIn">
        {renderStep()}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-elegant-secondary/20 overflow-hidden animate-fadeIn flex flex-col">
      {showIntro && (
        <IntroPopup 
          forceShow={true} 
          onClose={() => setShowIntro(false)}
        />
      )}
      <FormProgress 
        steps={FORM_STEPS} 
        currentStep={currentStep}
        maxStep={maxStep}
        onStepClick={handleStepClick}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="p-4 sm:p-8 overflow-y-auto">
          <div className="sm:min-h-[400px]">{renderStep()}</div>
        </div>
        <div className="sticky bottom-0 p-4 sm:p-8 border-t border-elegant-secondary/20 bg-white">
          <FormNavigation
            currentStep={currentStep}
            totalSteps={FORM_STEPS.length}
            onNext={nextStep}
            onPrev={prevStep}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
