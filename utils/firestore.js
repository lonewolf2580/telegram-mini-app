import {
    addDoc,
    collection,
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from "@firebase/firestore";
import { db } from "../firebase";

export const loginAdmin = async (user) => {
    try {
        const usersRef = collection(db, "users"); // Reference to the 'users' collection
        const q = query(usersRef,
            where("role", "==", "admin"),
            where("email", "==", user.email),
            where("password", "==", user.password)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const user = querySnapshot.docs[0].data(); // Assuming only one admin with this email
            console.log("Admin found:", user);
            return user;
        } else {
            console.log("No admin found with the specified email.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching admin:", error.message);
        return null;
    }
}

export const addUserToDb = async (user) => {
    try {
        const collectionRef = collection(db, "users");
        const docRef = await addDoc(collectionRef, user);
        
        console.log("User added:", docRef.id)
        return true;
    } catch (error) {
        console.error("Error assigning role:", error.message);
        return false;
    }
}

export const updateUserInDb = async (uid, updatedData) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, updatedData);
        console.log("User data updated successfully!");
        return true;
    } catch (error) {
        console.error("Error updating user data:", error.message);
        return false;
    }
}