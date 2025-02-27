
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
        </div>
        
        {/* Social Validation Section */}
        <div className="mb-8 bg-[#8B5CF6]/10 rounded-xl p-4 shadow-sm border border-[#8B5CF6]/20 animate-fadeIn">
          <div className="flex items-center justify-center">
            <div className="flex -space-x-2 mr-3 overflow-hidden">
              {/* Example customer avatars */}
              <div className="inline-block h-7 w-7 rounded-full bg-white border-2 border-white overflow-hidden">
                <img src="/placeholder.svg" alt="Customer" className="w-full h-full object-cover" />
              </div>
              <div className="inline-block h-7 w-7 rounded-full bg-white border-2 border-white overflow-hidden">
                <img src="/placeholder.svg" alt="Customer" className="w-full h-full object-cover" />
              </div>
              <div className="inline-block h-7 w-7 rounded-full bg-white border-2 border-white overflow-hidden">
                <img src="/placeholder.svg" alt="Customer" className="w-full h-full object-cover" />
              </div>
              <div className="inline-block h-7 w-7 rounded-full bg-white border-2 border-white overflow-hidden">
                <img src="/placeholder.svg" alt="Customer" className="w-full h-full object-cover" />
              </div>
              <div className="inline-block h-7 w-7 rounded-full bg-white border-2 border-white flex items-center justify-center text-[10px] font-medium text-[#8B5CF6]">+</div>
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
