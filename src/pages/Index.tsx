
import { InviteForm } from "@/components/InviteForm";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Testimonial data
const testimonials = [
  {
    name: "Sara A.",
    location: "Dubai, UAE",
    text: "The digital invitation for my daughter's wedding was breathtaking. Everyone loved it!"
  },
  {
    name: "Mohammed R.",
    location: "Riyadh, Saudi Arabia",
    text: "Bliss created the perfect invitation for our corporate event. Professional and elegant."
  },
  {
    name: "Fatima K.",
    location: "Doha, Qatar",
    text: "I was amazed by how they captured the essence of our family celebration. Truly memorable!"
  },
  {
    name: "Hassan J.",
    location: "Kuwait City, Kuwait",
    text: "The attention to detail was exceptional. Our guests were impressed with the quality."
  },
  {
    name: "Layla M.",
    location: "Muscat, Oman",
    text: "Beautiful designs and excellent customer service. Highly recommended!"
  }
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging]);

  const handlePrevious = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const distance = e.clientX - startX;
    if (distance > 50) {
      handlePrevious();
      setIsDragging(false);
    } else if (distance < -50) {
      handleNext();
      setIsDragging(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-elegant-beige to-white">
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <div className="text-center mb-8 animate-fadeIn">
          <img 
            src="/lovable-uploads/f566f022-debc-49f9-85e0-e54a4d70cfbd.png" 
            alt="Bliss Logo" 
            className="h-8 object-contain mx-auto mb-8"
          />
          <h1 className="text-4xl font-serif mb-4 text-elegant-brown">Create Your Digital Invite</h1>
        </div>
        
        {/* Social Validation Section - Simplified to 3 photos */}
        <div className="mb-6 bg-[#8B5CF6]/10 rounded-xl p-4 shadow-sm border border-[#8B5CF6]/20 animate-fadeIn">
          <div className="flex items-center justify-center">
            <div className="flex -space-x-2 mr-3 overflow-hidden">
              {/* Example customer avatars - reduced to 3 */}
              <div className="inline-block h-7 w-7 rounded-full bg-white border-2 border-white overflow-hidden">
                <img src="/placeholder.svg" alt="Customer" className="w-full h-full object-cover" />
              </div>
              <div className="inline-block h-7 w-7 rounded-full bg-white border-2 border-white overflow-hidden">
                <img src="/placeholder.svg" alt="Customer" className="w-full h-full object-cover" />
              </div>
              <div className="inline-block h-7 w-7 rounded-full bg-white border-2 border-white flex items-center justify-center text-[10px] font-medium text-[#8B5CF6]">+</div>
            </div>
            <p className="text-sm text-gray-700 font-medium">
              <span className="font-bold text-elegant-brown">250+</span> Happy customers and counting 
              <span className="inline-flex items-center ml-1 space-x-1">
                <span title="United Arab Emirates">🇦🇪</span>
                <span title="Saudi Arabia">🇸🇦</span>
                <span title="Qatar">🇶🇦</span>
                <span title="Kuwait">🇰🇼</span>
                <span title="Oman">🇴🇲</span>
                <span title="Bahrain">🇧🇭</span>
                <span title="Iraq">🇮🇶</span>
              </span>
            </p>
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-elegant-secondary/10 animate-fadeIn">
          <div 
            className="relative overflow-hidden"
            ref={testimonialRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full z-10 px-2">
              <button 
                onClick={handlePrevious}
                className="bg-white rounded-full p-1.5 shadow-md text-elegant-brown hover:bg-elegant-beige transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                className="bg-white rounded-full p-1.5 shadow-md text-elegant-brown hover:bg-elegant-beige transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div 
              className="transition-transform duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full shrink-0 px-6 py-2"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-elegant-brown mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <p className="italic text-gray-700 mb-3">"{testimonial.text}"</p>
                    <p className="font-medium text-elegant-brown">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-4 space-x-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    currentTestimonial === index 
                      ? 'w-4 bg-elegant-brown' 
                      : 'w-1.5 bg-gray-300'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <InviteForm />
      </div>
    </div>
  );
};

export default Index;
