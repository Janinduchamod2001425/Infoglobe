import { db } from "../config/firebase";
import {
    doc,
    setDoc,
    deleteDoc,
    getDocs,
    collection,
    getDoc
} from "firebase/firestore";

export const addFavorite = async (userId, countryCode, countryData) => {
    try {
        if (!userId) throw new Error("User ID is required");

        const favoriteRef = doc(db, "users", userId, "favorites", countryCode);
        await setDoc(favoriteRef, {
            ...countryData,
            countryCode,
            userId, // Store user ID with the favorite
            timestamp: new Date()
        });
        return true;
    } catch (error) {
        console.error("Error adding favorite:", error);
        throw error;
    }
};

export const removeFavorite = async (userId, countryCode) => {
    try {
        if (!userId) throw new Error("User ID is required");

        const favoriteRef = doc(db, "users", userId, "favorites", countryCode);
        await deleteDoc(favoriteRef);
        return true;
    } catch (error) {
        console.error("Error removing favorite:", error);
        throw error;
    }
};

export const getFavorites = async (userId) => {
    try {
        if (!userId) throw new Error("User ID is required");

        const favoritesRef = collection(db, "users", userId, "favorites");
        const snapshot = await getDocs(favoritesRef);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting favorites:", error);
        throw error;
    }
};

export const isFavorite = async (userId, countryCode) => {
    try {
        if (!userId) return false;

        const favoriteRef = doc(db, "users", userId, "favorites", countryCode);
        const snapshot = await getDoc(favoriteRef);
        return snapshot.exists();
    } catch (error) {
        console.error("Error checking favorite:", error);
        return false;
    }
};