
import { useState, useEffect } from "react";

interface ContentEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const ContentEditor = ({ content, onChange }: ContentEditorProps) => {
  const [isContentReady, setIsContentReady] = useState<boolean | null>(
    content === "Content will be shared later." ? false : content ? true : null
  );
  
  const [hasVideoIdea, setHasVideoIdea] = useState<boolean | null>(null);
  const [videoIdea, setVideoIdea] = useState("");
  const [additionalRequests, setAdditionalRequests] = useState("");

  // Initialize the states from content when component mounts
  useEffect(() => {
    // Extract video idea state from content if it exists
    if (content.includes("Video Idea:")) {
      setHasVideoIdea(true);
      const videoIdeaMatch = content.match(/Video Idea:\n([\s\S]*?)(?=\n\n|$)/);
      if (videoIdeaMatch) {
        setVideoIdea(videoIdeaMatch[1]);
      }
    }

    // Extract additional requests if they exist
    const additionalRequestsMatch = content.match(/Additional Requests:\n([\s\S]*?)$/);
    if (additionalRequestsMatch) {
      setAdditionalRequests(additionalRequestsMatch[1]);
    }

    // Extract main content
    const mainContent = content.split("\n\nVideo Idea:")[0].split("\n\nAdditional Requests:")[0];
    if (mainContent && mainContent !== "Content will be shared later.") {
      setIsContentReady(true);
    }
  }, []); // Empty dependency array as we only want to run this once on mount

  const handleAdditionalRequestsChange = (value: string) => {
    setAdditionalRequests(value);
    updateCompleteContent(
      isContentReady ? content.split("\n\nAdditional Requests:")[0] : "Content will be shared later.",
      value,
      hasVideoIdea ? videoIdea : null
    );
  };

  const handleContentChange = (value: string) => {
    updateCompleteContent(value, additionalRequests, hasVideoIdea ? videoIdea : null);
  };

  const handleVideoIdeaChange = (value: string) => {
    setVideoIdea(value);
    updateCompleteContent(
      isContentReady ? content.split("\n\nVideo Idea:")[0].split("\n\nAdditional Requests:")[0] : "Content will be shared later.",
      additionalRequests,
      value
    );
  };

  const updateCompleteContent = (mainContent: string, requests: string, videoIdeaContent: string | null) => {
    let finalContent = mainContent;
    
    if (videoIdeaContent !== null) {
      finalContent += "\n\nVideo Idea:\n" + videoIdeaContent;
    }
    
    finalContent += "\n\nAdditional Requests:\n" + requests;
    
    onChange(finalContent);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-light text-center mb-8">
        Write Your Message
      </h2>

      <div className="space-y-6">
        {/* Video Idea Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Do you have an idea for the video? <span className="text-red-500">*</span>
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => setHasVideoIdea(true)}
              className={`px-6 py-3 rounded-lg border transition-all ${
                hasVideoIdea === true
                  ? "bg-elegant-primary text-white border-elegant-primary"
                  : "border-elegant-secondary hover:border-elegant-primary"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setHasVideoIdea(false);
                setVideoIdea("");
                updateCompleteContent(
                  isContentReady ? content.split("\n\nVideo Idea:")[0].split("\n\nAdditional Requests:")[0] : "Content will be shared later.",
                  additionalRequests,
                  null
                );
              }}
              className={`px-6 py-3 rounded-lg border transition-all ${
                hasVideoIdea === false
                  ? "bg-elegant-primary text-white border-elegant-primary"
                  : "border-elegant-secondary hover:border-elegant-primary"
              }`}
            >
              No
            </button>
          </div>
        </div>

        {hasVideoIdea === true && (
          <div className="space-y-4">
            <textarea
              value={videoIdea}
              onChange={(e) => handleVideoIdeaChange(e.target.value)}
              placeholder="Please describe your video idea..."
              className="w-full h-32 p-4 rounded-lg border border-form-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
            />
          </div>
        )}

        {hasVideoIdea === false && (
          <p className="text-gray-600 italic">
            No worries! We'll think of a beautiful idea for you :)
          </p>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Do you have the writing ready? <span className="text-red-500">*</span>
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsContentReady(true);
                handleContentChange("");
              }}
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
                updateCompleteContent("Content will be shared later.", additionalRequests, hasVideoIdea ? videoIdea : null);
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
              value={content.split("\n\nVideo Idea:")[0].split("\n\nAdditional Requests:")[0]}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Enter the text for your digital invite..."
              className="w-full h-48 p-4 rounded-lg border border-form-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
            />
            <p className="text-sm text-gray-500 text-right">
              {content.split("\n\nVideo Idea:")[0].split("\n\nAdditional Requests:")[0].length} characters
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
