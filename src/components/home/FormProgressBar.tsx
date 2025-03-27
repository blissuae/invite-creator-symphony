
import { Progress } from "@/components/ui/progress";

interface FormProgressBarProps {
  progress: number;
  currentMessage: string;
}

export const FormProgressBar = ({ progress, currentMessage }: FormProgressBarProps) => {
  return (
    <div className="mb-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">Your progress</span>
        <span className="text-sm font-medium text-elegant-brown">{progress}%</span>
      </div>
      <div className="relative">
        <Progress value={progress} className="h-2 bg-gray-200" 
          style={{ 
            "--primary": "#8b7256", 
            "--primary-foreground": "255 255 255"
          } as React.CSSProperties} 
        />
        <div 
          className="absolute top-0 h-4 w-4 rounded-full bg-elegant-brown border-2 border-white shadow-md transform -translate-y-1/4"
          style={{ 
            left: `calc(${progress}% - 8px)`,
            transition: "left 0.5s ease-out"
          }}
        />
      </div>
      <p className="text-sm text-elegant-brown mt-4 text-center font-medium animate-fadeIn">
        {currentMessage}
      </p>
    </div>
  );
};
