
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicDetailsProps {
  formData: {
    fullName: string;
    occasion: string;
    customOccasion: string;
  };
  onChange: (field: string, value: string) => void;
}

const OCCASIONS = [
  "Wedding",
  "Engagement",
  "Newborn Baby",
  "Graduation",
  "Birthday",
  "Other",
];

export const BasicDetails = ({ formData, onChange }: BasicDetailsProps) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-2xl font-serif text-center mb-8 text-elegant-brown">
        Tell Us About Your Event
      </h2>
      
      <div className="space-y-4">
        <label className="block">
          <span className="text-elegant-brown font-serif block mb-2">Your Full Name</span>
          <Input
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Enter your full name"
            className="w-full border-elegant-secondary/30 focus:border-elegant-primary"
          />
        </label>

        <label className="block">
          <span className="text-elegant-brown font-serif block mb-2">Occasion</span>
          <Select
            value={formData.occasion}
            onValueChange={(value) => onChange("occasion", value)}
          >
            <SelectTrigger className="w-full border-elegant-secondary/30 focus:border-elegant-primary">
              <SelectValue placeholder="Select an occasion" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {OCCASIONS.map((occasion) => (
                <SelectItem
                  key={occasion}
                  value={occasion}
                  className="font-serif"
                >
                  {occasion}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        {formData.occasion === "Other" && (
          <label className="block">
            <span className="text-elegant-brown font-serif block mb-2">Custom Occasion</span>
            <Input
              type="text"
              value={formData.customOccasion}
              onChange={(e) => onChange("customOccasion", e.target.value)}
              placeholder="Enter your occasion"
              className="w-full border-elegant-secondary/30 focus:border-elegant-primary"
            />
          </label>
        )}
      </div>

      <div className="text-sm text-gray-500 text-center font-serif mt-8">
        This information will help us personalize your invitation design
      </div>
    </div>
  );
};
