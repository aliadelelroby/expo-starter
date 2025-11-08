import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

/**
 * Root screen component
 */
export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
