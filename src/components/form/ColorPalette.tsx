
import { useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { Wand2, Upload } from "lucide-react";
import * as Vibrant from "node-vibrant";

interface ColorPaletteProps {
  selected: string;
  onSelect: (value: string) => void;
}

const RANDOM_PALETTE_PREFIXES = ["Celestial", "Enchanted", "Mystic", "Dreamy", "Crystal", "Royal", "Ethereal"];
const RANDOM_PALETTE_SUFFIXES = ["Dreams", "Whispers", "Harmony", "Symphony", "Vision", "Melody", "Wonder"];

const generateRandomPalette = () => {
  const name = `${RANDOM_PALETTE_PREFIXES[Math.floor(Math.random() * RANDOM_PALETTE_PREFIXES.length)]} ${
    RANDOM_PALETTE_SUFFIXES[Math.floor(Math.random() * RANDOM_PALETTE_SUFFIXES.length)]
  }`;
  const colors = Array.from({ length: 3 }, () => 
    `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
  );
  return { id: `random-${colors.join("-")}`, name, colors };
};

const generateInitialPalettes = () => [
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

export const ColorPalette = ({ selected, onSelect }: ColorPaletteProps) => {
  const [showCustomPalette, setShowCustomPalette] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [customColors, setCustomColors] = useState(["#000000", "#000000", "#000000"]);
  const [currentColorIndex, setCurrentColorIndex] = useState<number | null>(null);
  const [customPaletteName, setCustomPaletteName] = useState("Custom Palette");
  const [palettes, setPalettes] = useState(generateInitialPalettes());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateNewPalettes = () => {
    const newPalettes = palettes.map(() => generateRandomPalette());
    setPalettes(newPalettes);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = URL.createObjectURL(file);
      const vibrant = new Vibrant.default(imageUrl);
      const palette = await vibrant.getPalette();
      
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-light">Choose Your Color Palette</h2>
        <Button
          onClick={generateNewPalettes}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          Generate Palettes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* Choose Your Own Palette */}
        <div
          onClick={() => {
            setShowCustomPalette(true);
            setShowPhotoUpload(false);
          }}
          className="flex flex-col items-center space-y-4 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="text-center">
            <h3 className="font-medium mb-4">Choose Your Own Palette</h3>
            <div className="flex justify-center gap-3">
              {customColors.map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Upload Photo Option */}
        <div
          onClick={() => {
            setShowPhotoUpload(true);
            setShowCustomPalette(false);
            fileInputRef.current?.click();
          }}
          className="flex flex-col items-center space-y-4 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="text-center">
            <h3 className="font-medium mb-4">Upload a Photo</h3>
            <Upload className="w-8 h-8 mx-auto text-gray-400" />
          </div>
        </div>

        {/* Preset Palettes */}
        {palettes.map((palette) => (
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
      </div>

      {/* Custom Palette Panel */}
      {showCustomPalette && (
        <div className="mt-8 p-6 border rounded-lg bg-gray-50">
          <div className="max-w-md mx-auto space-y-6">
            <h3 className="font-medium text-center">{customPaletteName}</h3>
            <div className="flex justify-center gap-4">
              {customColors.map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer ${
                    currentColorIndex === index ? "border-elegant-primary" : "border-gray-200"
                  }`}
                  onClick={() => setCurrentColorIndex(index === currentColorIndex ? null : index)}
                />
              ))}
            </div>
            {currentColorIndex !== null && (
              <div className="flex justify-center">
                <HexColorPicker
                  color={customColors[currentColorIndex]}
                  onChange={(color) => {
                    const newColors = [...customColors];
                    newColors[currentColorIndex] = color;
                    setCustomColors(newColors);
                  }}
                />
              </div>
            )}
            <div className="flex justify-center gap-4">
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
      )}
    </div>
  );
};
