import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AlertsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alertas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F3460',
  },
});

export default AlertsScreen;
