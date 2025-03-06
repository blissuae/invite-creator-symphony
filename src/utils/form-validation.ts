
import { InviteFormData } from "@/types/invite-form-types";
import { toast } from "@/hooks/use-toast";

export const validateBasicDetails = (formData: InviteFormData): boolean => {
  if (!formData.fullName.trim() || !formData.instagramId.trim() || !formData.email.trim() || !formData.occasion ||
      (formData.occasion === 'Other' && !formData.customOccasion.trim())) {
    toast({
      title: "Required Fields Missing",
      description: "Please fill in all required fields to continue.",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateDeliveryFormats = (formData: InviteFormData): boolean => {
  if (!formData.deliveryFormats.videoInvite && 
      !formData.deliveryFormats.stillInvite && 
      !formData.deliveryFormats.logo) {
    toast({
      title: "Selection Required",
      description: "Please select at least one delivery format to continue.",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateVideoIdea = (formData: InviteFormData): boolean => {
  if (formData.hasVideoIdea && !formData.videoIdea?.trim()) {
    toast({
      title: "Content Required",
      description: "Please share your idea or select 'No'.",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateColorPalette = (formData: InviteFormData): boolean => {
  if (!formData.colorPalette) {
    toast({
      title: "Selection Required",
      description: "Please select a color palette to continue.",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateAnimationStyles = (formData: InviteFormData): boolean => {
  if (formData.animationStyles.length === 0) {
    toast({
      title: "Selection Required",
      description: "Choose up to 3 animation styles to continue",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateDeadline = (formData: InviteFormData): boolean => {
  if (!formData.deadline) {
    toast({
      title: "Selection Required",
      description: "Please select a deadline to continue.",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const isContentReadyNotSelected = (content: string): boolean => {
  return !content.includes("Content will be shared later.") && content.trim() === "";
};
