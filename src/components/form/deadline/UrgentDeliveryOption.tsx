
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface UrgentDeliveryOptionProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export const UrgentDeliveryOption = ({
  isChecked,
  onChange,
}: UrgentDeliveryOptionProps) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="urgentDelivery"
          checked={isChecked}
          onCheckedChange={(checked) => {
            onChange(checked === true);
          }}
          className="data-[state=checked]:bg-purple-600"
        />
        <Label
          htmlFor="urgentDelivery"
          className="text-base cursor-pointer font-medium flex items-center gap-2"
        >
          <span>Enable Urgent Delivery</span>
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-purple-100 text-purple-800">
            +500 AED
          </span>
        </Label>
      </div>
    </div>
  );
};
