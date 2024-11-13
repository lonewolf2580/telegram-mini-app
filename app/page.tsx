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
          <table className="table w-full border-separate border-spacing-2">
            <tbody>
              <tr>
                <td className="font-semibold">ID</td>
                <td>{userData.id}</td>
              </tr>
              <tr>
                <td className="font-semibold">First Name</td>
                <td>{userData.first_name}</td>
              </tr>
              <tr>
                <td className="font-semibold">Last Name</td>
                <td>{userData.last_name || 'N/A'}</td>
              </tr>
              <tr>
                <td className="font-semibold">Username</td>
                <td>{userData.username || 'N/A'}</td>
              </tr>
              <tr>
                <td className="font-semibold">Language Code</td>
                <td>{userData.language_code}</td>
              </tr>
              <tr>
                <td className="font-semibold">Is Premium</td>
                <td>{userData.is_premium ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
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
