declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

declare module '@env' {
  export const REACT_APP_FIREBASE_ENDPOINT: string;
}
