
import { InviteFormData } from "@/types/invite-form-types";
import { PriceSection } from "./review/PriceSection";
import { DetailsSection } from "./review/DetailsSection";
import { DownloadButton } from "./review/DownloadButton";

interface ReviewDetailsProps {
  formData: InviteFormData;
}

export const ReviewDetails = ({ formData }: ReviewDetailsProps) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-serif text-center text-[#8b7256]">
          Review Your Details
        </h2>
        <DownloadButton formData={formData} />
      </div>

      <PriceSection formData={formData} />
      <DetailsSection formData={formData} />

      <div className="text-sm text-gray-500 text-center font-serif mt-4">
        Please review all details carefully before submitting
      </div>
    </div>
  );
};
