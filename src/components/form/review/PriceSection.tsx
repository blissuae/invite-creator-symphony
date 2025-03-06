
import { InviteFormData } from "@/types/invite-form-types";
import { PriceDisplay } from "./PriceDisplay";

interface PriceSectionProps {
  formData: InviteFormData;
}

export const PriceSection = ({ formData }: PriceSectionProps) => {
  return (
    <div className="bg-[#8b7256]/10 p-6 rounded-lg border-2 border-[#8b7256]/20 mb-6">
      <div className="text-center">
        <h3 className="text-elegant-brown font-serif text-lg mb-2">Estimated Price</h3>
        <PriceDisplay formData={formData} />
      </div>
    </div>
  );
};
