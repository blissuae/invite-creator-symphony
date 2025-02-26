
import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { Wand2, Palette } from "lucide-react";

interface ColorPaletteProps {
  selected: string;
  onSelect: (value: string) => void;
}

// Function to generate a soft/earthy color
const generateSoftColor = () => {
  const earthyPalette = [
    // Beiges
    `hsl(${30 + Math.random() * 10}, ${20 + Math.random() * 10}%, ${85 + Math.random() * 10}%)`,
    `hsl(${35 + Math.random() * 15}, ${15 + Math.random() * 15}%, ${80 + Math.random() * 15}%)`,
    // Greys
    `hsl(${0}, ${0}%, ${70 + Math.random() * 20}%)`,
    `hsl(${0}, ${0}%, ${60 + Math.random() * 30}%)`,
    // Off-whites
    `hsl(${40 + Math.random() * 20}, ${10 + Math.random() * 5}%, ${90 + Math.random() * 8}%)`,
    `hsl(${45 + Math.random() * 15}, ${5 + Math.random() * 10}%, ${92 + Math.random() * 6}%)`,
    // Olive greens
    `hsl(${80 + Math.random() * 20}, ${20 + Math.random() * 15}%, ${60 + Math.random() * 15}%)`,
    `hsl(${90 + Math.random() * 30}, ${15 + Math.random() * 20}%, ${65 + Math.random() * 20}%)`,
    // Cool greys
    `hsl(${210}, ${5 + Math.random() * 10}%, ${75 + Math.random() * 15}%)`,
    `hsl(${200}, ${10 + Math.random() * 15}%, ${70 + Math.random() * 20}%)`,
    // Warm greys
    `hsl(${30}, ${5 + Math.random() * 10}%, ${80 + Math.random() * 15}%)`,
    // Soft blues
    `hsl(${210 + Math.random() * 20}, ${20 + Math.random() * 15}%, ${80 + Math.random() * 10}%)`,
    // Sage greens
    `hsl(${100 + Math.random() * 30}, ${15 + Math.random() * 20}%, ${75 + Math.random() * 15}%)`
  ];
  
  return earthyPalette[Math.floor(Math.random() * earthyPalette.length)];
};

const generateContrastingPalette = () => {
  return [generateSoftColor(), generateSoftColor(), generateSoftColor()];
};

const RANDOM_PALETTE_PREFIXES = [
  "Celestial", "Enchanted", "Mystic", "Dreamy", "Crystal", "Royal", "Ethereal",
  "Gentle", "Tranquil", "Serene", "Peaceful", "Elegant", "Timeless", "Natural",
  "Earthy", "Modern", "Classic", "Subtle", "Rustic", "Coastal", "Organic"
];

const RANDOM_PALETTE_SUFFIXES = [
  "Dreams", "Whispers", "Harmony", "Symphony", "Vision", "Melody", "Wonder",
  "Essence", "Breeze", "Dawn", "Dusk", "Mist", "Charm", "Grace", "Cloud",
  "Forest", "Garden", "Haven", "Meadow", "Oasis", "Retreat", "Sanctuary"
];

const generateRandomPalette = () => {
  const prefix = RANDOM_PALETTE_PREFIXES[Math.floor(Math.random() * RANDOM_PALETTE_PREFIXES.length)];
  const suffix = RANDOM_PALETTE_SUFFIXES[Math.floor(Math.random() * RANDOM_PALETTE_SUFFIXES.length)];
  return {
    id: `random-${Date.now()}-${Math.random()}`,
    name: `${prefix}\n${suffix}`,
    colors: generateContrastingPalette()
  };
};

const getInitialCustomColors = (selected: string) => {
  if (selected && selected.includes("###")) {
    const [_, colorsStr] = selected.split("###");
    if (colorsStr) {
      const colors = colorsStr.split(",");
      // Ensure exactly 3 colors
      while (colors.length < 3) {
        colors.push("#FAFAFA");
      }
      return colors.slice(0, 3);
    }
  }
  return ["#E5E5E5", "#D4D4D4", "#FAFAFA"];
};

export const ColorPalette = ({ selected, onSelect }: ColorPaletteProps) => {
  const [customColors, setCustomColors] = useState(() => getInitialCustomColors(selected));
  const [currentColorIndex, setCurrentColorIndex] = useState<number | null>(null);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [palettes, setPalettes] = useState(() => 
    Array(8).fill(null).map(generateRandomPalette)
  );

  // Effect to update customColors when selected value changes
  useEffect(() => {
    const colors = getInitialCustomColors(selected);
    setCustomColors(colors);
  }, [selected]);

  // Function to handle copying colors from a preset palette
  const handlePresetClick = (colors: string[]) => {
    // Ensure exactly 3 colors when copying from preset
    const adjustedColors = colors.slice(0, 3);
    while (adjustedColors.length < 3) {
      adjustedColors.push("#FAFAFA");
    }
    setCustomColors(adjustedColors);
    // Instead of opening the picker, directly select these colors
    const paletteValue = `custom###${adjustedColors.join(",")}###Custom Palette`;
    onSelect(paletteValue);
  };

  // Highlight selected palette
  const isSelected = (paletteValue: string) => {
    return selected === paletteValue;
  };

  // Function to regenerate palettes
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

      <div className="grid gap-6">
        {/* Custom Palette Option - Full Width */}
        <div
          className={`w-full flex flex-col items-center space-y-4 cursor-pointer p-6 rounded-lg hover:bg-gray-50 transition-colors border-2 ${
            isSelected(`custom###${customColors.join(",")}###Custom Palette`)
              ? "border-elegant-primary"
              : "border-dashed border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => setShowCustomPicker(true)}
        >
          <div className="text-center">
            <h3 className="text-xl font-medium mb-2">Choose Your Own Palette</h3>
            <p className="text-gray-500 mb-4">Click on any preset below to start with those colors, or create your own</p>
            <div className="flex justify-center gap-6 mb-2">
              {customColors.map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className="w-12 h-12 rounded-full border border-gray-200"
                />
              ))}
            </div>
            <Palette className="w-6 h-6 mx-auto text-gray-400 mt-4" />
          </div>
        </div>

        {/* Grid of Generated Palettes */}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {palettes.map((palette) => {
            const adjustedColors = palette.colors.slice(0, 3);
            while (adjustedColors.length < 3) {
              adjustedColors.push("#FAFAFA");
            }
            const paletteValue = `custom###${adjustedColors.join(",")}###${palette.name}`;
            return (
              <div
                key={palette.id}
                onClick={() => handlePresetClick(adjustedColors)}
                className="flex flex-col items-center space-y-4 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors border-2 border-transparent hover:border-gray-200"
              >
                <div className="text-center h-full">
                  <div className="mb-4 h-14 flex flex-col justify-center">
                    {palette.name.split('\n').map((line, i) => (
                      <h3 key={i} className="font-medium leading-tight">{line}</h3>
                    ))}
                  </div>
                  <div className="flex justify-center gap-3">
                    {adjustedColors.map((color, index) => (
                      <div
                        key={index}
                        style={{ backgroundColor: color }}
                        className="w-8 h-8 rounded-full border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Palette Picker Dialog */}
        {showCustomPicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="font-medium text-center mb-4">Edit Your Color Palette</h3>
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
                    const adjustedColors = [...customColors];
                    while (adjustedColors.length < 3) {
                      adjustedColors.push("#FAFAFA");
                    }
                    const paletteValue = `custom###${adjustedColors.slice(0, 3).join(",")}###Custom Palette`;
                    onSelect(paletteValue);
                    setShowCustomPicker(false);
                  }}
                >
                  Use This Palette
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
