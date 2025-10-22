import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccountActions: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      
      <TouchableOpacity style={styles.actionButton}>
        <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
        <Text style={styles.actionTextDanger}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionTextDanger: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 12,
  },
});

export default AccountActions;
