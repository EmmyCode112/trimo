import { useState } from "react"
import { Edit } from "lucide-react"
import TwoFactorVerification from "./SecuritySettings/TwoFactorVerification"
import DisableTwoFactorModal from "./SecuritySettings/DisableTwoFactorModal"
import SuccessAlert from "@/components/Alerts/SuccessAlert"

const SecuritySettings = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [showDisableModal, setShowDisableModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const sessions = [
    {
      deviceName: "Chrome on Windows",
      location: "City, Country",
      status: "Active",
      lastActive: "5 minutes ago",
      ipAddress: "190.213.161.20",
      teams: ["Design", "Product", "Marketing"],
    },
    {
      deviceName: "Safari on Mac",
      location: "City, Country",
      status: "Active",
      lastActive: "Yesterday at 3:15 PM",
      ipAddress: "123.152.99.118",
      teams: ["Design", "Product", "Marketing"],
    },
  ]

  return (
    <div className="space-y-8">
      {showSuccess && <SuccessAlert message={successMessage} onClose={() => setShowSuccess(false)} />}

      {/* 2FA Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Two-Factor Authentication (2FA)</h3>
            <p className="text-sm text-gray-500">
              Enable 2FA for enhanced security. You'll receive an OTP during each login.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={is2FAEnabled}
              onChange={() => {
                if (is2FAEnabled) {
                  setShowDisableModal(true)
                } else {
                  setShowVerification(true)
                }
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Password Section */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Password</h3>
        <div className="flex items-center justify-between">
          <input type="password" value="***************" readOnly className="bg-transparent border-none outline-none" />
          <button className="text-blue-500 hover:text-blue-600">
            <Edit className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-gray-500">Strengthen your account with a secure password.</p>
      </div>

      {/* Active Sessions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Active Sessions Management</h3>
            <p className="text-sm text-gray-500">Monitor and control your active sessions.</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Active Sessions</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">2 Keys</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teams</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.map((session, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">{session.deviceName}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{session.location}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {session.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{session.lastActive}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{session.ipAddress}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {session.teams.slice(0, 3).map((team, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                          {team}
                        </span>
                      ))}
                      {session.teams.length > 3 && (
                        <span className="text-xs text-gray-500">+{session.teams.length - 3}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showVerification && (
        <TwoFactorVerification
          onClose={() => setShowVerification(false)}
          onSuccess={() => {
            setIs2FAEnabled(true)
            setShowVerification(false)
            setSuccessMessage("2FA is now enabled! Your account is more secure.")
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)
          }}
        />
      )}

      {showDisableModal && (
        <DisableTwoFactorModal
          onClose={() => setShowDisableModal(false)}
          onConfirm={() => {
            setIs2FAEnabled(false)
            setShowDisableModal(false)
            setSuccessMessage("2FA disabled. You'll no longer need OTPs to log in.")
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)
          }}
        />
      )}
    </div>
  )
}

export default SecuritySettings

