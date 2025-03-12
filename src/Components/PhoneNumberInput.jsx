import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput = ({ value, onChange, defaultCountry = "ng" }) => {
  const [country, setCountry] = useState(defaultCountry);
  const [dialCode, setDialCode] = useState(`[+234]`); // Default with brackets
  const [phoneNumber, setPhoneNumber] = useState(value || `${dialCode} `);

  const handlePhoneChange = (phone, countryData) => {
    if (countryData?.dialCode) {
      const newDialCode = `[+${countryData.dialCode}]`;

      if (newDialCode !== dialCode) {
        setCountry(countryData.countryCode);
        setDialCode(newDialCode);
        setPhoneNumber(newDialCode + " ");
      }
    }

    // Ensure the country code always remains at the start
    if (!phone.startsWith(dialCode)) {
      phone = dialCode + " " + phone.replace(/[^0-9]/g, "").slice(dialCode.length);
    }

    setPhoneNumber(phone);
    onChange(phone);
  };

  return (
    <PhoneInput
      country={country}
      value={phoneNumber}
      onChange={handlePhoneChange}
      enableSearch={true}
      inputStyle={{ width: "100%", height: "40px", paddingLeft: "50px" }}
      containerStyle={{ width: "100%" }}
    />
  );
};

export default PhoneNumberInput;
