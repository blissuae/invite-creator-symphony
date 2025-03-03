import { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { Wand2, Palette, Upload, PaintBucket, Grid } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ColorPaletteProps {
  selected: string;
  onSelect: (value: string) => void;
}

// Palette name generation arrays
const RANDOM_PALETTE_PREFIXES = [
  "Autumn",
  "Spring",
  "Summer",
  "Winter",
  "Forest",
  "Ocean",
  "Desert",
  "Mountain",
  "Sunset",
  "Dawn",
  "Dusk",
  "Misty",
];

const RANDOM_PALETTE_SUFFIXES = [
  "Morning",
  "Evening",
  "Twilight",
  "Breeze",
  "Whisper",
  "Shadow",
  "Light",
  "Glow",
  "Haze",
  "Mist",
  "Dream",
  "Vision",
];

// Color palettes with more diverse colors
const SOFT_COLORS = {
  greens: ["#F2FCE2", "#E2F0D2", "#D4E7C5"],
  blues: ["#D3E4FD", "#E5EFF9", "#C7DDF2"],
  yellows: ["#FEF7CD", "#FCF3D9", "#F9ECC7"],
  oranges: ["#FEC6A1", "#FFDCC7", "#FFE8D9"],
  purples: ["#F4E6FF", "#EBD6F7", "#E2C6EF"],
  pinks: ["#FFE6E6", "#FFD6D6", "#FFC7C7"],
  naturals: ["#E5D7C9", "#D4C8BE", "#CFCFCF"],
  whites: ["#FDFBF7", "#F7F3EE", "#F2EDE7"]
};

// Popular and trending tags for palettes
const FEATURED_PALETTES = {
  "Ocean\nBreeze": "Popular",
  "Spring\nMorning": "Trending",
  "Summer\nGlow": "Popular",
  "Autumn\nWhisper": "Featured",
  "Forest\nDream": "Trending",
  "Desert\nVision": "Popular"
};

// Function to get initial custom colors from the selected value
const getInitialCustomColors = (selected: string): string[] => {
  if (selected && selected.includes("###")) {
    const [_, colorsStr] = selected.split("###");
    return colorsStr.split(",");
  }
  return ["#E5D7C9", "#D4C8BE", "#CFCFCF"];
};

// Function to convert HSL to Hex
const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// Function to extract dominant colors from an image
const extractColorsFromImage = (imageElement: HTMLImageElement): Promise<string[]> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      resolve(["#E5E5E5", "#D4D4D4", "#FAFAFA"]);
      return;
    }

    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorMap = new Map<string, number>();

    // Sample every 5th pixel for performance
    for (let i = 0; i < imageData.length; i += 20) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      
      // Convert to hex
      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
    }

    // Sort colors by frequency
    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([color]) => color)
      .slice(0, 3);

    // Ensure we have exactly 3 colors
    while (sortedColors.length < 3) {
      sortedColors.push("#FAFAFA");
    }

    resolve(sortedColors);
  });
};

// Function to generate a soft/earthy color in hex format
const generateSoftColor = () => {
  const allColors = Object.values(SOFT_COLORS).flat();
  return allColors[Math.floor(Math.random() * allColors.length)];
};

const generateContrastingPalette = () => {
  // Pick a random color family
  const families = Object.keys(SOFT_COLORS);
  const family = families[Math.floor(Math.random() * families.length)];
  return SOFT_COLORS[family as keyof typeof SOFT_COLORS];
};

const generateRandomPalette = () => {
  const prefix = RANDOM_PALETTE_PREFIXES[Math.floor(Math.random() * RANDOM_PALETTE_PREFIXES.length)];
  const suffix = RANDOM_PALETTE_SUFFIXES[Math.floor(Math.random() * RANDOM_PALETTE_SUFFIXES.length)];
  return {
    id: `random-${Date.now()}-${Math.random()}`,
    name: `${prefix}\n${suffix}`,
    colors: generateContrastingPalette()
  };
};

