// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD06-BDqymJjfVLksjT-fylmVMvOYpoGm0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "hawaiin.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hawaiin",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hawaiin.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "761619645605",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:761619645605:web:06504ed65f6b3c184ff94c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-WED9C3W9KX"
};

export default firebaseConfig;
