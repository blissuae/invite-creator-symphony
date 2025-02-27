
import { useState } from "react";
import { CheckIcon, HelpCircle, InfoIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

interface AnimationStyleSelectorProps {
  selected: string[];
  onSelect: (value: string[]) => void;
}

interface AnimationStyleOption {
  id: string;
  name: string;
  description: string;
  examples?: string[];
}

const ANIMATION_STYLES: AnimationStyleOption[] = [
  {
    id: "elegantFade",
    name: "Elegant Fade",
    description: "Gentle fade transitions between elements for a sophisticated look",
  },
  {
    id: "slideReveal",
    name: "Slide Reveal",
    description: "Smooth sliding transitions that reveal content with style",
  },
  {
    id: "floralBloom",
    name: "Floral Bloom",
    description: "Floral elements that bloom and grow throughout the animation",
  },
  {
    id: "scriptUnfold",
    name: "Script Unfold",
    description: "Text that appears as if it's being handwritten in elegant script",
  },
  {
    id: "particleShimmer",
    name: "Particle Shimmer",
    description: "Subtle sparkling particles that add a touch of magic",
  },
  {
    id: "zoomFocus",
    name: "Zoom Focus",
    description: "Smooth zooming transitions that direct attention to key elements",
  },
  {
    id: "gentleSway",
    name: "Gentle Sway",
    description: "Elements that sway gently as if moved by a soft breeze",
  },
  {
    id: "textReveal",
    name: "Text Reveal",
    description: "Text that appears with elegant masking and reveal effects",
  },
  {
    id: "colorTransform",
    name: "Color Transform",
    description: "Smooth transitions between colors for a dynamic feel",
  },
];

export const AnimationStyleSelector = ({ selected, onSelect }: AnimationStyleSelectorProps) => {
  const [showExamples, setShowExamples] = useState(false);

  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter(item => item !== id));
    } else {
      if (selected.length < 3) {
        onSelect([...selected, id]);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-serif mb-2 text-elegant-brown">Select Animation Styles</h2>
        <p className="text-gray-600 font-serif text-base">Choose up to 3 animation styles for your invitation</p>
      </div>

      {/* DID YOU KNOW - updated to purple */}
      <div className="bg-[#8B5CF6]/10 p-6 rounded-lg border border-[#8B5CF6]/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#8B5CF6]/20 rounded-full">
            <InfoIcon className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <p className="text-sm text-gray-700 flex-1">
            <span className="font-semibold">DID YOU KNOW: </span>
            Animations bring your invitation to life and can increase engagement by over 40%! Combining different animation styles creates a unique and memorable experience for your guests.
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <p className="text-sm text-elegant-primary/80 mb-4 font-medium">
          Selected: {selected.length}/3
        </p>

        <div className="space-y-4">
          {ANIMATION_STYLES.map((style) => {
            const isSelected = selected.includes(style.id);
            return (
              <div
                key={style.id}
                className={`
                  flex items-center space-x-4 p-4 rounded-lg border-2 transition-all
                  ${isSelected ? "border-elegant-primary/50 bg-elegant-beige/10" : "border-elegant-secondary/10 hover:border-elegant-secondary/30"}
                  ${selected.length >= 3 && !isSelected ? "opacity-50" : ""}
                `}
              >
                <Checkbox
                  id={style.id}
                  checked={isSelected}
                  onCheckedChange={() => handleToggle(style.id)}
                  disabled={selected.length >= 3 && !isSelected}
                  className={isSelected ? "bg-elegant-primary border-elegant-primary" : ""}
                />
                <div className="flex-1">
                  <Label
                    htmlFor={style.id}
                    className={`block font-medium mb-1 ${isSelected ? "text-elegant-primary" : "text-elegant-brown"}`}
                  >
                    {style.name}
                  </Label>
                  <p className="text-xs text-gray-600">{style.description}</p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-elegant-primary/10 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-elegant-primary" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                See Animation Examples
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Animation Style Examples</DrawerTitle>
                  <DrawerDescription>
                    These examples show different animation styles available
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 grid grid-cols-1 gap-4">
                  {/* Example animations would go here */}
                  <div className="border border-elegant-secondary/20 rounded-lg p-4">
                    <h4 className="font-medium text-elegant-brown">Elegant Fade</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Elements gracefully fade in and out, creating a sophisticated transition between sections.
                    </p>
                    <div className="mt-3 h-32 bg-elegant-beige/20 rounded flex items-center justify-center">
                      <p className="text-sm text-gray-500">Animation preview</p>
                    </div>
                  </div>

                  <div className="border border-elegant-secondary/20 rounded-lg p-4">
                    <h4 className="font-medium text-elegant-brown">Slide Reveal</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Content slides into view from different directions, creating a dynamic visual experience.
                    </p>
                    <div className="mt-3 h-32 bg-elegant-beige/20 rounded flex items-center justify-center">
                      <p className="text-sm text-gray-500">Animation preview</p>
                    </div>
                  </div>

                  <div className="border border-elegant-secondary/20 rounded-lg p-4">
                    <h4 className="font-medium text-elegant-brown">Floral Bloom</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Floral elements grow and bloom throughout the animation, adding a natural, elegant touch.
                    </p>
                    <div className="mt-3 h-32 bg-elegant-beige/20 rounded flex items-center justify-center">
                      <p className="text-sm text-gray-500">Animation preview</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full">Close</Button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
