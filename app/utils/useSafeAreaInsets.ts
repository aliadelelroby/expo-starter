import { useSafeAreaInsets as useNativeSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Custom hook that ensures 64px top padding on web/iframe contexts
 * This matches the behavior of the mobile app polyfill
 */
export function useSafeAreaInsets() {
  const insets = useNativeSafeAreaInsets();

  // On web/iframe, force 64px top padding for iPhone frame compatibility
  const isWebIframe =
    typeof window !== 'undefined' ? window.self !== window.top : false;

  if (isWebIframe) {
    return {
      left: 0,
      right: 0,
      top: 64,
      bottom: 34,
    };
  }

  return insets;
}
