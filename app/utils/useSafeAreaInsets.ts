import { useSafeAreaInsets as useNativeSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Custom hook that ensures 64px top padding on web/iframe contexts
 * This matches the behavior of the mobile app polyfill
 */
export function useSafeAreaInsets() {
  const insets = useNativeSafeAreaInsets();

  // On web/iframe (tablet and above), force 64px top and 34px bottom padding for iPhone frame compatibility
  // Matches mobile app: isTabletAndAbove = typeof window !== 'undefined' ? window.self !== window.top : true
  const isTabletAndAbove =
    typeof window !== 'undefined' ? window.self !== window.top : true;

  if (isTabletAndAbove) {
    return {
      left: 0,
      right: 0,
      top: 64,
      bottom: 34,
    };
  }

  return insets;
}
