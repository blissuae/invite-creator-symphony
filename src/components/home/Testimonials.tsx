
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Define the testimonial type
interface Testimonial {
  name: string;
  location: string;
  text: string;
  avatar: string;
  design: string;
  designColor: string;
  rating: number;
  initials: string;
  bgColor: string;
}

// Export the testimonials data for reuse
export const testimonials: Testimonial[] = [
  {
    name: "Sara A.",
    location: "Dubai, UAE",
    text: "The digital invitation for my daughter's wedding was breathtaking. Everyone loved it!",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#FDE1D3",
    rating: 5,
    initials: "SA",
    bgColor: "#9b87f5"
  },
  {
    name: "Mohammed R.",
    location: "Riyadh, Saudi Arabia",
    text: "Bliss created the perfect invitation for our corporate event. Professional and elegant.",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#E5DEFF",
    rating: 5,
    initials: "MR",
    bgColor: "#F97316"
  },
  {
    name: "Fatima K.",
    location: "Doha, Qatar",
    text: "I was amazed by how they captured the essence of our family celebration. Truly memorable!",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#FEF7CD",
    rating: 5,
    initials: "FK",
    bgColor: "#D946EF"
  },
  {
    name: "Hassan J.",
    location: "Kuwait City, Kuwait",
    text: "The attention to detail was exceptional. Our guests were impressed with the quality.",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#D3E4FD",
    rating: 4,
    initials: "HJ",
    bgColor: "#0EA5E9"
  },
  {
    name: "Layla M.",
    location: "Muscat, Oman",
    text: "Beautiful designs and excellent customer service. Highly recommended!",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#FFDEE2",
    rating: 5,
    initials: "LM",
    bgColor: "#8B5CF6"
  },
  {
    name: "Ahmed Q.",
    location: "Manama, Bahrain",
    text: "The elegance and creativity in our wedding invitation exceeded our expectations.",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#F2FCE2",
    rating: 5,
    initials: "AQ",
    bgColor: "#1EAEDB"
  },
  {
    name: "Noor K.",
    location: "Baghdad, Iraq",
    text: "We received countless compliments on our digital invitation. Worth every penny!",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#F1F0FB",
    rating: 5,
    initials: "NK",
    bgColor: "#6E59A5"
  }
];

export const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);

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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mb-12 bg-gradient-to-b from-[#f7f1fd] to-white rounded-xl p-6 shadow-sm border border-elegant-secondary/10 animate-fadeIn">
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
              className="w-full shrink-0 p-4"
            >
              <div className="bg-white rounded-xl p-6 shadow-md border border-elegant-secondary/10 flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start md:w-1/3">
                  <div className="relative mb-3">
                    <Avatar className="h-20 w-20 border-4 border-elegant-beige shadow-md">
                      <AvatarFallback 
                        className="text-white font-medium text-lg"
                        style={{ backgroundColor: testimonial.bgColor }}
                      >
                        <div className="relative">
                          <div className="absolute -inset-1 rounded-full bg-white/20 blur-sm"></div>
                          <span className="relative">{testimonial.initials}</span>
                        </div>
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <h4 className="font-medium text-lg text-elegant-brown mt-2">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{testimonial.location}</p>
                </div>
                
                <div className="md:w-2/3">
                  <div className="mb-4 relative">
                    <div className="absolute -top-4 -left-2 text-elegant-brown/20 transform scale-150">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144-.357.067-.926.19-1.429.39-.25.105-.474.217-.692.336-.238.125-.464.264-.683.428-.225.162-.407.356-.618.54-.195.218-.39.405-.539.66-.144.264-.342.493-.458.74-.118.257-.177.54-.259.812-.102.263-.199.528-.239.792-.035.28-.07.522-.07.81 0 .292.017.565.07.847.059.263.122.524.21.779.073.292.186.549.284.812.111.275.233.525.38.787.128.252.297.49.44.725.153.252.346.493.546.715.199.217.398.42.609.59.18.173.394.351.599.495.195.16.405.29.62.414.208.137.434.238.65.363.21.118.421.235.621.364.203.068.405.186.605.27.51.235.808.354.808.354l-.47-1.098c0 0-.354.152-.736.269-.345.117-.783.229-1.208.346-.214.063-.42.14-.627.223-.23.053-.436.119-.644.189-.2.07-.375.164-.57.233-.165.076-.343.156-.493.232-.107.046-.214.097-.314.142"/>
                        <path d="M14.986 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197l-.493-1.083c0 0-.218.052-.597.144-.357.067-.926.19-1.429.39-.25.105-.474.217-.692.336-.238.125-.464.264-.683.428-.225.162-.407.356-.618.54-.195.218-.39.405-.539.66-.144.264-.342.493-.458.74-.118.257-.177.54-.259.812-.102.263-.199.528-.239.792-.035.28-.07.522-.07.81 0 .292.017.565.07.847.059.263.122.524.21.779.073.292.186.549.284.812.111.275.233.525.38.787.128.252.297.49.44.725.153.252.346.493.546.715.199.217.398.42.609.59.18.173.394.351.599.495.195.16.405.29.62.414.208.137.434.238.65.363.21.118.421.235.621.364.203.068.405.186.605.27.51.235.808.354.808.354l-.47-1.098c0 0-.354.152-.736.269-.345.117-.783.229-1.208.346-.214.063-.42.14-.627.223-.23.053-.436.119-.644.189-.2.07-.375.164-.57.233-.165.076-.343.156-.493.232-.107.046-.214.097-.314.142"/>
                      </svg>
                    </div>
                    <p className="text-gray-700 pl-6 leading-relaxed italic">"{testimonial.text}"</p>
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
  );
};
