import { useState } from "react"
import TwoFactorVerification from "./TwoFactorVerification"
import DisableTwoFactorModal from "./DisableTwoFactorModal"
import SuccessAlert from "@/components/Alerts/SuccessAlert"

const TwoFactorAuth = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [showDisableModal, setShowDisableModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handle2FAToggle = () => {
    if (is2FAEnabled) {
      setShowDisableModal(true)
    } else {
      setShowVerification(true)
    }
  }

  const handleVerificationSuccess = () => {
    setIs2FAEnabled(true)
    setShowVerification(false)
    setSuccessMessage("2FA is now enabled! Your account is more secure.")
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDisable2FA = () => {
    setIs2FAEnabled(false)
    setShowDisableModal(false)
    setSuccessMessage("2FA disabled. You'll no longer need OTPs to log in.")
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="space-y-2">
      {showSuccess && <SuccessAlert message={successMessage} onClose={() => setShowSuccess(false)} />}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Two-Factor Authentication (2FA)</h3>
          <p className="text-sm text-gray-500">
            Enable 2FA for enhanced security. You'll receive an OTP during each login.
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={is2FAEnabled} onChange={handle2FAToggle} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {showVerification && (
        <TwoFactorVerification onClose={() => setShowVerification(false)} onSuccess={handleVerificationSuccess} />
      )}

      {showDisableModal && (
        <DisableTwoFactorModal onClose={() => setShowDisableModal(false)} onConfirm={handleDisable2FA} />
      )}
    </div>
  )
}

export default TwoFactorAuth

