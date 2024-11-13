'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData)
    }
  }, [])

  return (
    <main className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      {userData ? (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto border border-gray-200">
          <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
            User Details
          </h1>
          <table className="table w-full border-collapse border border-gray-300 rounded-lg mb-8">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="font-semibold p-3 text-gray-600">ID</td>
                <td className="p-3 text-gray-800">{userData.id}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold p-3 text-gray-600">First Name</td>
                <td className="p-3 text-gray-800">{userData.first_name}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold p-3 text-gray-600">Last Name</td>
                <td className="p-3 text-gray-800">{userData.last_name || 'N/A'}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold p-3 text-gray-600">Username</td>
                <td className="p-3 text-gray-800">{userData.username || 'N/A'}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold p-3 text-gray-600">Language Code</td>
                <td className="p-3 text-gray-800">{userData.language_code}</td>
              </tr>
              <tr>
                <td className="font-semibold p-3 text-gray-600">Is Premium</td>
                <td className="p-3 text-gray-800">{userData.is_premium ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center">
            <button className="btn btn-primary font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
              Play
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </main>
  )
}
