import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileInfoItem from './ProfileInfoItem';

const UserInfoCard: React.FC = () => {
  return (
    <View style={styles.profileCard}>
      {/* User Info Header */}
      <View style={styles.userInfoHeader}>
        <View style={styles.userInfoLeft}>
          <Text style={styles.userName}>Carlos Rodríguez</Text>
          <Text style={styles.userEmail}>carlos.rodriguez@empresa.com</Text>
          <View style={styles.employeeIdContainer}>
            <Text style={styles.employeeId}>EMP001234</Text>
          </View>
        </View>
        
        {/* Edit Button */}
        <TouchableOpacity style={styles.editButton}>
          <MaterialCommunityIcons name="pencil" size={18} color="#0F3460" />
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      {/* Info Sections */}
      <ProfileInfoItem
        iconName="briefcase-outline"
        label="Departamento"
        value="Operaciones - Turno Mañana"
      />
      <ProfileInfoItem
        iconName="calendar"
        label="Fecha de Ingreso"
        value="15 de Marzo, 2023"
      />
      <ProfileInfoItem
        iconName="map-marker"
        label="Ubicación"
        value="Planta Industrial Norte"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  userInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  userInfoLeft: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F3460',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  employeeIdContainer: {
    alignSelf: 'flex-start',
  },
  employeeId: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F3460',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#0F3460',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F3460',
    marginLeft: 6,
  },
});

export default UserInfoCard;
