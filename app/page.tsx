'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

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
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {userData ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
          <h1 className="text-3xl font-semibold text-blue-600 mb-6">User Details</h1>
          <ul className="text-gray-700 mb-6">
            <li className="mb-2"><strong>ID:</strong> {userData.id}</li>
            <li className="mb-2"><strong>First Name:</strong> {userData.first_name}</li>
            <li className="mb-2"><strong>Last Name:</strong> {userData.last_name || 'N/A'}</li>
            <li className="mb-2"><strong>Username:</strong> {userData.username || 'N/A'}</li>
            <li className="mb-2"><strong>Language Code:</strong> {userData.language_code}</li>
            <li className="mb-2"><strong>Is Premium:</strong> {userData.is_premium ? 'Yes' : 'No'}</li>
          </ul>
          <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition">
            Play
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  )
}
