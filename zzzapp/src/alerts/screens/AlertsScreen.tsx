import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AlertsHeader from '../components/AlertsHeader';
import AlertsFilters from '../components/AlertsFilters';

const AlertsScreen: React.FC = () => {
  return (
    <ScrollView 
      style={styles.container}
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      <AlertsHeader />
      <AlertsFilters />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EBF0',
  },
});

export default AlertsScreen;
