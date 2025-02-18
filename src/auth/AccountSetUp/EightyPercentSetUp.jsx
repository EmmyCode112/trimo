import { useState } from "react";
import Button from "../../Components/buttons/transparentButton";

const CaseEighty = ({ handleProceed }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [otherDescription, setOtherDescription] = useState("");

  // Handle goal selection (Allow Multiple)
  const handleGoalSelect = (goal) => {
    setSelectedGoals((prevGoals) => {
      // Use a proper state update function to avoid unexpected behavior
      const newGoals = new Set(prevGoals);

      if (newGoals.has(goal)) {
        newGoals.delete(goal); // Remove if already selected
      } else {
        newGoals.add(goal); // Add if not selected
      }

      return Array.from(newGoals);
    });

    if (goal !== "Others") {
      setOtherDescription(""); // Clear "Others" description if deselecting it
    }
  };

  // Handle description input for "Others"
  const handleOtherDescriptionChange = (e) => {
    setOtherDescription(e.target.value);
  };

  // Check if the "Proceed" button should be enabled
  const isProceedEnabled =
    selectedGoals.length > 0 &&
    (!selectedGoals.includes("Others") || otherDescription.trim() !== "");

  // List of goal options
  const goals = [
    "Onboard / Retain Customers",
    "Convert Marketing Leads",
    "Send Transactional Messages",
    "Send Newsletters",
    "Setup Internal Automation",
    "Others",
  ];

  return (
    <div>
      {/* Header Section */}
      <div>
        <h4 className="font-[600] text-[28px] tracking-[-2px]">
          Your Goals and Experience
        </h4>
        <p className="text-[#767676] font-medium text-[16px]">
          Let’s get you up and running quickly
        </p>
      </div>

      {/* Goal Selection Section */}
      <div>
        <fieldset className="mt-6 mb-[19px]">
          <legend className="text-sm font-medium text-gray-700">
            What best describes you?
          </legend>
          <div className="flex flex-wrap gap-x-[12px] gap-y-[10px] mt-2">
            {goals.map((goal) => {
              const isSelected = selectedGoals.includes(goal);
              return (
                <label
                  key={goal}
                  className={`flex py-1 px-[10px] rounded-[6px] gap-1 border cursor-pointer items-center ${
                    isSelected ? "border-[#383268]" : "border-[#D0D5DD]"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="goal"
                    value={goal}
                    checked={isSelected}
                    onChange={() => handleGoalSelect(goal)}
                    className="w-[18px] h-[18px] cursor-pointer"
                  />
                  <span className="text-sm font-medium text-[#484848]">
                    {goal}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Other Description Input */}
      {selectedGoals.includes("Others") && (
        <div className="mt-[14px] mb-[19px]">
          <input
            type="text"
            value={otherDescription}
            onChange={handleOtherDescriptionChange}
            className="px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px] w-full outline-none"
            placeholder="Enter what best describes you"
          />
        </div>
      )}

      {/* Proceed Button */}
      <Button
        label="Proceed"
        onClick={handleProceed}
        disabled={!isProceedEnabled}
        className="bg-[#383268] hover:bg-[#41397c] text-white rounded-[8px] w-full py-[12px] px-[20px]"
      />
    </div>
  );
};

export default CaseEighty;
