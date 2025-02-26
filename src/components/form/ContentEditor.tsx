
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Upload, Star, BookOpen, Heart, Sparkles, MessageCircle } from "lucide-react";

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
  const randomFact = CONTENT_FACTS[Math.floor(Math.random() * CONTENT_FACTS.length)];
  const FactIcon = randomFact.icon;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Random Fact Display */}
      <div className="bg-elegant-beige/20 p-6 rounded-lg border border-elegant-secondary/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-white rounded-full">
            <FactIcon className="w-5 h-5 text-elegant-primary" />
          </div>
          <p className="text-sm text-gray-600 italic flex-1">
            {randomFact.text}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-serif text-elegant-brown">Do you have a video idea in mind?</h3>
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

      <div className="space-y-4">
        <h3 className="text-lg font-serif text-elegant-brown">Share your story</h3>
        <Textarea
          value={formData.content}
          onChange={e => onChange("content", e.target.value)}
          placeholder="Tell us your story idea or the message you want to convey..."
          className="min-h-[200px]"
        />
      </div>

      {formData.hasVideoIdea && (
        <div className="space-y-4">
          <h3 className="text-lg font-serif text-elegant-brown">Your Video Idea</h3>
          <Textarea
            value={formData.videoIdea || ""}
            onChange={e => onChange("videoIdea", e.target.value)}
            placeholder="Describe your video idea in detail..."
            className="min-h-[150px]"
          />
        </div>
      )}
    </div>
  );
};
