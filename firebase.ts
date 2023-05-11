import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
	apiKey: "AIzaSyCggLplLHd6iJch436DQnx9ZAWV0aPEnmU",
	authDomain: "road-6b20c.firebaseapp.com",
	projectId: "road-6b20c",
	storageBucket: "road-6b20c.appspot.com",
	messagingSenderId: "859299726025",
	appId: "1:859299726025:web:67781d8378d440a9528318",
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getDatabase(app);
export default app;
export const auth = getAuth(app);