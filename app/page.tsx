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
    <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {userData ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
            User Data
          </h1>
          <ul className="list-none space-y-4 text-gray-700">
            <li><strong>ID:</strong> {userData.id}</li>
            <li><strong>First Name:</strong> {userData.first_name}</li>
            <li><strong>Last Name:</strong> {userData.last_name || 'N/A'}</li>
            <li><strong>Username:</strong> {userData.username || 'N/A'}</li>
            <li><strong>Language Code:</strong> {userData.language_code}</li>
            <li><strong>Is Premium:</strong> {userData.is_premium ? 'Yes' : 'No'}</li>
          </ul>
          <div className="flex justify-center mt-8">
            <button className="btn btn-primary">Play</button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </main>
  )
}
