
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cake, Heart, Gift, GraduationCap, PartyPopper, Sparkles } from "lucide-react";

interface BasicDetailsProps {
  formData: {
    fullName: string;
    occasion: string;
    customOccasion: string;
  };
  onChange: (field: string, value: string) => void;
}

interface OccasionOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const OCCASIONS: OccasionOption[] = [
  {
    value: "Wedding",
    label: "Wedding",
    icon: <Heart className="w-4 h-4 mr-2 text-pink-500" />,
  },
  {
    value: "Engagement",
    label: "Engagement",
    icon: <Gift className="w-4 h-4 mr-2 text-rose-500" />,
  },
  {
    value: "Newborn Baby",
    label: "Newborn Baby",
    icon: <PartyPopper className="w-4 h-4 mr-2 text-blue-500" />,
  },
  {
    value: "Graduation",
    label: "Graduation",
    icon: <GraduationCap className="w-4 h-4 mr-2 text-purple-500" />,
  },
  {
    value: "Birthday",
    label: "Birthday",
    icon: <Cake className="w-4 h-4 mr-2 text-orange-500" />,
  },
  {
    value: "Other",
    label: "Other",
    icon: <Sparkles className="w-4 h-4 mr-2 text-gray-500" />,
  },
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
                  key={occasion.value}
                  value={occasion.value}
                  className="font-serif flex items-center"
                >
                  {occasion.icon}
                  {occasion.label}
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
