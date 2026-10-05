import { Image, StyleSheet, Text, View } from 'react-native';

import { Units, Weather } from '../api/weather';

type Props = {
  weather: Weather;
  units: Units;
};

export function WeatherCard({ weather, units }: Props) {
  const degree = units === 'metric' ? '°C' : '°F';
  const speed = units === 'metric' ? 'm/s' : 'mph';
  const location = weather.country ? `${weather.city}, ${weather.country}` : weather.city;

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{location}</Text>
      <Image
        style={styles.icon}
        source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@4x.png` }}
      />
      <Text style={styles.temp}>
        {Math.round(weather.temp)}
        {degree}
      </Text>
      <Text style={styles.description}>{weather.description}</Text>
      <Text style={styles.range}>
        H {Math.round(weather.tempMax)}° · L {Math.round(weather.tempMin)}°
      </Text>

      <View style={styles.stats}>
        <Stat label="Feels like" value={`${Math.round(weather.feelsLike)}${degree}`} />
        <Stat label="Humidity" value={`${weather.humidity}%`} />
        <Stat label="Wind" value={`${Math.round(weather.windSpeed)} ${speed}`} />
      </View>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
  },
  city: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1c2a3a',
  },
  icon: {
    width: 140,
    height: 140,
  },
  temp: {
    fontSize: 64,
    fontWeight: '200',
    color: '#1c2a3a',
  },
  description: {
    fontSize: 18,
    color: '#4a5a6a',
    textTransform: 'capitalize',
  },
  range: {
    marginTop: 4,
    fontSize: 14,
    color: '#7a8896',
  },
  stats: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#d5dce3',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c2a3a',
  },
  statLabel: {
    marginTop: 2,
    fontSize: 12,
    color: '#7a8896',
  },
});
