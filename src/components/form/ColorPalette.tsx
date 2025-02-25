
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { Wand2 } from "lucide-react";

interface ColorPaletteProps {
  selected: string;
  onSelect: (value: string) => void;
}

// Function to generate a soft/pastel color
const generateSoftColor = () => {
  // Generate higher luminance (pastel) colors with good contrast
  const hue = Math.floor(Math.random() * 360);
  const saturation = 25 + Math.random() * 35; // Lower saturation for softness (25-60%)
  const lightness = 65 + Math.random() * 20; // Higher lightness for pastel effect (65-85%)
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Function to generate contrasting colors in a palette
const generateContrastingPalette = () => {
  // Start with a random hue
  const baseHue = Math.floor(Math.random() * 360);
  // Generate three colors with good contrast by spacing hues ~120 degrees apart
  return [
    generateSoftColor(),
    `hsl(${(baseHue + 120) % 360}, ${30 + Math.random() * 30}%, ${70 + Math.random() * 15}%)`,
    `hsl(${(baseHue + 240) % 360}, ${30 + Math.random() * 30}%, ${70 + Math.random() * 15}%)`
  ];
};

const generateRandomPalette = () => {
  const prefix = RANDOM_PALETTE_PREFIXES[Math.floor(Math.random() * RANDOM_PALETTE_PREFIXES.length)];
  const suffix = RANDOM_PALETTE_SUFFIXES[Math.floor(Math.random() * RANDOM_PALETTE_SUFFIXES.length)];
  return {
    id: `random-${Date.now()}`,
    name: `${prefix} ${suffix}`,
    colors: generateContrastingPalette()
  };
};

const RANDOM_PALETTE_PREFIXES = ["Celestial", "Enchanted", "Mystic", "Dreamy", "Crystal", "Royal", "Ethereal"];
const RANDOM_PALETTE_SUFFIXES = ["Dreams", "Whispers", "Harmony", "Symphony", "Vision", "Melody", "Wonder"];

export const ColorPalette = ({ selected, onSelect }: ColorPaletteProps) => {
  const [customColors, setCustomColors] = useState(["#E5E5E5", "#D4D4D4", "#FAFAFA"]);
  const [currentColorIndex, setCurrentColorIndex] = useState<number | null>(null);
  const [customPaletteName, setCustomPaletteName] = useState("Custom Palette");
  const [palettes, setPalettes] = useState(Array(8).fill(null).map(generateRandomPalette));
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const regeneratePalettes = () => {
    setPalettes(Array(8).fill(null).map(generateRandomPalette));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-light">
          Choose Your Color Palette
        </h2>
        <Button
          onClick={regeneratePalettes}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          Generate Palettes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* Custom Palette Option (Always First) */}
        <div
          className="flex flex-col items-center space-y-4 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setShowCustomPicker(true)}
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

        {/* Generated Palettes */}
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
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Palette Picker Dialog */}
      {showCustomPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="font-medium text-center mb-4">{customPaletteName}</h3>
            <div className="flex justify-center gap-4 mb-6">
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
              <div className="flex justify-center mb-6">
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
                variant="outline"
                onClick={() => setShowCustomPicker(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSelect(`custom-${customColors.join("-")}`);
                  setShowCustomPicker(false);
                  setTimeout(() => {
                    const continueButton = document.querySelector(
                      'button[data-continue]'
                    ) as HTMLButtonElement;
                    continueButton?.click();
                  }, 300);
                }}
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
