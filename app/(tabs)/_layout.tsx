import { Tabs } from 'expo-router';
import { Home } from 'lucide-react-native';
import { useSafeAreaInsets } from '@/app/utils/useSafeAreaInsets';

/**
 * Tab layout component for the app
 */
export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderColor: '#E5E7EB',
          paddingTop: 4,
          paddingBottom: Math.max(insets.bottom, 4),
          height: 49 + insets.bottom,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#6B6B6B',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
