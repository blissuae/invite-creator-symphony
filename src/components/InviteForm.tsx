
import { FormProgress } from "./form/FormProgress";
import { BasicDetails } from "./form/BasicDetails";
import { ColorPalette } from "./form/ColorPalette";
import { StyleSelector } from "./form/StyleSelector";
import { DeadlinePicker } from "./form/DeadlinePicker";
import { ContentEditor } from "./form/ContentEditor";
import { AdditionalDetails } from "./form/AdditionalDetails";
import { ReviewDetails } from "./form/ReviewDetails";
import { SuccessScreen } from "./form/SuccessScreen";
import { AnimationStyleSelector } from "./form/AnimationStyleSelector";
import { FormNavigation } from "./form/FormNavigation";
import { FORM_STEPS, useInviteForm } from "@/hooks/use-invite-form";

export const InviteForm = () => {
  const {
    currentStep,
    isSubmitted,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
  } = useInviteForm();

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
          <ColorPalette
            selected={formData.colorPalette}
            onSelect={(value) => updateFormData("colorPalette", value)}
          />
        );
      case 2:
        return (
          <AnimationStyleSelector
            selected={formData.animationStyles}
            onSelect={(value) => updateFormData("animationStyles", value)}
          />
        );
      case 3:
        return (
          <StyleSelector
            selected={formData.style}
            onSelect={(value) => updateFormData("style", value)}
          />
        );
      case 4:
        return (
          <DeadlinePicker
            selected={formData.deadline}
            onSelect={(value) => updateFormData("deadline", value)}
          />
        );
      case 5:
        return (
          <ContentEditor
            content={formData.content}
            onChange={(value) => updateFormData("content", value)}
          />
        );
      case 6:
        return (
          <AdditionalDetails
            formData={formData}
            onChange={updateFormData}
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
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-elegant-secondary/20 overflow-hidden animate-fadeIn">
      <FormProgress steps={FORM_STEPS} currentStep={currentStep} />
      <div className="p-4 sm:p-8">
        <div className="min-h-[300px] sm:min-h-[400px]">{renderStep()}</div>
        <FormNavigation
          currentStep={currentStep}
          totalSteps={FORM_STEPS.length}
          onNext={nextStep}
          onPrev={prevStep}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
