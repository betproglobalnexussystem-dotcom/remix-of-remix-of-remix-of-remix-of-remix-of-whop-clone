// Firebase app + Firestore. The config below is publishable client config.
import { type FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { type Firestore, getFirestore } from "firebase/firestore";

export const firebaseConfig = {
	apiKey: "AIzaSyBWvzm5EeascHdP0RPi4vHIxz5quSBtIXA",
	authDomain: "mageye-hassan.firebaseapp.com",
	projectId: "mageye-hassan",
	storageBucket: "mageye-hassan.firebasestorage.app",
	messagingSenderId: "892139952117",
	appId: "1:892139952117:web:5f477bc3da792e8c0e72bc",
	measurementId: "G-XSFQ646K1K",
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp {
	if (!app) app = getApps().length ? getApp() : initializeApp(firebaseConfig);
	return app;
}

/** Firestore handle. Returns null during SSR so callers can fall back to seed data. */
export function getDb(): Firestore | null {
	if (typeof window === "undefined") return null;
	if (!db) db = getFirestore(getFirebaseApp());
	return db;
}
