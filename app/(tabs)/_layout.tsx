import { Tabs } from 'expo-router';
import { Home } from 'lucide-react-native';

/**
 * Tab layout component for the app
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderColor: '#E5E7EB',
          paddingTop: 4,
          paddingBottom: 4,
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
