"use client";

import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import './style.css';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// Initialize user data in Firebase
async function initializeUserData(userId: any, username: any) {
  const usersRef = collection(db, "user");
  try {
    await setDoc(doc(usersRef, userId), {
      userId: userId,
      username: username,
      balance: 0,
      level: 0,
      tasks: [],
      skins: [],
      airdrop: 0
    });
    console.log(`User data initialized for user: ${username}`);
  } catch (error) {
    console.error("Error initializing user data:", error);
  }
}

// Check if user exists in Firebase
async function checkIfUserExist(userId: any, username: any) {
  const docRef = doc(db, "user", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User already exists:", docSnap.data());
  } else {
    console.log("No such user. Initializing new user data.");
    await initializeUserData(userId, username);
  }
}

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
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (WebApp.initDataUnsafe.user) {
        const user = WebApp.initDataUnsafe.user as UserData;
        setUserData(user);

        // Wait until userData is set before checking if user exists
        await checkIfUserExist(user.id.toString(), user.username);
      }
    }
    
    fetchData();
  }, []);

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
          <a href="/dashboard" className="play-button">Play</a>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </main>
  );
}
