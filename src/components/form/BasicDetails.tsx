
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
    instagramId: string;
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
  const isFormValid = () => {
    const hasValidInstagram = formData.instagramId.trim().startsWith('@');
    return (
      formData.fullName.trim() !== '' &&
      hasValidInstagram &&
      formData.occasion !== '' &&
      (formData.occasion !== 'Other' || formData.customOccasion.trim() !== '')
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      <h2 className="text-xl sm:text-2xl font-serif text-center mb-6 sm:mb-8 text-elegant-brown">
        Tell Us About Your Event
      </h2>
      
      <div className="space-y-4">
        <label className="block">
          <span className="text-elegant-brown font-serif block mb-1.5 sm:mb-2 text-sm sm:text-base">
            Your Full Name <span className="text-red-500">*</span>
          </span>
          <Input
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Enter your full name"
            className="w-full border-elegant-secondary/30 focus:border-elegant-primary h-9 sm:h-10 text-sm sm:text-base"
            required
          />
        </label>

        <label className="block">
          <span className="text-elegant-brown font-serif block mb-1.5 sm:mb-2 text-sm sm:text-base">
            Instagram ID <span className="text-red-500">*</span>
          </span>
          <Input
            type="text"
            value={formData.instagramId}
            onChange={(e) => onChange("instagramId", e.target.value)}
            placeholder="@yourusername"
            className="w-full border-elegant-secondary/30 focus:border-elegant-primary h-9 sm:h-10 text-sm sm:text-base"
            required
          />
          {formData.instagramId && !formData.instagramId.startsWith('@') && (
            <p className="text-red-500 text-sm mt-1">Instagram ID must start with @</p>
          )}
        </label>

        <label className="block">
          <span className="text-elegant-brown font-serif block mb-1.5 sm:mb-2 text-sm sm:text-base">
            Occasion <span className="text-red-500">*</span>
          </span>
          <Select
            value={formData.occasion}
            onValueChange={(value) => onChange("occasion", value)}
          >
            <SelectTrigger className="w-full border-elegant-secondary/30 focus:border-elegant-primary h-9 sm:h-10">
              <SelectValue placeholder="Select an occasion" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {OCCASIONS.map((occasion) => (
                <SelectItem
                  key={occasion.value}
                  value={occasion.value}
                  className="font-serif flex items-center text-sm sm:text-base py-1.5 sm:py-2"
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
            <span className="text-elegant-brown font-serif block mb-1.5 sm:mb-2 text-sm sm:text-base">
              Custom Occasion <span className="text-red-500">*</span>
            </span>
            <Input
              type="text"
              value={formData.customOccasion}
              onChange={(e) => onChange("customOccasion", e.target.value)}
              placeholder="Enter your occasion"
              className="w-full border-elegant-secondary/30 focus:border-elegant-primary h-9 sm:h-10 text-sm sm:text-base"
              required
            />
          </label>
        )}
      </div>

      <div className="text-xs sm:text-sm text-gray-500 text-center font-serif mt-6 sm:mt-8">
        This information will help us personalize your invitation design
      </div>
    </div>
  );
};
