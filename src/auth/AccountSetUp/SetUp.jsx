import { useState } from "react";
import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";
import { useNavigate } from "react-router-dom";
import "./SetUp.css";
import CaseSixty from "./SixtyPercentSetUp";
import CaseEighty from "./EightyPercentSetUp";
import CaseHundred from "./HundredPercentSetUp";
import PopUp from "./PopUp";

const SetUp = () => {
  const [selectedEmployees, setSelectedEmployees] = useState("");
  const [formData, setFormData] = useState({ companyName: "", workPhone: "" });
  const [currentStep, setCurrentStep] = useState(1);
  const [successfulSetup, setSuccessfulSetup] = useState(false)
  
  const handleEmployeeSelect = (value) => setSelectedEmployees(value);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid =
    formData.companyName.trim() &&
    formData.workPhone.trim() &&
    selectedEmployees;

  const handleProceed = () => {
    if (isFormValid) {
      setCurrentStep((prevStep) => prevStep + 1); // Move to the next step
    }
  };

  const navigate = useNavigate();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h4 className="font-[600] text-[28px] tracking-[-2px]">
              Setup Triimo to work for your business
            </h4>
            <form>
              {/* Company Name */}
              <label className="flex flex-col gap-[6px]">
                <p className="text-[14px] font-[500] text-[#1A1A1A]">
                  Company Name
                </p>
                <div className="flex gap-[8px] px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px] items-center">
                  <img src={Icons.houseIcon} alt="" className="signin-icons" />
                  <input
                    type="text"
                    placeholder="triimo"
                    className="w-full outline-none border-none"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>
              </label>

              {/* Work Phone */}
              <label className="flex flex-col gap-[6px]">
                <p className="text-[14px] font-[500] text-[#1A1A1A]">
                  Work Phone
                </p>
                <div className="flex gap-[8px] px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px] items-center">
                  <img src={Icons.naira} alt="" className="signin-icons" />
                  <input
                    type="text"
                    placeholder="904 666 0706"
                    className="w-full outline-none border-none"
                    name="workPhone"
                    value={formData.workPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </label>

              {/* Number of Employees */}
              <fieldset className="mt-6 mb-[19px]">
                <legend className="text-sm font-medium text-gray-700">
                  Number of Employees
                </legend>

                <div className="flex flex-wrap gap-x-[12px] gap-y-[10px] mt-2">
                  {[
                    "1-10 Employees",
                    "11-50 Employees",
                    "51-200 Employees",
                    "201-1,000 Employees",
                    "1,000+ Employees",
                  ].map((option) => (
                    <div
                      key={option}
                      className={`flex py-1 px-[10px] rounded-[6px] gap-1 border cursor-pointer items-center ${
                        selectedEmployees === option ? "" : "border-[#D0D5DD]"
                      }`}
                      onClick={() => handleEmployeeSelect(option)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedEmployees === option}
                        readOnly
                        className="w-[18px] h-[18px] cursor-pointer"
                      />
                      <label className="text-sm font-medium text-[#484848] cursor-pointer">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              {/* Proceed Button */}
              <Button
                label="Proceed"
                disabled={!isFormValid}
                className={`bg-[#383268] hover:bg-[#41397c] text-white rounded-[8px] w-full py-[12px] px-[20px] ${
                  isFormValid ? "opacity-100" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={handleProceed}
              />
            </form>
          </div>
        );
      case 2:
        return <CaseSixty handleProceed={handleProceed} />;
      case 3:
        return (
          <div>
            <CaseEighty handleProceed={handleProceed}/>
          </div>
        );

        case 4: return (
          <div>
            <CaseHundred setSuccessfulSetup={setSuccessfulSetup}/>
          </div>
        )

    }
  };

  return (
    <>
    {
      successfulSetup ? <><PopUp/></> : 
      <div className="flex h-[100vh] overflow-hidden w-[100vw] pr-[65px] max-lg:px-5 max-sm:py-5">
      <div className="h-[100vh] w-[504px] signin-right-con flex flex-col justify-end relative items-end max-lg:hidden">
        <img
          src={Icons.trimoDashboard}
          alt="Trimo Dashboard"
          className="object-center object-contain h-[560px] absolute bottom-[5%] right-0"
        />
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[45%] mx-auto auth-right-container">
          <div className="flex items-center">
            <div className="relative w-[424px] h-2 bg-[#EAECF0] rounded-full progress-bar">
              <div
                className="absolute top-0 left-0 h-2 rounded-full bg-[#383268]"
                style={{
                  width:
                    currentStep === 1
                      ? "30%"
                      : currentStep === 2
                      ? "60%"
                      : currentStep === 3
                      ? "90%"
                      : "100%",
                }}
              />
            </div>
            <p className="text-[#344054] text-[14px] font-medium">
              {currentStep === 1 ? "30%" : currentStep === 2 ? "60%" : currentStep === 3 ? "90%" : "100%"}
            </p>
          </div>
          {renderStep()}
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default SetUp;
