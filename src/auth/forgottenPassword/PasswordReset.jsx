import { Icons } from "../../assets/assets";
import { useState } from "react";
import Button from "../../Components/buttons/transparentButton";
import { useNavigate } from "react-router-dom";
import ResetOtp from "./ResetOtp";


const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [showOtpPopUp, setShowOtpPopUp] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isFormFilled = email && validateEmail(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate before submitting
    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
    }

    if (validateEmail(email)) {
      setErrors({ email: "" }); // Clear errors on successful validation
    }
    setShowOtpPopUp(true)
  };

  const navigate = useNavigate();

  return (
    <div className="flex h-[100vh] overflow-hidden w-[100vw] pr-[65px] max-lg:px-5 max-sm:py-5">
      <div className="h-[100vh] w-[504px] signin-right-con flex flex-col justify-end relative items-end max-lg:hidden">
        <img
          src={Icons.trimoDashboard}
          alt="Trimo Dashboard"
          className="object-center object-contain h-[560px] absolute bottom-[5%] right-0"
        />
      </div>

      {/*  */}
      {!showOtpPopUp ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[40%] mx-auto right-container">
            <div className="flex flex-col gap-8px mb-[12px]">
              <h4 className="font-[600] text-[28px] tracking-[-2px]">
                Forgot Password
              </h4>
              <p className="text-[#767676] font-[500]">
                No worries! Just enter your registered email address, and we’ll
                help you reset your password.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-[6px] flex flex-col gap-[18px] mb-[20px]"
            >
              <label className="flex flex-col gap-[6px]">
                <p className="text-[14px] font-[500] text-[#1A1A1A]">Email</p>
                <div className="flex gap-[8px] px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px] items-center">
                  <img src={Icons.smsIcon} alt="" className="signin-icons" />
                  <input
                    type="email"
                    className="w-full outline-none border-none"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (!validateEmail(e.target.value)) {
                        setErrors((prev) => ({
                          ...prev,
                          email: "Invalid email format.",
                        }));
                      } else {
                        setErrors((prev) => ({ ...prev, email: "" }));
                      }
                    }}
                  />
                </div>
                {errors.email && (
                  <p className="text-[#CB2315] text-sm font-normal">
                    {errors.email}
                  </p>
                )}
              </label>

              <Button
                label="Continue"
                onClick={handleSubmit}
                disabled={!isFormFilled}
                className={`bg-[#383268] hover:bg-[#41397c] text-white rounded-[8px] w-full py-[12px] px-[20px] `}
              />
            </form>

            <p
              onClick={() => navigate("/sign-in")}
              className="cursor-pointer text-center"
            >
              Sign in Instead
            </p>
          </div>
        </div>
      ) : (
        <ResetOtp isClosedOtp={setShowOtpPopUp} />
      )}
    </div>
  );
};

export default PasswordReset;
