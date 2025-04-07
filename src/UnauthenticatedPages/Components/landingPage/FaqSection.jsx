import { useState } from "react";
import { images } from "../assets/assets";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default

  const dropdownItem = [
    {
      question: "What messaging channels does Triimo support?",
      ans: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can I try Triimo for free?",
      ans: "Personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "How secure is the platform?",
      ans: "Personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
  ];

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[96px] px-[105px] gap-[64px]">
      <div className="flex flex-col gap-5 items-center text-center">
        <h2 className="text-[#101828] text-[32px] font-semibold">
          Frequently Asked Questions
        </h2>
        <p className="text-[#767676] text-[18px] font-normal">
          Everything you need to know about the product and billing.
        </p>
      </div>

      <div className="px-8 flex flex-col gap-8 lg:w-[60%] md:w-[80%] w-[100%]">
        {dropdownItem.map((item, index) => (
          <div
            key={index}
            className="border border-[#EAECF0] shadow py-6 px-3 flex flex-col gap-2"
          >
            {/* Clickable Question */}
            <div
              className="flex items-center justify-between gap-5 cursor-pointer w-full"
              onClick={() => toggleDropdown(index)}
            >
              <p className="text-[#3F3E3E] text-[18px] font-medium">
                {item.question}
              </p>
              <img
                src={openIndex === index ? images.openIcon : images.plusIcon}
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Animated Answer Section */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index
                  ? "max-h-[200px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="max-w-[95%] text-[#767676] text-[15px] font-normal mt-2">
                {item.ans}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
