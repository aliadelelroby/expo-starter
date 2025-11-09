import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

/**
 * Example API fetch function
 */
const fetchExampleData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { message: 'Welcome to your Expo app!' };
};

/**
 * Main screen component demonstrating React Query usage
 */
export default function Index() {
  const { data, isLoading } = useQuery({
    queryKey: ['example'],
    queryFn: fetchExampleData,
  });

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Text style={styles.title}>Expo Starter</Text>
        <Text style={styles.subtitle}>
          {isLoading ? 'Loading...' : data?.message}
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            ✓ React Query installed and configured
          </Text>
          <Text style={styles.infoText}>✓ TypeScript ready</Text>
          <Text style={styles.infoText}>✓ Expo Router configured</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  infoContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
});
