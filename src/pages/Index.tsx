
import { InviteForm } from "@/components/InviteForm";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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
    designColor: "#FDE1D3",
    rating: 5
  },
  {
    name: "Mohammed R.",
    location: "Riyadh, Saudi Arabia",
    text: "Bliss created the perfect invitation for our corporate event. Professional and elegant.",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#E5DEFF",
    rating: 5
  },
  {
    name: "Fatima K.",
    location: "Doha, Qatar",
    text: "I was amazed by how they captured the essence of our family celebration. Truly memorable!",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#FEF7CD",
    rating: 5
  },
  {
    name: "Hassan J.",
    location: "Kuwait City, Kuwait",
    text: "The attention to detail was exceptional. Our guests were impressed with the quality.",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#D3E4FD",
    rating: 4
  },
  {
    name: "Layla M.",
    location: "Muscat, Oman",
    text: "Beautiful designs and excellent customer service. Highly recommended!",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#FFDEE2",
    rating: 5
  },
  {
    name: "Ahmed Q.",
    location: "Manama, Bahrain",
    text: "The elegance and creativity in our wedding invitation exceeded our expectations.",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#F2FCE2",
    rating: 5
  },
  {
    name: "Noor K.",
    location: "Baghdad, Iraq",
    text: "We received countless compliments on our digital invitation. Worth every penny!",
    avatar: "/placeholder.svg",
    design: "/placeholder.svg",
    designColor: "#F1F0FB",
    rating: 5
  }
];

// Array of encouraging and fun progress messages by step
// Modified to reflect the PREVIOUS completed step
const progressMessages = {
  // Generic messages for start
  start: [
    "Let's create something magical together! 🪄",
    "Your dream invitation is about to come alive! ✨",
    "Ready to design something extraordinary? Let's go! 🚀"
  ],
  
  // For after completing Basic Details step
  basicDetails: [
    "Great! Personal details noted. This will be uniquely yours! 🌟",
    "Perfect start! We'll craft something special just for you 💝",
    "Wonderful details! Now let's make your event shine! 🎉"
  ],
  
  // For after completing Delivery Formats step
  deliveryFormats: [
    "Excellent format choices! Your guests will be so impressed 😍",
    "Smart selections! Your invitation will look amazing across all platforms 📱💻",
    "Perfect format picks! Now let's add some personality! 🎯"
  ],
  
  // For after completing Character Options step
  characterOptions: [
    "Your character selections will make this invitation pop! 🧙‍♂️",
    "Perfect character choices! Your invite will be just as you imagined 👥",
    "Your characters will bring your invitation to life! 🌈"
  ],
  
  // For after completing Content Editor step
  content: [
    "We love your creativity! That will make for an amazing invite! 💡",
    "Your words will captivate your guests! Brilliant content! 📝",
    "Your message is going to shine through beautifully! ✨"
  ],
  
  // For after completing Color Palette step
  colorPalette: [
    "You've got great taste! That palette will look stunning! 🎨",
    "Beautiful color choice! Your guests will be mesmerized! 🌈",
    "Perfect palette! These colors will make your invitation pop! 💫"
  ],
  
  // For after completing Animation Style step
  animationStyles: [
    "Those animations will bring magic to your invite! ✨",
    "Great animation pick! Your invitation will come alive with these effects! 🌟",
    "Perfect animation choices! Your invitation will be unforgettable! 🎬"
  ],
  
  // For after completing Design Style step
  designStyle: [
    "Excellent style choice! So elegant and perfect for your event! 👑",
    "That design will make your invitation truly stand out! 🏆",
    "Beautiful style selection! It complements your theme perfectly! 🎭"
  ],
  
  // For after completing Deadline step
  deadline: [
    "Perfect timing! We're excited to create your invitation! ⏰",
    "Great! We'll have your beautiful invitation ready right on time! 📅",
    "Deadline noted! Your dream invitation is just around the corner! 🗓️"
  ],
  
  // For after completing Review step
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

// Helper function to get the step key for progress messages
// Modified to return the previous step key instead of current
const getPreviousStepKey = (step: number): keyof typeof progressMessages => {
  // Return the key for the previous step
  switch(step) {
    case 0: return "start"; // First step - show generic start messages
    case 1: return "basicDetails"; // Basic Details completed
    case 2: return "deliveryFormats"; // Delivery Formats completed
    case 3: return "characterOptions"; // Character Options completed
    case 4: return "content"; // Content Editor completed
    case 5: return "colorPalette"; // Color Palette completed
    case 6: return "animationStyles"; // Animation Styles completed
    case 7: return "designStyle"; // Design Style completed
    case 8: return "deadline"; // Deadline completed
    case 9: return "review"; // Review completed
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
  const [currentMessage, setCurrentMessage] = useState("");
  const testimonialRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef(-1);

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
      setFormProgress(e.detail.progress);
      // Extract current step from the event
      if (e.detail.currentStep !== undefined) {
        setCurrentStep(e.detail.currentStep);
      }
    };

    window.addEventListener('formProgressUpdate', handleProgressUpdate as EventListener);
    
    return () => {
      window.removeEventListener('formProgressUpdate', handleProgressUpdate as EventListener);
    };
  }, []);

  // Update message when step changes
  useEffect(() => {
    // Only update if we've moved to a new step
    if (currentStep !== prevStepRef.current) {
      // Use the previous step key to get appropriate messages
      const stepKey = getPreviousStepKey(currentStep);
      const messagesForStep = progressMessages[stepKey];
      const randomIndex = Math.floor(Math.random() * messagesForStep.length);
      setCurrentMessage(messagesForStep[randomIndex]);
      prevStepRef.current = currentStep;
    }
  }, [currentStep]);

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

  // Render star ratings
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
            
            {/* Improved Testimonials Section with new layout */}
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
                        {/* Left side: Client photo and info */}
                        <div className="flex flex-col items-center md:items-start md:w-1/3">
                          <div className="relative mb-3">
                            <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-elegant-beige shadow-md">
                              <img src={testimonial.avatar} alt={testimonial.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                              {renderStars(testimonial.rating)}
                            </div>
                          </div>
                          <h4 className="font-medium text-lg text-elegant-brown mt-2">{testimonial.name}</h4>
                          <p className="text-xs text-gray-500 mb-2">{testimonial.location}</p>
                        </div>
                        
                        {/* Right side: Testimonial text and design preview */}
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
                          
                          {/* Design preview in device mockup */}
                          <div className="hidden md:flex justify-end">
                            <div className="relative w-24 h-48 overflow-hidden">
                              {/* Phone mockup */}
                              <div className="absolute inset-0 bg-gray-900 rounded-[24px] shadow-lg">
                                <div className="absolute inset-[2px] rounded-[22px] bg-black overflow-hidden">
                                  {/* Screen content with design color */}
                                  <div 
                                    className="absolute inset-0 rounded-[20px] overflow-hidden"
                                    style={{ backgroundColor: testimonial.designColor }}
                                  >
                                    <img 
                                      src={testimonial.design} 
                                      alt="Design preview" 
                                      className="w-full h-full object-cover opacity-60"
                                    />
                                  </div>
                                </div>
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
