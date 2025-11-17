import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import { Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();

/**
 * Initialize browser bridge for AI automation (web only)
 * This allows the parent window to control this iframe when running in web
 */
if (Platform.OS === 'web' && typeof window !== 'undefined') {
  import('@velork/browser-bridge').then(({ initAutomationBridge }) => {
    initAutomationBridge({
      allowedOrigins: ['*'], // Allow all origins for template flexibility
      maxConsoleBufferSize: 1000,
      enableConsoleCapture: true,
      enableNetworkCapture: true,
    });
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Root layout component that wraps the app with necessary providers
 */
export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider
      initialMetrics={{
        insets: { top: 64, bottom: 34, left: 0, right: 0 },
        frame: {
          x: 0,
          y: 0,
          width: typeof window === 'undefined' ? 390 : window.innerWidth,
          height: typeof window === 'undefined' ? 844 : window.innerHeight,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
