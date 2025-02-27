
import { InviteForm } from "@/components/InviteForm";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Testimonial data with added image paths
const testimonials = [
  {
    name: "Sara A.",
    location: "Dubai, UAE",
    text: "The digital invitation for my daughter's wedding was breathtaking. Everyone loved it!",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#FDE1D3"
  },
  {
    name: "Mohammed R.",
    location: "Riyadh, Saudi Arabia",
    text: "Bliss created the perfect invitation for our corporate event. Professional and elegant.",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#E5DEFF"
  },
  {
    name: "Fatima K.",
    location: "Doha, Qatar",
    text: "I was amazed by how they captured the essence of our family celebration. Truly memorable!",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#FEF7CD"
  },
  {
    name: "Hassan J.",
    location: "Kuwait City, Kuwait",
    text: "The attention to detail was exceptional. Our guests were impressed with the quality.",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#D3E4FD"
  },
  {
    name: "Layla M.",
    location: "Muscat, Oman",
    text: "Beautiful designs and excellent customer service. Highly recommended!",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#FFDEE2"
  },
  {
    name: "Ahmed Q.",
    location: "Manama, Bahrain",
    text: "The elegance and creativity in our wedding invitation exceeded our expectations.",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#F2FCE2"
  },
  {
    name: "Noor K.",
    location: "Baghdad, Iraq",
    text: "We received countless compliments on our digital invitation. Worth every penny!",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#F1F0FB"
  }
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showForm, setShowForm] = useState(false);
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
          {!showForm && (
            <p className="text-gray-600 mb-8">Elevate your special occasion with our beautiful custom designs</p>
          )}
        </div>
        
        {!showForm ? (
          <>
            {/* Social Validation Section */}
            <div className="mb-6 bg-[#8B5CF6]/10 rounded-xl p-4 shadow-sm border border-[#8B5CF6]/20 animate-fadeIn">
              <div className="flex items-center justify-center">
                <div className="flex -space-x-2 mr-3 overflow-hidden">
                  {/* Example customer avatars */}
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
            
            {/* Enhanced Testimonials Section */}
            <div className="mb-12 bg-white rounded-xl p-6 shadow-sm border border-elegant-secondary/10 animate-fadeIn">
              <h3 className="text-xl font-serif text-center text-elegant-brown mb-6">Our Clients Love Us</h3>
              
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
                      className="w-full shrink-0 px-4 py-2"
                    >
                      <div className="flex items-center">
                        {/* Left side: Client photo and text */}
                        <div className="flex-1 flex flex-col items-center md:items-start">
                          <div className="flex items-center mb-4">
                            <div className="mr-3 h-14 w-14 rounded-full overflow-hidden border-2 border-elegant-beige shadow-md">
                              <img src={testimonial.avatar} alt={testimonial.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium text-elegant-brown">{testimonial.name}</p>
                              <p className="text-xs text-gray-500">{testimonial.location}</p>
                            </div>
                          </div>
                          <div className="text-elegant-brown mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                          </div>
                          <p className="italic text-gray-700 mb-3 text-sm md:text-base">"{testimonial.text}"</p>
                        </div>
                        
                        {/* Right side: Design sample */}
                        <div className="hidden md:block w-1/3 pl-6">
                          <div className="relative w-36 h-72 mx-auto">
                            {/* Phone frame */}
                            <div className="absolute inset-0 bg-gray-900 rounded-[36px] shadow-xl">
                              {/* Inner bezel */}
                              <div className="absolute inset-1 rounded-[32px] bg-black overflow-hidden">
                                {/* Screen content */}
                                <div 
                                  className="absolute inset-0 rounded-[30px] overflow-hidden"
                                  style={{ backgroundColor: testimonial.designColor }}
                                >
                                  <img 
                                    src={testimonial.design} 
                                    alt="Design preview" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                {/* Notch */}
                                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-black rounded-b-xl"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-6 space-x-1">
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
            
            {/* Get Started Button */}
            <div className="flex justify-center mb-12 animate-fadeIn">
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-elegant-brown hover:bg-elegant-brown/90 text-white font-serif px-8 py-6 text-lg rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
              >
                Get Started
              </Button>
            </div>
          </>
        ) : (
          <InviteForm />
        )}
      </div>
    </div>
  );
};

export default Index;
