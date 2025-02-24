
import { InviteForm } from "@/components/InviteForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-form-100 to-white">
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-light mb-4">Create Your Digital Invite</h1>
          <p className="text-gray-600">Tell us your vision and we'll bring it to life</p>
        </div>
        <InviteForm />
      </div>
    </div>
  );
};

export default Index;
