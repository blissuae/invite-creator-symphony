import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Upload, Star, BookOpen, Heart, Sparkles, MessageCircle } from "lucide-react";

interface ContentEditorProps {
  formData: {
    content: string;
    hasReferenceImage: boolean;
    referenceImage?: File;
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
  const [dragActive, setDragActive] = useState(false);
  const randomFact = CONTENT_FACTS[Math.floor(Math.random() * CONTENT_FACTS.length)];
  const FactIcon = randomFact.icon;

  const handleDrag = function(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onChange("referenceImage", file);
      onChange("hasReferenceImage", true);
    }
  };

  const handleChange = function(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange("referenceImage", file);
      onChange("hasReferenceImage", true);
    }
  };

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
        <h3 className="text-lg font-serif text-elegant-brown">Share your story</h3>
        <Textarea
          value={formData.content}
          onChange={e => onChange("content", e.target.value)}
          placeholder="Tell us your story idea or the message you want to convey..."
          className="min-h-[200px]"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-serif text-elegant-brown">Reference Image (Optional)</h3>
        <p className="text-sm text-gray-500">Upload an image to help us understand your vision better</p>
        <div 
          className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${dragActive ? 'bg-gray-50 border-elegant-primary' : 'border-gray-300 hover:border-gray-400'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" 
            onChange={handleChange}
          />
          <Upload className="w-6 h-6 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Drag and drop an image here, or click to select a file</p>
          {formData.referenceImage && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Selected File: {formData.referenceImage.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
