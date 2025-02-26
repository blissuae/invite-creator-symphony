import { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { Wand2, Palette, Upload, PaintBucket, Grid } from "lucide-react";

interface ColorPaletteProps {
  selected: string;
  onSelect: (value: string) => void;
}

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

// Function to generate a soft/earthy color in hex format
const generateSoftColor = () => {
  const earthyPalette = [
    "#E5D7C9", // Beige
    "#D4C8BE", // Warm Gray
    "#CFCFCF", // Cool Gray
    "#E8E6E1", // Off-white
    "#B8B4A9", // Sage
    "#D5D5D5", // Light Gray
    "#C7C3BB", // Warm Taupe
    "#E2DFD7"  // Light Beige
  ];
  
  return earthyPalette[Math.floor(Math.random() * earthyPalette.length)];
};

const generateContrastingPalette = () => {
  return [generateSoftColor(), generateSoftColor(), generateSoftColor()];
};

// ... keep existing code (RANDOM_PALETTE_PREFIXES and RANDOM_PALETTE_SUFFIXES)

const generateRandomPalette = () => {
  const prefix = RANDOM_PALETTE_PREFIXES[Math.floor(Math.random() * RANDOM_PALETTE_PREFIXES.length)];
  const suffix = RANDOM_PALETTE_SUFFIXES[Math.floor(Math.random() * RANDOM_PALETTE_SUFFIXES.length)];
  return {
    id: `random-${Date.now()}-${Math.random()}`,
    name: `${prefix}\n${suffix}`,
    colors: generateContrastingPalette()
  };
};

// ... keep existing code (getInitialCustomColors and extractColorsFromImage functions)

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
  const [showImageConfirmation, setShowImageConfirmation] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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
        setShowImageConfirmation(true);
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const img = imageRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas || currentColorIndex === null) return;

    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale coordinates to actual image dimensions
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;
    const actualX = x * scaleX;
    const actualY = y * scaleY;

    // Get color data
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    const pixel = ctx.getImageData(actualX, actualY, 1, 1).data;
    const color = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;

    // Update color
    const newColors = [...extractedColors];
    newColors[currentColorIndex] = color;
    setExtractedColors(newColors);
  };

  // Function to handle clicking on a preset palette
  const handlePresetClick = (palette: { id: string, colors: string[], name: string }) => {
    const hexColors = palette.colors.map(color => {
      if (color.startsWith('hsl')) {
        const [h, s, l] = color.match(/\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0];
        return hslToHex(h, s, l);
      }
      return color;
    });
    
    setSelectedPaletteId(palette.id);
    const paletteValue = `custom###${hexColors.join(",")}###${palette.name}`;
    onSelect(paletteValue);
    // Automatically continue to next page
    document.querySelector('[data-continue]')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light mb-8">
        Choose Your Color Palette
      </h2>

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
          /* Custom Palette Option */
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
              <p className="text-gray-500 mb-4">Click the circles below to pick your colors</p>
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
                
                return (
                  <div
                    key={palette.id}
                    onClick={() => handlePresetClick(palette)}
                    className={`flex flex-col items-center space-y-4 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors border-2 ${
                      palette.id === selectedPaletteId
                        ? "border-elegant-primary border-2"
                        : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    <div className="text-center h-full">
                      <div className="mb-4 h-14 flex flex-col justify-center">
                        {palette.name.split('\n').map((line, i) => (
                          <h3 key={i} className="font-medium leading-tight">{line}</h3>
                        ))}
                      </div>
                      <div className="flex justify-center gap-3">
                        {hexColors.map((color, index) => (
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
          </div>
        )}

        {selectedTab === 'upload' && (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">Upload an Image</h3>
            <p className="text-gray-500 mb-4 text-center">
              Upload a photo and we'll extract a beautiful color palette from it
            </p>
            <Button 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose Image
            </Button>
          </div>
        )}

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
                    // Automatically continue to next page
                    document.querySelector('[data-continue]')?.dispatchEvent(
                      new MouseEvent('click', { bubbles: true })
                    );
                  }}
                >
                  Use This Palette
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Image Upload Confirmation Dialog */}
        {showImageConfirmation && uploadedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4">
              <h3 className="font-medium text-center mb-6 text-xl">Confirm Color Palette</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Preview */}
                <div className="space-y-4">
                  <h4 className="font-medium">Uploaded Image</h4>
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-gray-200">
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
                  <p className="text-sm text-gray-500 text-center">
                    Select a color slot on the right, then click anywhere on the image to pick that color
                  </p>
                </div>

                {/* Color Picker */}
                <div className="space-y-6">
                  <h4 className="font-medium">Extracted Colors</h4>
                  <p className="text-sm text-gray-500">Click on any color to adjust it</p>
                  <div className="flex flex-col gap-6">
                    {extractedColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div
                          className={`w-16 h-16 rounded-lg cursor-pointer border-2 ${
                            currentColorIndex === index ? 'border-elegant-primary' : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setCurrentColorIndex(index === currentColorIndex ? null : index)}
                        />
                        <div className="text-sm">
                          <div className="font-medium">Color {index + 1}</div>
                          <div className="text-gray-500 uppercase">{color}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {currentColorIndex !== null && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-4">Adjust Color</h4>
                      <HexColorPicker
                        color={extractedColors[currentColorIndex]}
                        onChange={(color) => {
                          const newColors = [...extractedColors];
                          newColors[currentColorIndex] = color;
                          setExtractedColors(newColors);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowImageConfirmation(false);
                    setUploadedImage(null);
                    setExtractedColors([]);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={() => {
                  const paletteValue = `custom###${extractedColors.join(",")}###Uploaded: ${uploadedImageName}`;
                  onSelect(paletteValue);
                  setShowImageConfirmation(false);
                  // Automatically continue to next page
                  document.querySelector('[data-continue]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}>
                  Use These Colors
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
