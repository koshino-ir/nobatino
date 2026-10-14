export const env = {
  API_URL: process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com',
  APP_ENV: (process.env.EXPO_PUBLIC_APP_ENV ?? 'development') as
    'development' | 'staging' | 'production',
  IS_DEV: __DEV__,
} as const;
