import { useState, useMemo } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Star, BookOpen, Heart, Sparkles, MessageCircle } from "lucide-react";

interface ContentEditorProps {
  formData: {
    content: string;
    hasVideoIdea: boolean;
    videoIdea?: string;
  };
  onChange: (field: string, value: any) => void;
}

const CONTENT_FACTS = [
  {
    text: "Our top-rated videos feature beautiful storytelling that captures hearts and minds!",
    icon: Star
  },
  {
    text: "Including personal memories and special moments makes your video truly unique.",
    icon: Heart
  },
  {
    text: "Share your story ideas with us, and we'll bring them to life with creative flair!",
    icon: Sparkles
  },
  {
    text: "The most engaging videos tell authentic, heartfelt stories that resonate with viewers.",
    icon: BookOpen
  },
  {
    text: "Your unique story deserves to be told in a way that captivates and inspires.",
    icon: MessageCircle
  }
];

export const ContentEditor = ({
  formData,
  onChange
}: ContentEditorProps) => {
  const [hasVideoText, setHasVideoText] = useState(false);
  
  const { randomFact, FactIcon } = useMemo(() => {
    const fact = CONTENT_FACTS[Math.floor(Math.random() * CONTENT_FACTS.length)];
    return {
      randomFact: fact,
      FactIcon: fact.icon
    };
  }, []); // Empty dependency array means this only runs once when component mounts

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Random Fact Display */}
      <div className="bg-[#b8860b] p-6 rounded-lg border border-[#b8860b]/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#b8860b]/20 rounded-full">
            <FactIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-white flex-1">
            <span className="font-semibold">DID YOU KNOW: </span>
            {randomFact.text}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-serif text-elegant-brown">Do you have an idea in mind?</h3>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={formData.hasVideoIdea ? "default" : "outline"}
            onClick={() => onChange("hasVideoIdea", true)}
          >
            Yes
          </Button>
          <Button
            type="button"
            variant={formData.hasVideoIdea === false ? "default" : "outline"}
            onClick={() => {
              onChange("hasVideoIdea", false);
              onChange("videoIdea", "");
            }}
          >
            No
          </Button>
        </div>
      </div>

      {formData.hasVideoIdea && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif text-elegant-brown">Share your idea</h3>
          <Textarea
            value={formData.videoIdea || ""}
            onChange={e => onChange("videoIdea", e.target.value)}
            placeholder="Tell us about your idea in detail..."
            className="min-h-[150px]"
          />
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-serif text-elegant-brown">Do you want to share text content?</h3>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={hasVideoText ? "default" : "outline"}
            onClick={() => setHasVideoText(true)}
          >
            Yes
          </Button>
          <Button
            type="button"
            variant={!hasVideoText ? "default" : "outline"}
            onClick={() => {
              setHasVideoText(false);
              onChange("content", "");
            }}
          >
            No
          </Button>
        </div>
      </div>

      {hasVideoText && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif text-elegant-brown">Your text content</h3>
          <Textarea
            value={formData.content}
            onChange={e => onChange("content", e.target.value)}
            placeholder="Enter the text you want to appear..."
            className="min-h-[200px]"
          />
        </div>
      )}
    </div>
  );
};
