/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  VITE_API_PLAYERS_URL: string;
  VITE_FIREBASE_API_KEY: string;
  VITE_FIREBASE_API_AUTHDOMAIN: string;
  VITE_FIREBASE_API_PROJECTID: string;
  VITE_FIREBASE_API_STORAGEBUCKET: string;
  VITE_FIREBASE_API_MESSAGINGSENDERID: string;
  VITE_FIREBASE_API_APPID: string;
}
