import { CheckSquare, X } from "lucide-react"

const SuccessAlert = ({ message, onClose }) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg">
    <CheckSquare className="w-5 h-5 mr-2" />
    <span>{message}</span>
    <button onClick={onClose} className="ml-4 hover:bg-green-100 rounded-full p-1">
      <X className="w-4 h-4" />
    </button>
  </div>
)

export default SuccessAlert