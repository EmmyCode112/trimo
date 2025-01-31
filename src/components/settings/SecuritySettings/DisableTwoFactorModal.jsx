import { X } from "lucide-react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const DisableTwoFactorModal = ({ onClose, onConfirm }) => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex ${
        isMobile ? "items-end" : "items-center justify-center"
      }`}
    >
      <div className={`bg-white ${isMobile ? "w-full rounded-t-[30px]" : "rounded-lg w-[400px]"} p-6`}>
        {isMobile && <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mb-6" />}

        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="w-12 h-1 bg-red-500 rounded mb-4" />
            <h2 className="text-xl font-bold">Disable 2FA</h2>
          </div>
          {!isMobile && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to disable 2FA? This may reduce your account's security.
        </p>

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Yes, Disable
          </button>
        </div>
      </div>
    </div>
  )
}

export default DisableTwoFactorModal

