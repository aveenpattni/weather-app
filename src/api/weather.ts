const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export type Units = 'metric' | 'imperial';

export type Weather = {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
};

const STATUS_MESSAGES: Record<number, string> = {
  401: 'Invalid API key. New keys can take up to a couple of hours to activate.',
  404: 'City not found. Check the spelling and try again.',
  429: 'Rate limit reached. Try again shortly.',
};

export async function fetchCurrentWeather(
  city: string,
  units: Units,
  signal?: AbortSignal,
): Promise<Weather> {
  const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('Add your OpenWeatherMap API key to .env and restart the dev server.');
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&units=${units}&appid=${apiKey}`;

  let response: Response;
  try {
    response = await fetch(url, { signal });
  } catch (err) {
    if (signal?.aborted) throw err;
    throw new Error('Network error. Check your connection.');
  }

  if (!response.ok) {
    throw new Error(
      STATUS_MESSAGES[response.status] ?? `Something went wrong (${response.status}).`,
    );
  }

  const json = await response.json();
  return {
    city: json.name,
    country: json.sys?.country ?? '',
    temp: json.main.temp,
    feelsLike: json.main.feels_like,
    tempMin: json.main.temp_min,
    tempMax: json.main.temp_max,
    humidity: json.main.humidity,
    windSpeed: json.wind?.speed ?? 0,
    description: json.weather?.[0]?.description ?? '',
    icon: json.weather?.[0]?.icon ?? '01d',
  };
}
