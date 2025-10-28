import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContent}>
        <Text style={styles.greeting}>Hola, User</Text>
        <Text style={styles.shift}>Turno: 08:00 - 16:00</Text>
      </View>
      <View style={styles.rightContent}>
        <View style={styles.statusItem}>
          <MaterialCommunityIcons name="wifi" size={14} color="#FFFFFF" />
          <Text style={styles.statusText}>Conectado</Text>
        </View>
        <View style={styles.statusItem}>
          <MaterialCommunityIcons name="battery" size={14} color="#FFFFFF" />
          <Text style={styles.statusText}>85%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0F3460',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  shift: {
    fontSize: 14,
    color: '#A0AEC0',
  },
  rightContent: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 8,
  },
  statusItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default Header;
