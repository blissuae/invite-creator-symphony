
import { CheckCircle } from "lucide-react";
import { InviteFormData } from "@/types/invite-form-types";

interface SuccessScreenProps {
  formData: InviteFormData;
}

export const SuccessScreen = ({ formData }: SuccessScreenProps) => {
  return (
    <div className="p-8 text-center space-y-6 animate-fadeIn">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      
      <h2 className="text-2xl font-serif text-elegant-brown">
        Thank You, {formData.fullName}!
      </h2>
      
      <p className="text-gray-600 max-w-md mx-auto">
        Your {formData.occasion === 'Other' ? formData.customOccasion.toLowerCase() : formData.occasion.toLowerCase()} invitation request has been successfully submitted. We'll review your requirements and get back to you soon.
      </p>

      <div className="pt-2">
        <p className="text-sm text-gray-500">
          A confirmation email will be sent to you shortly
        </p>
      </div>
    </div>
  );
};
