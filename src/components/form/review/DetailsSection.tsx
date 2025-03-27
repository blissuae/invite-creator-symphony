
import { InviteFormData } from "@/types/invite-form-types";
import { ReviewSection } from "./ReviewSection";
import { formatAnimationStyles, formatColorPalette, formatDeadline } from "./format-helpers";

interface DetailsSectionProps {
  formData: InviteFormData;
}

export const DetailsSection = ({ formData }: DetailsSectionProps) => {
  return (
    <div className="grid gap-6 p-6 bg-[#8b7256]/5 rounded-lg border border-[#8b7256]/20">
      <ReviewSection title="Full Name" content={formData.fullName} />
      
      <ReviewSection title="Email" content={formData.email} />
      
      <ReviewSection title="Instagram ID" content={formData.instagramId || "Not provided"} />
      
      <ReviewSection 
        title="Occasion" 
        content={formData.occasion === "Other" ? formData.customOccasion : formData.occasion}
      />

      <ReviewSection
        title="Delivery Formats"
        content={
          <div className="space-y-1">
            <p>Video Invite (.mp4): {formData.deliveryFormats.videoInvite ? "Yes" : "No"}</p>
            <p>Still Invite (PDF): {formData.deliveryFormats.stillInvite ? "Yes" : "No"}</p>
            <p>Logo (PDF): {formData.deliveryFormats.logo ? "Yes" : "No"}</p>
          </div>
        }
      />
      
      <ReviewSection 
        title="Character Details" 
        content={
          <div className="space-y-2">
            <p>Include Characters: {formData.hasCharacters ? "Yes" : "No"}</p>
            {formData.hasCharacters && formData.characters && formData.characters.length > 0 && (
              <div className="space-y-2 mt-2">
                <p>Number of Characters: {formData.characters.length}</p>
                {formData.characters.map((char, index) => (
                  <div key={char.id} className="bg-white p-2 rounded border border-gray-100">
                    <p>Character {index + 1}: {char.showFace ? "With face" : "No face"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        }
      />
      
      <ReviewSection
        title="Video Idea"
        content={
          <div className="space-y-2">
            <p>Has Video Idea: {formData.hasVideoIdea ? "Yes" : "No"}</p>
            {formData.hasVideoIdea && formData.videoIdea && (
              <div className="whitespace-pre-wrap bg-white p-4 rounded-md border border-elegant-secondary/20">
                {formData.videoIdea}
              </div>
            )}
          </div>
        }
      />
      
      <ReviewSection 
        title="Animation Styles" 
        content={
          <div className="flex items-center gap-2">
            <span>{formatAnimationStyles(formData.animationStyles) || "Not selected"}</span>
          </div>
        }
      />
      
      <ReviewSection 
        title="Selected Palette" 
        content={
          <div className="flex flex-col space-y-2">
            {(() => {
              const palette = formatColorPalette(formData.colorPalette);
              return (
                <>
                  <div className="text-elegant-brown font-medium">
                    {palette.name}
                  </div>
                  <div className="text-gray-600">
                    Colors: {palette.colors.join(", ")}
                  </div>
                </>
              );
            })()}
          </div>
        }
      />
      
      <ReviewSection 
        title="Project Deadline" 
        content={formatDeadline(formData.deadline)}
      />
      
      <ReviewSection 
        title="Invitation Content" 
        content={
          <div className="whitespace-pre-wrap bg-white p-4 rounded-md border border-elegant-secondary/20">
            {formData.content || "No content added"}
          </div>
        }
      />
      
      {formData.specialRequirements && 
        <ReviewSection
          title="Additional Requests"
          content={
            <div className="whitespace-pre-wrap">
              {formData.specialRequirements}
            </div>
          }
        />
      }
    </div>
  );
};
