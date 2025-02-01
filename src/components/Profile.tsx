import type React from "react"
import { useTranslation } from "react-i18next"
import profilePicture from "../assets/profile-picture.jpeg"

const Profile: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center">
        <img
          src={profilePicture.src || "/placeholder.svg"}
          alt={t("yourName")}
          width={150}
          height={150}
          className="rounded-full mb-4 md:mb-0 md:mr-6 w-32 h-32 md:w-48 md:h-48 object-cover"
          loading="lazy"
        /> 
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("yourName")}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{t("jobTitle")}</p>
          <p className="text-gray-700 dark:text-gray-300">{t("profileDescription")}</p>
        </div>
      </div>
    </section>
  )
}

export default Profile

