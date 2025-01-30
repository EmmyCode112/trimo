import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  // Validate password
  const validatePassword = (password) => password.length >= 8;

  // Check if the form is filled and passwords match
  const isFormFilled =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    validatePassword(password) &&
    password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({ password: "", confirmPassword: "" });

    // Perform validations
    if (!validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long.",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    // Successful validation
    console.log("Password successfully set:", password);
    navigate("/sign-in"); // Navigate to the sign-in page
  };

  return (
    <div className="w-[40%] mx-auto gap-[22px] flex flex-col auth-right-container">
      <div className="flex flex-col gap-8px mb-[12px]">
        <h4 className="font-[600] text-[28px] tracking-[-2px]">New Password</h4>
        <p className="text-[#767676] font-[500]">
          Create a new password to keep your account secure. Note: You are not
          allowed to use your previous (Old) password.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
        {/* Password Field */}
        <label className="flex flex-col gap-[6px]">
          <p className="text-[14px] font-[500] text-[#1A1A1A]">New Password</p>
          <div className="flex gap-[8px] px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px] items-center">
            <img src={Icons.key} alt="" className="signin-icons" />
            <input
              className="w-full outline-none border-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </label>

        {/* Confirm Password Field */}
        <label className="flex flex-col gap-[6px]">
          <p className="text-[14px] font-[500] text-[#1A1A1A]">
            Confirm Password
          </p>
          <div className="flex gap-[8px] px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px] items-center">
            <img src={Icons.key} alt="" className="signin-icons" />
            <input
              className="w-full outline-none border-none"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </label>

        {/* Submit Button */}
        <Button
          label="Done"
          onClick={()=>navigate("/sign-in")}
          disabled={!isFormFilled} // Enable only when form is valid
          className={`bg-[#383268] hover:bg-[#41397c] text-white rounded-[8px] w-full py-[12px] px-[20px]`}
        />
      </form>
    </div>
  );
};

export default NewPassword;
