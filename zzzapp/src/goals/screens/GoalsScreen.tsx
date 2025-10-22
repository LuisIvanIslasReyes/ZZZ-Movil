import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MetasScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metas</Text>
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

export default MetasScreen;
