
import { Check, X, User, Users, Heart, Camera, Shield, Eye, MessageCircle, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Character } from "@/types/invite-form-types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface CharacterOptionsProps {
  formData: {
    hasCharacters: boolean;
    characters: Character[];
  };
  onChange: (field: string, value: any) => void;
}

const CHARACTER_FACTS = [
  {
    text: "Adding human characters makes your stories more personal and engaging!",
    icon: Heart
  },
  {
    text: "When working with faces, providing photo references from multiple angles helps us create more accurate representations.",
    icon: Camera
  },
  {
    text: "We take your privacy seriously - all photos shared remain strictly confidential.",
    icon: Shield
  },
  {
    text: "We respect your privacy on social media too - you can choose to blur faces in shared content.",
    icon: Eye
  },
  {
    text: "Our character artists specialize in capturing unique personality traits and expressions!",
    icon: MessageCircle
  }
];

export const CharacterOptions = ({
  formData,
  onChange
}: CharacterOptionsProps) => {
  const [showCharacterLimit, setShowCharacterLimit] = useState(false);
  
  const handleAddCharacter = () => {
    if (formData.characters.length < 5) {
      const newCharacters = [...formData.characters, { id: uuidv4(), showFace: false }];
      onChange("characters", newCharacters);
      
      // Update legacy fields for compatibility
      onChange("characterCount", String(newCharacters.length));
      onChange("showFaces", newCharacters.some(char => char.showFace));
    } else {
      setShowCharacterLimit(true);
      setTimeout(() => setShowCharacterLimit(false), 3000);
    }
  };
  
  const handleRemoveCharacter = (id: string) => {
    const newCharacters = formData.characters.filter(char => char.id !== id);
    onChange("characters", newCharacters);
    
    // Update legacy fields for compatibility
    onChange("characterCount", String(newCharacters.length));
    onChange("showFaces", newCharacters.some(char => char.showFace));
    
    if (newCharacters.length === 0) {
      onChange("hasCharacters", false);
    }
  };
  
  const handleToggleFace = (id: string, showFace: boolean) => {
    const newCharacters = formData.characters.map(char => 
      char.id === id ? { ...char, showFace } : char
    );
    onChange("characters", newCharacters);
    
    // Update legacy fields for compatibility
    onChange("showFaces", newCharacters.some(char => char.showFace));
  };

  const randomFact = CHARACTER_FACTS[Math.floor(Math.random() * CHARACTER_FACTS.length)];
  const FactIcon = randomFact.icon;

  return (
    <div className="space-y-8">
      {/* Random Fact Display */}
      <div className="bg-[#9b87f5] p-6 rounded-lg border border-[#9b87f5]/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#9b87f5]/20 rounded-full">
            <FactIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-white flex-1">
            <span className="font-semibold">DID YOU KNOW: </span>
            {randomFact.text}
          </p>
        </div>
      </div>

      {/* Human Characters Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif text-elegant-brown text-center">
          Do you want to add human characters?
        </h3>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => {
              onChange("hasCharacters", true);
              if (formData.characters.length === 0) {
                handleAddCharacter();
              }
            }} 
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${formData.hasCharacters ? "bg-elegant-primary text-white" : "border border-elegant-secondary hover:border-elegant-primary"}`}
          >
            <Check className="w-5 h-5" />
            Yes
          </button>
          <button 
            onClick={() => {
              onChange("hasCharacters", false);
              onChange("characters", []);
              onChange("characterCount", "");
              onChange("showFaces", false);
            }} 
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${formData.hasCharacters === false ? "bg-elegant-primary text-white" : "border border-elegant-secondary hover:border-elegant-primary"}`}
          >
            <X className="w-5 h-5" />
            No
          </button>
        </div>
      </div>

      {/* Character Management */}
      {formData.hasCharacters && (
        <div className="space-y-6">
          <h3 className="text-lg font-serif text-elegant-brown text-center">
            Add up to 5 characters
          </h3>
          
          {/* Character List */}
          <div className="space-y-4">
            {formData.characters.map((character, index) => (
              <div key={character.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-elegant-brown">Character {index + 1}</h4>
                  <button 
                    onClick={() => handleRemoveCharacter(character.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    aria-label="Remove character"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Would you like us to draw the face for this character?</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleToggleFace(character.id, true)} 
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${character.showFace ? "bg-elegant-primary text-white" : "border border-elegant-secondary hover:border-elegant-primary"}`}
                    >
                      <Check className="w-4 h-4" />
                      Yes, draw face
                    </button>
                    <button 
                      onClick={() => handleToggleFace(character.id, false)} 
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${!character.showFace ? "bg-elegant-primary text-white" : "border border-elegant-secondary hover:border-elegant-primary"}`}
                    >
                      <X className="w-4 h-4" />
                      No face
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add Character Button */}
          <div className="flex justify-center">
            {formData.characters.length < 5 ? (
              <Button 
                onClick={handleAddCharacter}
                className="bg-elegant-brown hover:bg-elegant-brown/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Character
              </Button>
            ) : (
              <p className={`text-sm text-orange-600 font-medium p-2 rounded-lg bg-orange-50 transition-opacity ${showCharacterLimit ? 'opacity-100' : 'opacity-0'}`}>
                Maximum 5 characters allowed
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
