import Button from "../../Components/buttons/transparentButton";
import { Icons } from "../../assets/assets";

import { useState, useMemo } from "react";

const SignUpForm = ({ setShowOtpPopUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workPhone, setWorkPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    workPhone: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChecklist, setPasswordChecklist] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validate password
  const validatePassword = (password) => {
    const passwordChecklistUpdate = {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMinLength: password.length >= 8,
    };

    setPasswordChecklist(passwordChecklistUpdate);

    // Return true only if all conditions are met
    return Object.values(passwordChecklistUpdate).every((val) => val);
  };

  // Validate password
  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  // Validate full name
  const validateFirstName = (name) => {
    return name.length > 0 && /^[a-zA-Z\s]+$/.test(name);
  };

   // Validate full name
   const validateLastName = (lastname) => {
    return lastname.length > 0 && /^[a-zA-Z\s]+$/.test(lastname);
  };

  // Validate work phone (only numbers)
  const validateWorkPhone = (phone) => {
    return phone.length > 0 && /^\d+$/.test(phone);
  };

  // Memoize isFormFilled to avoid re-renders
  const isFormFilled = useMemo(() => {
    return (
      email &&
      password &&
      firstName &&
      lastName &&
      workPhone &&
      confirmPassword &&
      termsChecked &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateFirstName(firstName) &&
      validateLastName(lastName) &&
      validateWorkPhone(workPhone) &&
      validateConfirmPassword(password, confirmPassword)
    );
  }, [email, password, firstName,lastName, workPhone, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!validatePassword(password)) {
      newErrors.password = "Password does not meet the required criteria.";
    }

    if (!validateFirstName(firstName)) {
      newErrors.fullName = "Full Name must only contain letters and spaces.";
    }

    if (!validateWorkPhone(workPhone)) {
      newErrors.workPhone = "Work Phone must contain only numbers.";
    }

    if (!validateConfirmPassword(password, confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Update errors state only once
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Proceed only when there are no validation errors
      setShowOtpPopUp(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6 mb-6">
      {/* Email Input */}
      <label className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-800">Email</p>
        <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
          <img src={Icons.smsIcon} alt="" className="signin-icons" />
          <input
            type="email"
            placeholder="example@gmail.com"
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
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </label>

      {/* First Name Input */}
      <label className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-800">First Name</p>
        <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
          <img src={Icons.profile} alt="" className="signin-icons" />
          <input
            type="text"
            placeholder="John"
            className="w-full outline-none border-none"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (!validateFirstName(e.target.value)) {
                setErrors((prev) => ({
                  ...prev,
                  firstName: "Your first Name must only contain letters and spaces.",
                }));
              } else {
                setErrors((prev) => ({ ...prev, firstName: "" }));
              }
            }}
          />
        </div>
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName}</p>
        )}
      </label>

      {/* last Name Input */}

      <label className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-800">Last Name</p>
        <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
          <img src={Icons.profile} alt="" className="signin-icons" />
          <input
            type="text"
            placeholder="Doe"
            className="w-full outline-none border-none"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (!validateLastName(e.target.value)) {
                setErrors((prev) => ({
                  ...prev,
                  lastName: "Your last Name must only contain letters and spaces.",
                }));
              } else {
                setErrors((prev) => ({ ...prev, lastName: "" }));
              }
            }}
          />
        </div>
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName}</p>
        )}
      </label>

      {/* Work Phone Input */}
      <label className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-800">Work Phone</p>
        <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
          <img src={Icons.naira} alt="" className="signin-icons" />
          <input
            type="text"
            placeholder="+234 904 666 0706"
            className="w-full outline-none border-none"
            value={workPhone}
            onChange={(e) => {
              setWorkPhone(e.target.value);
              if (!validateWorkPhone(e.target.value)) {
                setErrors((prev) => ({
                  ...prev,
                  workPhone: "Work Phone must contain only numbers.",
                }));
              } else {
                setErrors((prev) => ({ ...prev, workPhone: "" }));
              }
            }}
          />
        </div>
        {errors.workPhone && (
          <p className="text-red-500 text-sm">{errors.workPhone}</p>
        )}
      </label>

      {/* Password Input */}
      <label className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-800">Password</p>
        <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
          <img src={Icons.key} alt="" className="signin-icons" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full outline-none border-none"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (!validatePassword(e.target.value)) {
                setErrors((prev) => ({
                  ...prev,
                  password: "Password must be at least 8 characters long.",
                }));
              } else {
                setErrors((prev) => ({ ...prev, password: "" }));
              }
            }}
          />
          <img
            src={Icons.eyeOpen}
            alt="Toggle Password Visibility"
            className="signin-icons cursor-pointer"
            onClick={handleTogglePassword}
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
            placeholder="confirm your password"
            className="w-full outline-none border-none"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);

              // Dynamically validate confirm password
              if (!validateConfirmPassword(password, e.target.value)) {
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: "Passwords do not match.",
                }));
              } else {
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }
            }}
          />
          <img
            src={Icons.eyeOpen}
            alt="Toggle Password Visibility"
            className="signin-icons cursor-pointer"
            onClick={handleToggleConfirmPassword}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </label>

      {/* Terms and Conditions */}
      <div className="flex gap-2">
        <input
          type="checkbox"
          id="terms"
          checked={termsChecked}
          onChange={(e) => setTermsChecked(e.target.checked)}
        />
        <label htmlFor="terms" className="text-sm cursor-pointer ">
          I agree to the triimo{" "}
          <span className="text-[#4285F4]">Terms & Conditions</span>
        </label>
      </div>

      {/* Password Checklist */}
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <p className="font-medium">Password must include:</p>
        <ul className="list-none flex flex-wrap gap-2">
          <li className="flex py-1 px-[10px] rounded-[6px] gap-1 border cursor-pointer items-center border-[#D0D5DD]">
            <input
              type="checkbox"
              checked={passwordChecklist.hasUpperCase}
              readOnly
            />{" "}
            Uppercase letter
          </li>
          <li className="flex py-1 px-[10px] rounded-[6px] gap-1 border cursor-pointer items-center border-[#D0D5DD]">
            <input
              type="checkbox"
              checked={passwordChecklist.hasLowerCase}
              readOnly
            />{" "}
            Lowercase letter
          </li>
          <li className="flex py-1 px-[10px] rounded-[6px] gap-1 border cursor-pointer items-center border-[#D0D5DD]">
            <input
              type="checkbox"
              checked={passwordChecklist.hasNumber}
              readOnly
            />{" "}
            Number
          </li>
          <li className="flex py-1 px-[10px] rounded-[6px] gap-1 border cursor-pointer items-center border-[#D0D5DD]">
            <input
              type="checkbox"
              checked={passwordChecklist.hasSpecialChar}
              readOnly
            />{" "}
            Special character
          </li>
          <li className="flex py-1 px-[10px] rounded-[6px] gap-1 border cursor-pointer items-center border-[#D0D5DD]">
            <input
              type="checkbox"
              checked={passwordChecklist.hasMinLength}
              readOnly
            />{" "}
            At least 8 characters
          </li>
        </ul>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        label="Verify your Info"
        disabled={!isFormFilled}
        className={`bg-[#383268] hover:bg-[#41397c] text-white rounded-lg w-full py-3 px-6`}
      />
    </form>
  );
};

export default SignUpForm;
