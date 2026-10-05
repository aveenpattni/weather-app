import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  message: string;
  onRetry: () => void;
};

export function ErrorView({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Couldn't load weather</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry} accessibilityRole="button">
        <Text style={styles.buttonText}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c2a3a',
  },
  message: {
    marginTop: 8,
    fontSize: 15,
    color: '#4a5a6a',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: '#2f6fed',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
