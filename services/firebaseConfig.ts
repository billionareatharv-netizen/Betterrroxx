// Helper to safely access env vars in both Vite (import.meta.env) and CRA/Node (process.env)
const getEnv = (key: string, viteKey?: string): string => {
  // 1. Try Vite standard (import.meta.env)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      if (viteKey && import.meta.env[viteKey]) return import.meta.env[viteKey];
      // @ts-ignore
      if (import.meta.env[key]) return import.meta.env[key];
    }
  } catch (e) {
    // ignore
  }

  // 2. Try Node/CRA standard (process.env)
  try {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env[key]) return process.env[key];
    }
  } catch (e) {
    // ignore
  }

  return "";
};

export const firebaseConfig = {
  apiKey: getEnv('REACT_APP_FIREBASE_API_KEY', 'VITE_FIREBASE_API_KEY'), 
  authDomain: getEnv('REACT_APP_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('REACT_APP_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('REACT_APP_FIREBASE_STORAGE_BUCKET', 'VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('REACT_APP_FIREBASE_MESSAGING_SENDER_ID', 'VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('REACT_APP_FIREBASE_APP_ID', 'VITE_FIREBASE_APP_ID')
};

export const isFirebaseConfigured = () => {
  return !!firebaseConfig.apiKey;
};