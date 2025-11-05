import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { GoalsProvider } from './src/goals/context/GoalsContext';

export default function App() {
  return (
    <AuthProvider>
      <GoalsProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </GoalsProvider>
    </AuthProvider>
  );
}
