
import { InviteForm } from "@/components/InviteForm";

const Index = () => {
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
          <p className="text-gray-600 font-serif">Tell us your vision and we'll bring it to life</p>
        </div>
        
        {/* Social Validation Section */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-elegant-secondary/10 animate-fadeIn">
          <div className="flex items-center justify-center">
            <div className="flex -space-x-2 mr-3 overflow-hidden">
              {/* Client avatars */}
              <div className="inline-block h-7 w-7 rounded-full bg-[#E5DEFF] border-2 border-white flex items-center justify-center text-[10px] font-medium text-purple-800">SA</div>
              <div className="inline-block h-7 w-7 rounded-full bg-[#FDE1D3] border-2 border-white flex items-center justify-center text-[10px] font-medium text-orange-800">MR</div>
              <div className="inline-block h-7 w-7 rounded-full bg-[#D3E4FD] border-2 border-white flex items-center justify-center text-[10px] font-medium text-blue-800">HJ</div>
              <div className="inline-block h-7 w-7 rounded-full bg-[#FFDEE2] border-2 border-white flex items-center justify-center text-[10px] font-medium text-pink-800">KL</div>
              <div className="inline-block h-7 w-7 rounded-full bg-[#F2FCE2] border-2 border-white flex items-center justify-center text-[10px] font-medium text-green-800">+</div>
            </div>
            <p className="text-sm text-gray-700 font-medium">
              <span className="font-bold text-elegant-brown">250+</span> happy clients from 
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
        
        <InviteForm />
      </div>
    </div>
  );
};

export default Index;
