import { AlertCircle, X } from "lucide-react"

const ErrorAlert = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 flex items-center bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg">
    <AlertCircle className="w-5 h-5 mr-2" />
    <span>{message}</span>
    <button onClick={onClose} className="ml-4 hover:bg-red-100 rounded-full p-1">
      <X className="w-4 h-4" />
    </button>
  </div>
)

export default ErrorAlert

