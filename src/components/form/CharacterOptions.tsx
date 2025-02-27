
import { ChevronDown, HelpCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { useEffect, useState } from "react";

interface CharacterOptionsProps {
  formData: {
    hasCharacters: boolean;
    showFaces: boolean;
    characterCount: string;
  };
  onChange: (field: string, value: any) => void;
}

export const CharacterOptions = ({
  formData,
  onChange
}: CharacterOptionsProps) => {
  const [charactersEnabled, setCharactersEnabled] = useState(formData.hasCharacters);
  const [facesEnabled, setFacesEnabled] = useState(formData.showFaces);
  const [characterCount, setCharacterCount] = useState<number>(parseInt(formData.characterCount) || 2);

  // When dependencies change, update the form data
  useEffect(() => {
    onChange("hasCharacters", charactersEnabled);
    onChange("showFaces", charactersEnabled && facesEnabled);
    onChange("characterCount", characterCount.toString());
  }, [charactersEnabled, facesEnabled, characterCount, onChange]);

  const toggleCharacters = (enabled: boolean) => {
    setCharactersEnabled(enabled);
    if (!enabled) {
      setFacesEnabled(false);
    }
  };

  const toggleFaces = (enabled: boolean) => {
    setFacesEnabled(enabled);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-serif mb-2 text-elegant-brown">Character Options</h2>
        <p className="text-gray-600 font-serif">
          Choose how you'd like characters to appear in your invitation
        </p>
      </div>

      {/* DID YOU KNOW - updated to purple */}
      <div className="bg-[#8B5CF6]/10 p-6 rounded-lg border border-[#8B5CF6]/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#8B5CF6]/20 rounded-full">
            <HelpCircle className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <p className="text-sm text-gray-700 flex-1">
            <span className="font-semibold">DID YOU KNOW: </span>
            Adding character illustrations to your invitation creates a more personal and memorable experience for your guests. Our talented artists can create beautiful representations of people, pets, or stylized characters.
          </p>
        </div>
      </div>

      <div className="space-y-8 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="characters" className="block text-sm font-medium mb-1">
                Include Character Illustrations
              </Label>
              <p className="text-xs text-gray-500">Add illustrated characters to your invitation</p>
            </div>
            <Switch 
              id="characters" 
              checked={charactersEnabled} 
              onCheckedChange={toggleCharacters} 
            />
          </div>

          {charactersEnabled && (
            <div className="pl-6 border-l-2 border-elegant-beige/30 mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="faces" className="block text-sm font-medium mb-1">
                    Show Faces
                  </Label>
                  <p className="text-xs text-gray-500">Characters with detailed facial features</p>
                </div>
                <Switch 
                  id="faces" 
                  checked={facesEnabled} 
                  onCheckedChange={toggleFaces} 
                />
              </div>

              {facesEnabled && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="character-count" className="text-sm font-medium">
                        Number of Characters
                      </Label>
                      <span className="text-sm font-medium bg-elegant-beige/20 px-2 py-1 rounded">
                        {characterCount}
                      </span>
                    </div>
                    <Select 
                      value={characterCount.toString()} 
                      onValueChange={(value) => setCharacterCount(parseInt(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select number of characters" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Character</SelectItem>
                        <SelectItem value="2">2 Characters</SelectItem>
                        <SelectItem value="3">3 Characters</SelectItem>
                        <SelectItem value="4">4 Characters</SelectItem>
                        <SelectItem value="5">5 Characters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-elegant-beige/10 rounded-lg p-4 border border-elegant-secondary/10">
                    <h3 className="text-sm font-medium text-elegant-brown mb-3">Pricing Information</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between">
                        <span>1 Character</span>
                        <span>+0 AED</span>
                      </li>
                      <li className="flex justify-between">
                        <span>2 Characters</span>
                        <span>+200 AED</span>
                      </li>
                      <li className="flex justify-between">
                        <span>3 Characters</span>
                        <span>+400 AED</span>
                      </li>
                      <li className="flex justify-between">
                        <span>4 Characters</span>
                        <span>+600 AED</span>
                      </li>
                      <li className="flex justify-between">
                        <span>5 Characters</span>
                        <span>+800 AED</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              <HelpCircle className="mr-2 h-4 w-4" />
              See Character Examples
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Character Style Examples</DrawerTitle>
                <DrawerDescription>
                  These examples show different character styles available
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 grid grid-cols-2 gap-4">
                <div className="border border-elegant-secondary/20 rounded-lg overflow-hidden">
                  <img src="/placeholder.svg" alt="Character example" className="w-full aspect-square object-cover" />
                  <div className="p-2 bg-elegant-beige/10">
                    <p className="text-xs font-medium text-elegant-brown">With Faces</p>
                  </div>
                </div>
                <div className="border border-elegant-secondary/20 rounded-lg overflow-hidden">
                  <img src="/placeholder.svg" alt="Character example" className="w-full aspect-square object-cover" />
                  <div className="p-2 bg-elegant-beige/10">
                    <p className="text-xs font-medium text-elegant-brown">Without Faces</p>
                  </div>
                </div>
                <div className="border border-elegant-secondary/20 rounded-lg overflow-hidden">
                  <img src="/placeholder.svg" alt="Character example" className="w-full aspect-square object-cover" />
                  <div className="p-2 bg-elegant-beige/10">
                    <p className="text-xs font-medium text-elegant-brown">Family Style</p>
                  </div>
                </div>
                <div className="border border-elegant-secondary/20 rounded-lg overflow-hidden">
                  <img src="/placeholder.svg" alt="Character example" className="w-full aspect-square object-cover" />
                  <div className="p-2 bg-elegant-beige/10">
                    <p className="text-xs font-medium text-elegant-brown">Couple Style</p>
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
  );
};
