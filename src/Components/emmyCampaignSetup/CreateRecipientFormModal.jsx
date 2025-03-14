import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../../assets/assets";
import Button from "../buttons/transparentButton";
import { useRecipients } from "../../redux/UseRecipient";
import PhoneNumberInput from "@/Components/PhoneNumberInput";

const CreateRecipientFormModal = ({ onClose, onOpen }) => {
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);
  const { recipients, setRecipients } = useRecipients();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameReg = /^[A-Za-z][A-Za-z\s'-]*$/;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (onOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOpen, onClose]);

  const handleDragStart = (e) => {
    if (!isMobile) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = { startY: clientY };
  };

  const handleDragMove = (e) => {
    if (!dragRef.current || !isMobile || !modalRef.current) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = clientY - dragRef.current.startY;

    if (delta > 100) {
      onClose();
      dragRef.current = null;
    } else {
      modalRef.current.style.transform = `translateY(${Math.max(0, delta)}px)`;
    }
  };

  const handleDragEnd = () => {
    if (!modalRef.current || !isMobile) return;
    modalRef.current.style.transform = "";
    dragRef.current = null;
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (name === "firstName" || name === "lastName") {
      if (!value)
        error = `${name === "firstName" ? "First" : "Last"} name is required.`;
      else if (!nameReg.test(value))
        error = `Invalid ${
          name === "firstName" ? "first" : "last"
        } name format.`;
    }

    if (name === "email") {
      if (!value) error = "Email is required.";
      else if (!emailRegex.test(value)) error = "Invalid email format.";
    }

    if (name === "phone" && !value) {
      error = "Phone number is required.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTouched = {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    };
    setTouched(newTouched);

    Object.keys(formData).forEach((key) => validateField(key, formData[key]));

    if (Object.values(errors).some((error) => error !== "")) return;

    const newRecipient = { id: recipients.length + 1, ...formData };
    setRecipients([...recipients, newRecipient]);

    setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    setErrors({});
    setTouched({});
    onClose();
  };

  const isValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    Object.values(errors).every((error) => !error);

  if (!onOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`fixed bg-white overflow-y-scroll hide-scrollBar ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[40px] p-3"
            : "top-4 bottom-4 right-3 w-[517px] rounded-[30px] p-[22px]"
        }`}
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}
        onTouchMove={handleDragMove}
        onMouseMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseUp={handleDragEnd}
      >
        {isMobile && (
          <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mt-4" />
        )}

        <div className="flex flex-col justify-between h-full gap-5 mt-3">
          <div>
            <h2 className="text-[#1A1A1A] text-[18px] font-medium ">
              Enter Contact Manually
            </h2>
            <p className="text-[#767676] text-[14px] font-normal max-w-[95%] md:w-full">
              Add recipient one by one for quick updates or smaller campaigns
            </p>

            {["firstName", "lastName", "email"].map((field) => (
              <label key={field} className="flex flex-col gap-2">
                <p className="text-[14px] font-medium text-[#1A1A1A]">
                  {field === "firstName"
                    ? "First Name"
                    : field === "lastName"
                    ? "Last Name"
                    : "Email"}
                </p>
                <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
                  <img
                    src={Icons.profile}
                    alt={field}
                    className="signin-icons"
                  />
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                  />
                </div>
                {touched[field] && errors[field] && (
                  <p className="text-red-500 text-sm">{errors[field]}</p>
                )}
              </label>
            ))}

            <label className="flex flex-col gap-2">
              <p className="text-[14px] font-medium text-[#1A1A1A]">
                Phone Number
              </p>
              <PhoneNumberInput
                country={"ng"}
                value={formData.phone}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, phone: value }));
                  if (touched.phone) validateField("phone", value);
                }}
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </label>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              label="Cancel"
              onClick={onClose}
              className="rounded-[8px] border border-[#383268] text-[#383268]"
            />
            <Button
              label="Add Contact"
              onClick={handleSubmit}
              disabled={!isValid}
              className="rounded-[8px] border bg-[#383268] text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipientFormModal;
