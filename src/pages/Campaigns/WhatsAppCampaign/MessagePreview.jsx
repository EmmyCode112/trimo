import { Icons } from "@/assets/assets";
import "./WhatsAppCampaign.css";
import { useSelector } from "react-redux";

const MessagePreview = ({ message, customer }) => {
  const imageUrl = useSelector((state) => state.image.imageUrl);
  const uploadedImage = useSelector((state) => state.image.uploadedImage);
  const templateImage = useSelector((state) => state.image.templateImage);

  // Determine which image to display
  const displayImage =
    templateImage || imageUrl || uploadedImage || Icons.emptyPreviewTemplate;

  return (
    <div>
      <h3 className="text-[16px] text-[#484848] font-normal">Preview panel</h3>
      <div className="bg-[#FAFAFA] rounded-[30px] p-[45px] mt-3">
        <div className="preview-container w-full h-auto pl-5 md:pt-[150px] md:min-h-[612px] overflow-y-scroll hide-scrollBar">
          <div className="min-h-[90%] h-auto md:w-[246px] bg-white rounded-[10px] p-2 pb-6 flex flex-col gap-y-3">
            <div className="w-full h-[120px]">
              <img
                src={displayImage}
                alt="template"
                className="w-full h-[120px] object-cover rounded-[10px]"
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-normal text-[20px] text-[#767676]">
                {message.header}
              </p>
              <p className="font-normal text-[15px] text-[#767676] whitespace-pre-wrap">
                {message.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePreview;
