
import { Check, X, User, Users, Heart, Camera, Shield, Eye, MessageCircle } from "lucide-react";

interface CharacterOptionsProps {
  formData: {
    hasCharacters: boolean;
    showFaces: boolean;
    characterCount: string;
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
  const handleCharacterCountChange = (value: string) => {
    onChange("characterCount", value);
  };

  const randomFact = CHARACTER_FACTS[Math.floor(Math.random() * CHARACTER_FACTS.length)];
  const FactIcon = randomFact.icon;

  return (
    <div className="space-y-8">
      {/* Random Fact Display - Updated to purple */}
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
            onClick={() => onChange("hasCharacters", true)} 
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${formData.hasCharacters ? "bg-elegant-primary text-white" : "border border-elegant-secondary hover:border-elegant-primary"}`}
          >
            <Check className="w-5 h-5" />
            Yes
          </button>
          <button 
            onClick={() => {
              onChange("hasCharacters", false);
              onChange("showFaces", false);
              onChange("characterCount", "");
            }} 
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${formData.hasCharacters === false ? "bg-elegant-primary text-white" : "border border-elegant-secondary hover:border-elegant-primary"}`}
          >
            <X className="w-5 h-5" />
            No
          </button>
        </div>
      </div>

      {/* Show Faces Selection - Conditional */}
      {formData.hasCharacters && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif text-elegant-brown text-center">
            Do you want us to draw the faces?<br />
            Note: If selected yes, we'd need photos as reference to draw human faces.
          </h3>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => onChange("showFaces", true)} 
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${formData.showFaces ? "bg-elegant-primary text-white" : "border border-elegant-secondary hover:border-elegant-primary"}`}
            >
              <Check className="w-5 h-5" />
              Yes
            </button>
            <button 
              onClick={() => {
                onChange("showFaces", false);
                onChange("characterCount", "");
              }} 
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${formData.showFaces === false ? "bg-elegant-primary text-white" : "border border-elegant-secondary hover:border-elegant-primary"}`}
            >
              <X className="w-5 h-5" />
              No
            </button>
          </div>
        </div>
      )}

      {/* Character Count Selection - Only show when faces are enabled */}
      {formData.hasCharacters && formData.showFaces && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif text-elegant-brown text-center">
            Total number of characters
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["1", "2", "3", "4", "5"].map(count => (
              <button 
                key={count} 
                onClick={() => handleCharacterCountChange(count)} 
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${formData.characterCount === count ? "bg-elegant-primary text-white" : "border border-elegant-secondary hover:border-elegant-primary"}`}
              >
                {count === "1" ? <User className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                {count}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
