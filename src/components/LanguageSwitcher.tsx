import type React from "react"
import { useTranslation } from "react-i18next"
import { Icon } from '@iconify/react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "es" : "en"
    i18n.changeLanguage(newLanguage).catch((error) => {
      console.error("Failed to change language:", error)
    })
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={i18n.language === "en" ? "Switch to Spanish" : "Switch to English"}
    >
      <Icon icon={i18n.language === "en" ? "circle-flags:gb" : "circle-flags:es"} className="w-6 h-6" />
    </button>
  )
}

export default LanguageSwitcher

