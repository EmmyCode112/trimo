import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import ErrorAlert from "@/components/Alerts/ErrorAlert"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const TwoFactorVerification = ({ onClose, onSuccess }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(60)
  const [attempts, setAttempts] = useState(3)
  const [showError, setShowError] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleVerify = () => {
    const otpValue = otp.join("")
    if (otpValue === "123456") {
      // Demo validation
      onSuccess()
    } else {
      setAttempts((prev) => prev - 1)
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      if (attempts <= 1) {
        onClose()
      }
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex ${
        isMobile ? "items-end" : "items-center justify-center"
      }`}
    >
      {showError && (
        <ErrorAlert
          message={`Incorrect OTP. Please try again. You have ${attempts - 1} attempts remaining.`}
          onClose={() => setShowError(false)}
        />
      )}

      <div className={`bg-white ${isMobile ? "w-full rounded-t-[30px]" : "rounded-lg w-[500px]"} p-6`}>
        {isMobile && <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mb-6" />}

        <button onClick={onClose} className="flex items-center text-gray-600 mb-6 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>

        <h2 className="text-2xl font-bold mb-2">2FA Verification</h2>
        <p className="text-gray-600 mb-6">Enter the OTP sent to your registered phone number to activate 2FA.</p>

        {/* OTP Input Fields */}
        <div className="flex gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => {
                const newOtp = [...otp]
                newOtp[index] = e.target.value
                setOtp(newOtp)
              }}
              className="w-12 h-12 text-center border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-lg"
            />
          ))}
        </div>

        <div className="text-sm text-gray-600 mb-6">
          ETA: <span className="font-medium">{timer} sec</span>
        </div>

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            Cancel
          </button>
          <button onClick={handleVerify} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default TwoFactorVerification

