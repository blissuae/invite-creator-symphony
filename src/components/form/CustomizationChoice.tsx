
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CustomizationChoiceProps {
  onChoiceMade: (skipCustomization: boolean) => void;
}

export const CustomizationChoice = ({ onChoiceMade }: CustomizationChoiceProps) => {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-elegant-brown mb-4">Do you want to customize your video now by picking the colors, animation style, and idea?</h2>
      </div>

      <RadioGroup className="space-y-4" value={choice || ""} onValueChange={setChoice}>
        <div className="flex items-start space-x-3 p-4 rounded-md border border-elegant-secondary/20 hover:bg-elegant-beige/10">
          <RadioGroupItem value="customize" id="customize" />
          <div className="grid gap-1.5">
            <Label className="font-medium text-lg" htmlFor="customize">
              Yes, let's do it now
            </Label>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-4 rounded-md border border-elegant-secondary/20 hover:bg-elegant-beige/10">
          <RadioGroupItem value="skip" id="skip" />
          <div className="grid gap-1.5">
            <Label className="font-medium text-lg" htmlFor="skip">
              I'll do it later
            </Label>
          </div>
        </div>
      </RadioGroup>

      <div className="flex justify-center pt-4">
        <Button
          disabled={!choice}
          onClick={() => onChoiceMade(choice === "skip")}
          className="px-8 py-2 bg-elegant-primary text-white rounded-lg hover:bg-elegant-primary/90 transition-colors font-serif"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