export const ColorPalette = ({ selected, onSelect }: ColorPaletteProps) => {
  const [customColors, setCustomColors] = useState(() => getInitialCustomColors(selected));
  const [currentColorIndex, setCurrentColorIndex] = useState<number | null>(null);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [palettes, setPalettes] = useState(() => 
    Array(8).fill(null).map(generateRandomPalette)
  );
  const [selectedPaletteId, setSelectedPaletteId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'custom' | 'presets' | 'upload'>('custom');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImageName, setUploadedImageName] = useState<string>("");
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [showMobileColorPicker, setShowMobileColorPicker] = useState(false);
  const [activeMobileColor, setActiveMobileColor] = useState<number | null>(null);
  const [showImageConfirmation, setShowImageConfirmation] = useState(false);

  // Function to check if a palette is selected
  const isSelected = (value: string) => value === selected;

  // Effect to preserve selected palette when regenerating
  useEffect(() => {
    if (selected && selected.includes("###")) {
      const [_, colorsStr, name] = selected.split("###");
      const selectedPalette = palettes.find(p => p.name === name);
      if (selectedPalette) {
        setSelectedPaletteId(selectedPalette.id);
      }
    }
  }, [selected, palettes]);

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = new Image();
      img.onload = async () => {
        const extractedColors = await extractColorsFromImage(img);
        setExtractedColors(extractedColors);
        setUploadedImage(img.src);
        setUploadedImageName(file.name);
      };
      img.src = URL.createObjectURL(file);
    }
  };

  // Function to handle preset palette selection
  const handlePresetClick = (palette: { id: string, colors: string[], name: string }) => {
    const hexColors = palette.colors.map(color => {
      if (color.startsWith('hsl')) {
        const [h, s, l] = color.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0];
        return hslToHex(h, s, l);
      }
      return color;
    });
    
    setSelectedPaletteId(palette.id);
    setSelectedTab('custom');
    setCustomColors(hexColors);
    const paletteValue = `custom###${hexColors.join(",")}###${palette.name}`;
    onSelect(paletteValue);
  };

  // Function to regenerate palettes while preserving selected
  const regeneratePalettes = () => {
    const selectedPalette = palettes.find(p => p.id === selectedPaletteId);
    const newPalettes = Array(8).fill(null).map(generateRandomPalette);
    
    if (selectedPalette && selectedPaletteId) {
      const selectedIndex = palettes.findIndex(p => p.id === selectedPaletteId);
      if (selectedIndex !== -1) {
        newPalettes[selectedIndex] = selectedPalette;
      }
    }
    
    setPalettes(newPalettes);
  };

  // Update the image confirmation dialog button handler
  const handleImageColorsConfirm = () => {
    setSelectedTab('custom');
    setCustomColors(extractedColors);
    const paletteValue = `custom###${extractedColors.join(",")}###Uploaded: ${uploadedImageName}`;
    onSelect(paletteValue);
    setShowImageConfirmation(false);
  };

  // Handle image click for color picking
  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current || !canvasRef.current || currentColorIndex === null) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const scaleX = imageRef.current.naturalWidth / rect.width;
    const scaleY = imageRef.current.naturalHeight / rect.height;
    const actualX = x * scaleX;
    const actualY = y * scaleY;

    ctx.drawImage(imageRef.current, 0, 0, imageRef.current.naturalWidth, imageRef.current.naturalHeight);
    const pixel = ctx.getImageData(actualX, actualY, 1, 1).data;
    const color = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;

    const newColors = [...extractedColors];
    newColors[currentColorIndex] = color;
    setExtractedColors(newColors);
  };

  // Function to handle using extracted colors
  const handleUseExtractedColors = () => {
    const paletteValue = `custom###${extractedColors.join(",")}###Uploaded: ${uploadedImageName}`;
    onSelect(paletteValue);
    setCustomColors(extractedColors); // Update the custom palette
    setSelectedTab('custom');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top where custom palette is
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light mb-8">Choose Your Color Palette</h2>
      
      {/* Fact Box */}
      <div className="bg-[#b8860b] p-6 rounded-lg border border-[#b8860b]/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#b8860b]/20 rounded-full">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-white flex-1">
            <span className="font-semibold">DID YOU KNOW: </span>
            {[
              "80% of users love choosing subtle tones such as beige, white and off-white for an elegant look.",
              "Pastel colors work beautifully for newborn baby-related videos.",
              "Wedding videos often use colors that match the event's theme and decorations.",
              "Subtle earth tones create a timeless and sophisticated look.",
              "Color psychology shows that soft, muted colors create a sense of calm and elegance."
            ][Math.floor(Math.random() * 5)]}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Option 1: Custom Palette */}
        <div
          onClick={() => setSelectedTab('custom')}
          className={`p-6 rounded-lg cursor-pointer transition-all ${
            selectedTab === 'custom' 
              ? 'bg-elegant-primary/10 border-2 border-elegant-primary' 
              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
          }`}
        >
          <div className="flex flex-col items-center text-center gap-3">
            <PaintBucket className={`w-8 h-8 ${selectedTab === 'custom' ? 'text-elegant-primary' : 'text-gray-500'}`} />
            <h3 className="font-medium">Choose Your Own</h3>
            <p className="text-sm text-gray-500">Pick colors manually using the color picker</p>
          </div>
        </div>

        {/* Option 2: Preset Palettes */}
        <div
          onClick={() => setSelectedTab('presets')}
          className={`p-6 rounded-lg cursor-pointer transition-all ${
            selectedTab === 'presets' 
              ? 'bg-elegant-primary/10 border-2 border-elegant-primary' 
              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
          }`}
        >
          <div className="flex flex-col items-center text-center gap-3">
            <Grid className={`w-8 h-8 ${selectedTab === 'presets' ? 'text-elegant-primary' : 'text-gray-500'}`} />
            <h3 className="font-medium">Choose from Presets</h3>
            <p className="text-sm text-gray-500">Select from our curated color palettes</p>
          </div>
        </div>

        {/* Option 3: Upload Photo */}
        <div
          onClick={() => setSelectedTab('upload')}
          className={`p-6 rounded-lg cursor-pointer transition-all ${
            selectedTab === 'upload' 
              ? 'bg-elegant-primary/10 border-2 border-elegant-primary' 
              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
          }`}
        >
          <div className="flex flex-col items-center text-center gap-3">
            <Upload className={`w-8 h-8 ${selectedTab === 'upload' ? 'text-elegant-primary' : 'text-gray-500'}`} />
            <h3 className="font-medium">Extract from Photo</h3>
            <p className="text-sm text-gray-500">Generate palette from an image</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {selectedTab === 'custom' && (
          <>
            <div
              className={`w-full flex flex-col items-center space-y-4 cursor-pointer p-6 rounded-lg hover:bg-gray-50 transition-colors border-2 ${
                isSelected(`custom###${customColors.join(",")}###Custom Palette`)
                  ? "border-elegant-primary"
                  : "border-dashed border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Choose Your Own Palette</h3>
                <p className="text-gray-500 mb-4">Click the circles below to pick your colors</p>
                <div className="flex justify-center gap-6 mb-2">
                  {customColors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setCurrentColorIndex(index);
                        setShowCustomPicker(true);
                      }}
                      style={{ backgroundColor: color }}
                      className="w-12 h-12 rounded-full border border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
                <Palette className="w-6 h-6 mx-auto text-gray-400 mt-4" />
              </div>
            </div>

            <Dialog open={showCustomPicker} onOpenChange={setShowCustomPicker}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Choose Color {currentColorIndex !== null ? currentColorIndex + 1 : ''}</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  {currentColorIndex !== null && (
                    <HexColorPicker
                      color={customColors[currentColorIndex]}
                      onChange={(color) => {
                        const newColors = [...customColors];
                        newColors[currentColorIndex] = color;
                        setCustomColors(newColors);
                        onSelect(`custom###${newColors.join(",")}###Custom Palette`);
                      }}
                    />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}

        {selectedTab === 'presets' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button
                onClick={regeneratePalettes}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4" />
                Generate New Palettes
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
              {palettes.map((palette) => {
                const hexColors = palette.colors.map(color => {
                  if (color.startsWith('hsl')) {
                    const [h, s, l] = color.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0];
                    return hslToHex(h, s, l);
                  }
                  return color;
                });
                
                const badge = FEATURED_PALETTES[palette.name];
                
                return (
                  <div
                    key={palette.id}
                    onClick={() => handlePresetClick(palette)}
                    className={`relative flex flex-col items-center space-y-4 cursor-pointer p-4 rounded-lg transition-all ${
                      palette.id === selectedPaletteId
                        ? "border-elegant-primary border-2 bg-elegant-beige/10"
                        : badge 
                          ? "border-2 border-gray-200 hover:border-elegant-primary/50 hover:bg-elegant-beige/5 shadow-sm" 
                          : "border-transparent hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {badge && (
                      <div 
                        className={`absolute -top-2 -right-2 transform rotate-12 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                          badge === "Popular" 
                            ? "bg-blue-500 text-white" 
                            : badge === "Trending"
                              ? "bg-orange-500 text-white"
                              : "bg-purple-500 text-white"
                        }`}
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10% 50%)"
                        }}
                      >
                        {badge}
                      </div>
                    )}
                    <div className="text-center h-full">
                      <div className="mb-4 h-14 flex flex-col justify-center">
                        {palette.name.split('\n').map((line, i) => (
                          <h3 key={i} className={`font-medium leading-tight ${badge ? 'text-elegant-primary' : ''}`}>
                            {line}
                          </h3>
                        ))}
                      </div>
                      <div className="flex justify-center gap-3">
                        {hexColors.map((color, index) => (
                          <div
                            key={index}
                            style={{ backgroundColor: color }}
                            className={`w-8 h-8 rounded-full border transition-transform hover:scale-110 ${
                              badge ? 'border-elegant-primary/20 shadow-sm' : 'border-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedTab === 'upload' && (
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            {!uploadedImage ? (
              <div 
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload an Image</h3>
                <p className="text-gray-500 text-center text-sm">
                  Upload a photo and we'll extract a beautiful color palette
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left side - Color slots */}
                  <div className="space-y-4 order-2 md:order-1">
                    <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
                      {extractedColors.map((color, index) => (
                        <button
                          key={index}
                          className={`p-2 rounded-lg border-2 transition-all ${
                            currentColorIndex === index ? 'border-elegant-primary' : 'border-transparent'
                          }`}
                          onClick={() => setCurrentColorIndex(index)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-md"
                              style={{ backgroundColor: color }}
                            />
                            <p className="hidden md:block text-sm font-mono uppercase">
                              {color}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <p className="text-sm text-gray-500 text-center md:text-left">
                      {currentColorIndex !== null 
                        ? "Now tap anywhere in the image to pick that color" 
                        : "Select a color slot first"}
                    </p>

                    <div className="flex flex-col md:flex-row gap-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setUploadedImage(null);
                          setExtractedColors([]);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="w-full md:w-auto"
                      >
                        Try Another Photo
                      </Button>
                      <Button
                        onClick={handleUseExtractedColors}
                        className="w-full md:w-auto"
                      >
                        Use These Colors
                      </Button>
                    </div>
                  </div>

                  {/* Right side - Image */}
                  <div className="order-1 md:order-2">
                    <div className="relative aspect-video md:aspect-square w-full rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        ref={imageRef}
                        src={uploadedImage} 
                        alt="Uploaded image"
                        className="object-cover w-full h-full cursor-crosshair"
                        onClick={handleImageClick}
                      />
                      <canvas 
                        ref={canvasRef} 
                        className="hidden"
                        width={imageRef.current?.naturalWidth || 0}
                        height={imageRef.current?.naturalHeight || 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
