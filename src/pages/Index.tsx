
import { InviteForm } from "@/components/InviteForm";
import { useState, useEffect, useRef } from "react";
import { FAQButton } from "@/components/FAQ/FAQButton";
import { FAQAccordion } from "@/components/FAQ/FAQAccordion";
import { Testimonials } from "@/components/home/Testimonials";
import { CustomerCounter } from "@/components/home/CustomerCounter";
import { GetStartedButton } from "@/components/home/GetStartedButton";
import { FormProgressBar } from "@/components/home/FormProgressBar";
import { UserActivityPopup } from "@/components/home/UserActivityPopup";
import { progressMessages, getPreviousStepKey } from "@/utils/progress-messages";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [formProgress, setFormProgress] = useState(10);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showFAQ, setShowFAQ] = useState(false);
  const prevStepRef = useRef(-1);

  useEffect(() => {
    const handleProgressUpdate = (e: CustomEvent) => {
      setFormProgress(e.detail.progress);
      if (e.detail.currentStep !== undefined) {
        setCurrentStep(e.detail.currentStep);
      }
    };

    window.addEventListener('formProgressUpdate', handleProgressUpdate as EventListener);
    
    return () => {
      window.removeEventListener('formProgressUpdate', handleProgressUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    if (currentStep !== prevStepRef.current) {
      const stepKey = getPreviousStepKey(currentStep);
      const messagesForStep = progressMessages[stepKey];
      const randomIndex = Math.floor(Math.random() * messagesForStep.length);
      setCurrentMessage(messagesForStep[randomIndex]);
      prevStepRef.current = currentStep;
    }
  }, [currentStep]);

  // Prevent body scroll when FAQ is open
  useEffect(() => {
    if (showFAQ) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showFAQ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-elegant-beige to-white">
      <FAQButton onClick={() => setShowFAQ(true)} />
      <UserActivityPopup />
      
      {showFAQ && <FAQAccordion onClose={() => setShowFAQ(false)} />}
      
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
          <FormProgressBar 
            progress={formProgress}
            currentMessage={currentMessage || progressMessages.start[0]}
          />
        )}
        
        {!showForm ? (
          <>
            <CustomerCounter />
            <Testimonials />
            <GetStartedButton onClick={() => setShowForm(true)} />
          </>
        ) : (
          <InviteForm />
        )}
      </div>
    </div>
  );
};

export default Index;
