import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import { Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();

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

  // Initialize browser bridge for AI automation (web only)
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      // Use a small delay to ensure window is fully ready
      const initBridge = async () => {
        try {
          const { initAutomationBridge } = await import(
            '@velork/browser-bridge'
          );

          initAutomationBridge({
            allowedOrigins: ['*'], // Allow all origins for template flexibility
            maxConsoleBufferSize: 1000,
            enableConsoleCapture: true,
            enableNetworkCapture: true,
          });

          console.log('[Expo App] ✅ Browser bridge initialized successfully');

          // Verify it's working by checking if message listener is set up
          if (window.parent && window.parent !== window) {
            console.log('[Expo App] Bridge ready signal sent to parent');
          }
        } catch (error) {
          console.error(
            '[Expo App] ❌ Failed to initialize browser bridge:',
            error
          );
        }
      };

      // Small delay to ensure React has mounted
      const timer = setTimeout(initBridge, 100);
      return () => clearTimeout(timer);
    }
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
