import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from '@iconify/react';

interface LoadingProps {
  onLoadingComplete?: () => void
}

const Loading: React.FC<LoadingProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setTimeout(() => {
            setIsVisible(false)
            onLoadingComplete?.()
          }, 1500) // Wait 1.5 seconds before fading out
          return 100
        }
        return prevProgress + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 z-50"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon icon="mdi:briefcase" className="w-12 h-12 text-blue-500" />
              </div>
            </motion.div>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-green-500 mt-5"
              >
                Complete
              </motion.div>
            )}
          </div>
          <div className="fixed right-8 top-1/2 -translate-y-1/2 h-[75vh] w-4 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-blue-500 rounded-full"
              initial={{ height: 0 }}
              animate={{ height: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="fixed right-8 bottom-8 text-2xl font-bold">{progress}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loading

