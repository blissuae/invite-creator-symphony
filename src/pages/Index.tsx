import { InviteForm } from "@/components/InviteForm";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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

// Array of encouraging and fun progress messages by step
const progressMessages = {
  // Generic messages for start
  start: [
    "Let's create something magical together! 🪄",
    "Your dream invitation is about to come alive! ✨",
    "Ready to design something extraordinary? Let's go! 🚀"
  ],
  
  // For Basic Details step
  basicDetails: [
    "Great! Personal details noted. This will be uniquely yours! 🌟",
    "Perfect start! We'll craft something special just for you 💝",
    "Wonderful details! Now let's make your event shine! 🎉"
  ],
  
  // For Delivery Formats step
  deliveryFormats: [
    "Excellent choices! Your guests will be so impressed 😍",
    "Smart selections! Your invitation will look amazing across all platforms 📱💻",
    "Perfect format picks! Now let's add some personality! 🎯"
  ],
  
  // For Character Options step
  characterOptions: [
    "Fantastic choices! Your invite will be just as you imagined 🧙‍♂️",
    "Perfect characters make for perfect invites! Looking great! 👥",
    "Your characters will bring your invitation to life! 🌈"
  ],
  
  // For Content Editor step
  content: [
    "We love your creativity! That will make for an amazing invite! 💡",
    "Your words will captivate your guests! Brilliant content! 📝",
    "Your message is going to shine through beautifully! ✨"
  ],
  
  // For Color Palette step
  colorPalette: [
    "You've got great taste! That palette will look stunning! 🎨",
    "Beautiful color choice! Your guests will be mesmerized! 🌈",
    "Perfect palette! These colors will make your invitation pop! 💫"
  ],
  
  // For Animation Style step
  animationStyles: [
    "Those animations will bring magic to your invite! ✨",
    "Great pick! Your invitation will come alive with these effects! 🌟",
    "Perfect animation choices! Your invitation will be unforgettable! 🎬"
  ],
  
  // For Design Style step
  designStyle: [
    "Excellent style choice! So elegant and perfect for your event! 👑",
    "That design will make your invitation truly stand out! 🏆",
    "Beautiful style selection! It complements your theme perfectly! 🎭"
  ],
  
  // For Deadline step
  deadline: [
    "Perfect timing! We're excited to create your invitation! ⏰",
    "Great! We'll have your beautiful invitation ready right on time! 📅",
    "Deadline noted! Your dream invitation is just around the corner! 🗓️"
  ],
  
  // For Review step
  review: [
    "Almost there! Your dream invitation is taking shape! 🌠",
    "Just one final look! Your creation is nearly complete! 🏁",
    "It's all coming together beautifully! Ready for the final step? 💖"
  ],
  
  // For completion
  complete: [
    "Perfection achieved! Get ready to wow your guests! 🎊",
    "Congrats! Your stunning invitation is on its way to becoming reality! 🥂",
    "Amazing work! Your special day will be announced in style! 🎯"
  ]
};

const getFormStepKey = (step: number): keyof typeof progressMessages => {
  switch(step) {
    case 0: return "basicDetails";
    case 1: return "deliveryFormats";
    case 2: return "characterOptions";
    case 3: return "content"; 
    case 4: return "colorPalette";
    case 5: return "animationStyles";
    case 6: return "designStyle";
    case 7: return "deadline";
    case 8: return "review";
    case 9: return "complete";
    default: return "start";
  }
};

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formProgress, setFormProgress] = useState(10);
  const [currentStep, setCurrentStep] = useState(0);
  const [prevCompletedStep, setPrevCompletedStep] = useState(-1);
  const [currentMessage, setCurrentMessage] = useState("");
  const testimonialRef = useRef<HTMLDivElement>(null);
  const highestProgressRef = useRef(0);

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging]);

  // Listen for form progress updates
  useEffect(() => {
    const handleProgressUpdate = (e: CustomEvent) => {
      // Always keep the highest progress value we've reached
      const newProgress = Math.max(e.detail.progress, highestProgressRef.current);
      setFormProgress(newProgress);
      highestProgressRef.current = newProgress;
      
      // Extract current step and previous completed step from the event
      if (e.detail.currentStep !== undefined) {
        setCurrentStep(e.detail.currentStep);
      }
      
      if (e.detail.prevCompletedStep !== undefined) {
        setPrevCompletedStep(e.detail.prevCompletedStep);
      }
    };

    window.addEventListener('formProgressUpdate', handleProgressUpdate as EventListener);
    
    return () => {
      window.removeEventListener('formProgressUpdate', handleProgressUpdate as EventListener);
    };
  }, []);

  // Update message when previous completed step changes
  useEffect(() => {
    if (prevCompletedStep >= 0) {
      // Get messages for the step we just completed
      const stepKey = getFormStepKey(prevCompletedStep);
      const messagesForStep = progressMessages[stepKey];
      const randomIndex = Math.floor(Math.random() * messagesForStep.length);
      setCurrentMessage(messagesForStep[randomIndex]);
    } else {
      // At the beginning, show a generic start message
      const startMessages = progressMessages.start;
      const randomIndex = Math.floor(Math.random() * startMessages.length);
      setCurrentMessage(startMessages[randomIndex]);
    }
  }, [prevCompletedStep]);

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
        
        {showForm && (
          <div className="mb-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Your progress</span>
              <span className="text-sm font-medium text-elegant-brown">{formProgress}%</span>
            </div>
            <div className="relative">
              {/* Brown progress bar */}
              <Progress value={formProgress} className="h-2 bg-gray-200" 
                style={{ 
                  "--primary": "#8b7256", 
                  "--primary-foreground": "255 255 255"
                } as React.CSSProperties} 
              />
              {/* Circle indicator */}
              <div 
                className="absolute top-0 h-4 w-4 rounded-full bg-elegant-brown border-2 border-white shadow-md transform -translate-y-1/4"
                style={{ 
                  left: `calc(${formProgress}% - 8px)`,
                  transition: "left 0.5s ease-out"
                }}
              />
            </div>
            <p className="text-sm text-elegant-brown mt-4 text-center font-medium animate-fadeIn">
              {currentMessage || progressMessages.start[0]}
            </p>
          </div>
        )}
        
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
            
            {/* Enhanced Testimonials Section with subtle background color */}
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
                      className="w-full shrink-0 px-8 py-4" // Increased padding
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
                        
                        {/* Right side: iPhone 16 design sample (half shown) */}
                        <div className="hidden md:block w-1/3 pl-6">
                          <div className="relative w-32 h-72 mx-auto overflow-hidden">
                            {/* iPhone 16 frame - showing half of it */}
                            <div className="absolute inset-0 right-[-50%] bg-gray-900 rounded-[48px] shadow-xl">
                              {/* Inner bezel */}
                              <div className="absolute inset-1 rounded-[44px] bg-black overflow-hidden">
                                {/* Screen content */}
                                <div 
                                  className="absolute inset-0 rounded-[42px] overflow-hidden"
                                  style={{ backgroundColor: testimonial.designColor }}
                                >
                                  <img 
                                    src={testimonial.design} 
                                    alt="Design preview" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                {/* Dynamic Island */}
                                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[80px] h-[10px] bg-black rounded-full"></div>
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
            
            {/* Get Started Button with animation */}
            <div className="flex justify-center mb-12 animate-fadeIn">
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-elegant-brown hover:bg-elegant-brown/90 text-white font-serif px-8 py-6 text-lg rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#b8860b]/20 to-transparent animate-pulse"></span>
                <span className="absolute right-2 w-6 h-6 rounded-full bg-white/20 animate-ping"></span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
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
