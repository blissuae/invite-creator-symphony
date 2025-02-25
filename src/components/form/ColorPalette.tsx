
import { useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { Wand2, Upload } from "lucide-react";
import * as Vibrant from "@vibrant/color";

interface ColorPaletteProps {
  selected: string;
  onSelect: (value: string) => void;
}

const PALETTES = [
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    colors: ["#FF6B6B", "#FFA07A", "#FFD700"],
  },
  {
    id: "desert-elegance",
    name: "Desert Elegance",
    colors: ["#D4A373", "#C8B6A6", "#A4907C"],
  },
  {
    id: "serene-sky",
    name: "Serene Sky",
    colors: ["#94A3B8", "#818CF8", "#6366F1"],
  },
  {
    id: "mystic-night",
    name: "Mystic Night",
    colors: ["#7E22CE", "#1E40AF", "#DB2777"],
  },
  {
    id: "blossom-garden",
    name: "Blossom Garden",
    colors: ["#FB7185", "#FB923C", "#38BDF8"],
  },
  {
    id: "minimalistic",
    name: "Minimalistic",
    colors: ["#E5E5E5", "#D4D4D4", "#FAFAFA"],
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    colors: ["#0EA5E9", "#38BDF8", "#7DD3FC"],
  },
  {
    id: "forest-dream",
    name: "Forest Dream",
    colors: ["#166534", "#15803D", "#22C55E"],
  },
  {
    id: "lavender-mist",
    name: "Lavender Mist",
    colors: ["#C084FC", "#E879F9", "#F0ABFC"],
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    colors: ["#F59E0B", "#FBBF24", "#FCD34D"],
  },
  {
    id: "rose-garden",
    name: "Rose Garden",
    colors: ["#BE123C", "#E11D48", "#FB7185"],
  },
  {
    id: "midnight-jazz",
    name: "Midnight Jazz",
    colors: ["#312E81", "#4338CA", "#6366F1"],
  },
  {
    id: "autumn-leaves",
    name: "Autumn Leaves",
    colors: ["#B45309", "#D97706", "#F59E0B"],
  },
  {
    id: "spring-bloom",
    name: "Spring Bloom",
    colors: ["#059669", "#10B981", "#34D399"],
  },
  {
    id: "coral-reef",
    name: "Coral Reef",
    colors: ["#DB2777", "#EC4899", "#F472B6"],
  },
];

const RANDOM_PALETTE_PREFIXES = ["Celestial", "Enchanted", "Mystic", "Dreamy", "Crystal", "Royal", "Ethereal"];
const RANDOM_PALETTE_SUFFIXES = ["Dreams", "Whispers", "Harmony", "Symphony", "Vision", "Melody", "Wonder"];

export const ColorPalette = ({ selected, onSelect }: ColorPaletteProps) => {
  const [showCustomPalette, setShowCustomPalette] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [customColors, setCustomColors] = useState(["#000000", "#000000", "#000000"]);
  const [currentColorIndex, setCurrentColorIndex] = useState<number | null>(null);
  const [customPaletteName, setCustomPaletteName] = useState("Custom Palette");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = imageUrl;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      const palette = await Vibrant.from(img).getPalette();
      
      const extractedColors = [
        palette.Vibrant?.hex || "#000000",
        palette.LightVibrant?.hex || "#FFFFFF",
        palette.DarkVibrant?.hex || "#444444",
      ];

      setCustomColors(extractedColors);
      setCustomPaletteName(`Colors from ${file.name}`);
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error('Error extracting colors:', error);
    }
  };

  const generateRandomPalette = () => {
    const prefix = RANDOM_PALETTE_PREFIXES[Math.floor(Math.random() * RANDOM_PALETTE_PREFIXES.length)];
    const suffix = RANDOM_PALETTE_SUFFIXES[Math.floor(Math.random() * RANDOM_PALETTE_SUFFIXES.length)];
    setCustomPaletteName(`${prefix} ${suffix}`);
    
    const newColors = Array.from({ length: 3 }, () => 
      `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
    );
    setCustomColors(newColors);
  };

  const handleColorChange = (color: string) => {
    if (currentColorIndex !== null) {
      const newColors = [...customColors];
      newColors[currentColorIndex] = color;
      setCustomColors(newColors);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-center mb-8">
        Choose Your Color Palette
      </h2>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {PALETTES.map((palette) => (
          <div
            key={palette.id}
            onClick={() => {
              onSelect(palette.id);
              setTimeout(() => {
                const continueButton = document.querySelector(
                  'button[data-continue]'
                ) as HTMLButtonElement;
                continueButton?.click();
              }, 300);
            }}
            className="flex flex-col items-center space-y-4 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="text-center">
              <h3 className="font-medium mb-4">{palette.name}</h3>
              <div className="flex justify-center gap-3">
                {palette.colors.map((color) => (
                  <div
                    key={color}
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Custom Palette Section */}
        <div className="flex flex-col items-center space-y-4 p-4 rounded-lg hover:bg-gray-50 transition-colors col-span-full">
          <h3 className="font-medium mb-2">Choose Your Own Palette</h3>
          <div className="text-center space-y-4 max-w-md mx-auto">
            <p className="text-sm text-gray-600 mb-2">{customPaletteName}</p>
            <div className="flex justify-center gap-3 mb-4">
              {customColors.map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                    currentColorIndex === index ? "border-elegant-primary" : "border-gray-200"
                  }`}
                  onClick={() => setCurrentColorIndex(index === currentColorIndex ? null : index)}
                />
              ))}
            </div>
            {currentColorIndex !== null && (
              <div className="flex justify-center mb-4 transition-all">
                <HexColorPicker
                  color={customColors[currentColorIndex]}
                  onChange={handleColorChange}
                />
              </div>
            )}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={generateRandomPalette}
                variant="outline"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Random
              </Button>
              <Button
                onClick={() => {
                  onSelect(`custom-${customColors.join("-")}`);
                  setTimeout(() => {
                    const continueButton = document.querySelector(
                      'button[data-continue]'
                    ) as HTMLButtonElement;
                    continueButton?.click();
                  }, 300);
                }}
                variant="default"
              >
                Use This Palette
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
