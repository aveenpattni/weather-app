# Weather App

A simple React Native + Expo app that shows current weather conditions for a city using the [OpenWeatherMap](https://openweathermap.org/current) free API.

## Setup

1. Create a free API key at https://home.openweathermap.org/api_keys (new keys can take up to a couple of hours to activate).
2. Put it in `.env`:

   ```
   EXPO_PUBLIC_OPENWEATHER_API_KEY=your_key_here
   ```

3. Start the app:

   ```bash
   npm install
   npx expo start
   ```

   Press `i` for the iOS simulator, `a` for Android, `w` for web, or scan the QR code with Expo Go. Restart the dev server after changing `.env`.

Note: `EXPO_PUBLIC_` variables are bundled into the app, so the key is visible to anyone who has the build. That is fine for a personal project on the free tier; put the call behind a server if you ship this publicly.

## Structure

- `App.tsx` – the single screen: search, unit toggle, loading/error/success states
- `src/api/weather.ts` – OpenWeatherMap request and error mapping
- `src/hooks/useWeather.ts` – fetch state (`data`, `loading`, `error`, `refetch`)
- `src/components/` – `WeatherCard` and `ErrorView`
