import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Units } from './src/api/weather';
import { ErrorView } from './src/components/ErrorView';
import { WeatherCard } from './src/components/WeatherCard';
import { useWeather } from './src/hooks/useWeather';

const DEFAULT_CITY = 'Toronto';

export default function App() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState(DEFAULT_CITY);
  const [units, setUnits] = useState<Units>('metric');
  const { data, loading, error, refetch } = useWeather(city, units);

  const submit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    Keyboard.dismiss();
    setQuery('');
    // Searching the same city again should still refresh it.
    if (trimmed === city) refetch();
    else setCity(trimmed);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar style="dark" />

        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={submit}
            placeholder="Search city"
            placeholderTextColor="#7a8896"
            returnKeyType="search"
            autoCorrect={false}
          />
          <Pressable style={styles.searchButton} onPress={submit} accessibilityRole="button">
            <Text style={styles.searchButtonText}>Search</Text>
          </Pressable>
        </View>

        <View style={styles.unitRow}>
          <UnitButton label="°C" active={units === 'metric'} onPress={() => setUnits('metric')} />
          <UnitButton
            label="°F"
            active={units === 'imperial'}
            onPress={() => setUnits('imperial')}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          refreshControl={<RefreshControl refreshing={loading && !!data} onRefresh={refetch} />}
        >
          {error ? (
            <ErrorView message={error} onRetry={refetch} />
          ) : data ? (
            <WeatherCard weather={data} units={units} />
          ) : (
            <ActivityIndicator size="large" color="#2f6fed" style={styles.spinner} />
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function UnitButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.unitButton, active && styles.unitButtonActive]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <Text style={[styles.unitText, active && styles.unitTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e8eef5',
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#1c2a3a',
  },
  searchButton: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#2f6fed',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  unitRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  unitButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  unitButtonActive: {
    backgroundColor: '#1c2a3a',
  },
  unitText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1c2a3a',
  },
  unitTextActive: {
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  spinner: {
    marginTop: 80,
  },
});
