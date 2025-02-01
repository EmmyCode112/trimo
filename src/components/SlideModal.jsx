import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDragControls } from "framer-motion"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const SlideModal = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  showDragBar = true,
  width = "500px" 
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const dragControls = useDragControls()
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const variants = {
    desktop: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
    },
    mobile: {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
    }
  }

  const backdrop = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 100) {
      onClose()
    }
    setIsDragging(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            variants={backdrop}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={`fixed z-50 bg-white ${
              isMobile 
                ? "inset-x-0 bottom-0 rounded-t-[30px] max-h-[90vh]" 
                : `right-0 top-0 h-full ${width ? `w-[${width}]` : "w-[500px]"}`
            }`}
            variants={isMobile ? variants.mobile : variants.desktop}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
            drag={isMobile ? "y" : false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onDragStart={() => setIsDragging(true)}
          >
            {/* Drag Handle for Mobile */}
            {isMobile && showDragBar && (
              <div className="w-full flex justify-center pt-4 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>
            )}

            {/* Content */}
            <div className={`h-full overflow-auto ${isDragging ? 'pointer-events-none' : ''}`}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SlideModal