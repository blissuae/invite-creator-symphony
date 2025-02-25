
import { useState } from "react";

interface ContentEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const ContentEditor = ({ content, onChange }: ContentEditorProps) => {
  const [isContentReady, setIsContentReady] = useState<boolean | null>(null);
  const [additionalRequests, setAdditionalRequests] = useState("");

  const handleAdditionalRequestsChange = (value: string) => {
    setAdditionalRequests(value);
    // Update the main content to include both the message and additional requests
    if (isContentReady) {
      onChange(`${content.split("\n\nAdditional Requests:")[0]}\n\nAdditional Requests:\n${value}`);
    } else {
      onChange(`Content will be shared later.\n\nAdditional Requests:\n${value}`);
    }
  };

  const handleContentChange = (value: string) => {
    onChange(`${value}\n\nAdditional Requests:\n${additionalRequests}`);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-light text-center mb-8">
        Write Your Message
      </h2>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Do you have the writing ready?</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setIsContentReady(true)}
              className={`px-6 py-3 rounded-lg border transition-all ${
                isContentReady === true
                  ? "bg-elegant-primary text-white border-elegant-primary"
                  : "border-elegant-secondary hover:border-elegant-primary"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setIsContentReady(false);
                onChange("Content will be shared later.");
              }}
              className={`px-6 py-3 rounded-lg border transition-all ${
                isContentReady === false
                  ? "bg-elegant-primary text-white border-elegant-primary"
                  : "border-elegant-secondary hover:border-elegant-primary"
              }`}
            >
              No
            </button>
          </div>
        </div>

        {isContentReady === true && (
          <div className="space-y-4">
            <textarea
              value={content.split("\n\nAdditional Requests:")[0]}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Enter the text for your digital invite..."
              className="w-full h-48 p-4 rounded-lg border border-form-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
            />
            <p className="text-sm text-gray-500 text-right">
              {content.split("\n\nAdditional Requests:")[0].length} characters
            </p>
          </div>
        )}

        {isContentReady === false && (
          <p className="text-gray-600 italic">
            You can share the content with us when it's ready
          </p>
        )}

        <div className="space-y-4 pt-6 border-t">
          <h3 className="text-lg font-medium">
            Do you have any additional requests? Please add here.
          </h3>
          <textarea
            value={additionalRequests}
            onChange={(e) => handleAdditionalRequestsChange(e.target.value)}
            placeholder="Enter any additional requests or special requirements..."
            className="w-full h-32 p-4 rounded-lg border border-form-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
};
