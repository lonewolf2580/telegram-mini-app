'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'
import './styles.css'

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
    <main className="main-container">
      {userData ? (
        <div className="card">
          <h1 className="card-title">User Details</h1>
          <table className="table">
            <tbody>
              <tr className="table-row">
                <td className="table-cell table-cell-label">ID</td>
                <td className="table-cell">{userData.id}</td>
              </tr>
              <tr className="table-row">
                <td className="table-cell table-cell-label">First Name</td>
                <td className="table-cell">{userData.first_name}</td>
              </tr>
              <tr className="table-row">
                <td className="table-cell table-cell-label">Last Name</td>
                <td className="table-cell">{userData.last_name || 'N/A'}</td>
              </tr>
              <tr className="table-row">
                <td className="table-cell table-cell-label">Username</td>
                <td className="table-cell">{userData.username || 'N/A'}</td>
              </tr>
              <tr className="table-row">
                <td className="table-cell table-cell-label">Language Code</td>
                <td className="table-cell">{userData.language_code}</td>
              </tr>
              <tr className="table-row">
                <td className="table-cell table-cell-label">Is Premium</td>
                <td className="table-cell">{userData.is_premium ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
          <a href="#" className="play-button">Play</a>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </main>
  )
}
