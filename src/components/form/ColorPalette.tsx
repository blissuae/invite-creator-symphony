
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { Wand2 } from "lucide-react";

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
];

const RANDOM_PALETTE_PREFIXES = ["Celestial", "Enchanted", "Mystic", "Dreamy", "Crystal", "Royal", "Ethereal"];
const RANDOM_PALETTE_SUFFIXES = ["Dreams", "Whispers", "Harmony", "Symphony", "Vision", "Melody", "Wonder"];

export const ColorPalette = ({ selected, onSelect }: ColorPaletteProps) => {
  const [customColors, setCustomColors] = useState(["#000000", "#000000", "#000000"]);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [customPaletteName, setCustomPaletteName] = useState("Custom Palette");

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
    const newColors = [...customColors];
    newColors[currentColorIndex] = color;
    setCustomColors(newColors);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-center mb-8">
        Choose Your Color Palette
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="flex flex-col items-center space-y-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <h3 className="font-medium mb-2">Choose Your Own Palette</h3>
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600 mb-2">{customPaletteName}</p>
            <div className="flex justify-center gap-3 mb-4">
              {customColors.map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                    currentColorIndex === index ? "border-elegant-primary" : "border-gray-200"
                  }`}
                  onClick={() => setCurrentColorIndex(index)}
                />
              ))}
            </div>
            <div className="flex justify-center mb-4">
              <HexColorPicker
                color={customColors[currentColorIndex]}
                onChange={handleColorChange}
              />
            </div>
            <Button
              onClick={generateRandomPalette}
              variant="outline"
              className="w-full"
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
              className="w-full"
            >
              Use This Palette
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
