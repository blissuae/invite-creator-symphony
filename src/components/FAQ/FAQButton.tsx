
import { HelpCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FAQButtonProps {
  onClick: () => void;
}

export const FAQButton = ({ onClick }: FAQButtonProps) => {
  const isMobile = useIsMobile();
  
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 md:right-6 z-40 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-elegant-beige text-elegant-brown group animate-pulse"
      aria-label="Open FAQ"
    >
      <div className="relative overflow-hidden group-hover:animate-none">
        <HelpCircle className="h-7 w-7 md:h-8 md:w-8 group-hover:scale-110 transition-transform" />
        <span className="absolute inset-0 rounded-full bg-elegant-beige/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
      </div>
    </button>
  );
};
