import { useState } from "react"
import { Edit } from "lucide-react"
import TwoFactorAuth from "./TwoFactorAuth"
import ActiveSessions from "./ActiveSessions"

const SecuritySettings = () => {
  const [showPasswordEdit, setShowPasswordEdit] = useState(false)

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <TwoFactorAuth />

        {/* Password Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Password</h3>
          <div className="flex items-center justify-between">
            <input
              type="password"
              value="***************"
              readOnly
              className="bg-transparent border-none outline-none"
            />
            <button onClick={() => setShowPasswordEdit(true)} className="text-blue-500 hover:text-blue-600">
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
          <ActiveSessions />
        </div>
      </div>
    </div>
  )
}

export default SecuritySettings

