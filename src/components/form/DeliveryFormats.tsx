import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
interface DeliveryFormatsProps {
  formData: {
    deliveryFormats: {
      videoInvite: boolean;
      stillInvite: boolean;
      logo: boolean;
    };
  };
  onChange: (field: string, value: any) => void;
}
export const DeliveryFormats = ({
  formData,
  onChange
}: DeliveryFormatsProps) => {
  const updateDeliveryFormat = (format: keyof typeof formData.deliveryFormats, checked: boolean) => {
    onChange("deliveryFormats", {
      ...formData.deliveryFormats,
      [format]: checked
    });
  };
  return <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-serif mb-2 text-elegant-brown">Delivery Formats</h2>
        <p className="text-gray-600 font-serif text-base font-light">Please select all the deliverables you need
(A minimum of 1 needs to be selected)</p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <div className="flex items-center space-x-4 p-4 bg-elegant-beige/20 rounded-lg border border-elegant-secondary/20">
          <Checkbox id="videoInvite" checked={formData.deliveryFormats.videoInvite} onCheckedChange={checked => updateDeliveryFormat("videoInvite", checked as boolean)} />
          <Label htmlFor="videoInvite" className="flex-1 cursor-pointer">
            <div className="font-serif text-elegant-brown">Video</div>
            <div className="text-sm text-gray-600">.mp4 format in story size (1080x1920px)</div>
          </Label>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-elegant-beige/20 rounded-lg border border-elegant-secondary/20">
          <Checkbox id="stillInvite" checked={formData.deliveryFormats.stillInvite} onCheckedChange={checked => updateDeliveryFormat("stillInvite", checked as boolean)} />
          <Label htmlFor="stillInvite" className="flex-1 cursor-pointer">
            <div className="font-serif text-elegant-brown">Still Design</div>
            <div className="text-sm text-gray-600">.pdf format in story size (1080x1920px)</div>
          </Label>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-elegant-beige/20 rounded-lg border border-elegant-secondary/20">
          <Checkbox id="logo" checked={formData.deliveryFormats.logo} onCheckedChange={checked => updateDeliveryFormat("logo", checked as boolean)} />
          <Label htmlFor="logo" className="flex-1 cursor-pointer">
            <div className="font-serif text-elegant-brown">Logo Design</div>
            <div className="text-sm text-gray-600">.pdf .ai .eps formats</div>
          </Label>
        </div>
      </div>
    </div>;
};