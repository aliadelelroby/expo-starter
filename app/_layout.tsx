import { Stack } from 'expo-router';

/**
 * Root layout component that sets up the navigation structure
 */
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
