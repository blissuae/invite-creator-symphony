
import { QuestionMarkCircle } from 'lucide-react';

interface FAQButtonProps {
  onClick: () => void;
}

export const FAQButton = ({ onClick }: FAQButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 z-40 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-elegant-beige text-elegant-brown"
      aria-label="Open FAQ"
    >
      <QuestionMarkCircle className="h-6 w-6" />
    </button>
  );
};
