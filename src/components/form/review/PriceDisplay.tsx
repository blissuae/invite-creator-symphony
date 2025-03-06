
import { InviteFormData } from "@/types/invite-form-types";
import { calculateExactPrice } from "@/utils/pricing-utils";

interface PriceDisplayProps {
  formData: InviteFormData;
}

export const PriceDisplay = ({ formData }: PriceDisplayProps) => {
  const priceString = calculateExactPrice(formData);
  const hasDiscount = priceString.includes("OFF!");
  const hasUrgentFee = priceString.includes("Urgent Delivery");
  
  if (hasDiscount) {
    const [discountedPrice, discount] = priceString.split(" (");
    const discountAmount = discount.includes("500") ? 500 : 300;
    const originalPrice = `${parseInt(discountedPrice.replace(" AED", "")) + discountAmount} AED`;
    
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-1">
          <span className="text-gray-500 line-through text-lg">
            {originalPrice}
          </span>
          <div className="text-2xl sm:text-3xl font-medium text-elegant-primary">
            {discountedPrice}
          </div>
        </div>
        <div className="inline-block animate-bounce">
          <span className="bg-green-100 text-green-800 text-lg font-semibold px-4 py-1 rounded-full">
            {discount.replace(")", "")} 🎉
          </span>
        </div>
      </div>
    );
  } else if (hasUrgentFee) {
    const [urgentPrice] = priceString.split(" (");
    const originalPrice = `${parseInt(urgentPrice.replace(" AED", "")) - 500} AED`;
    
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-1">
          <span className="text-gray-500 line-through text-sm">
            Regular price: {originalPrice}
          </span>
          <div className="text-2xl sm:text-3xl font-medium text-elegant-primary">
            {urgentPrice}
          </div>
        </div>
        <div className="inline-block">
          <span className="bg-purple-100 text-purple-800 text-lg font-semibold px-4 py-1 rounded-full">
            Urgent Delivery (+500 AED) ⚡
          </span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-2xl sm:text-3xl font-medium text-elegant-primary">
      {priceString}
    </div>
  );
};
