// NOTE: In a real production app, replace these strings with your actual Firebase config keys
// from the Firebase Console -> Project Settings -> General -> Your Apps.
// If these are empty, the app will fall back to "Mock Mode" using LocalStorage.

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "", 
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || ""
};

export const isFirebaseConfigured = () => {
  return !!firebaseConfig.apiKey;
};
