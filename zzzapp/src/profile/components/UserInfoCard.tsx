import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileInfoItem from './ProfileInfoItem';
import EditProfileModal from './EditProfileModal';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../auth/services/authService';

const UserInfoCard: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser } = useAuth();

  const handleSave = async (firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      
      // Llamar al servicio para actualizar el perfil
      const updatedUser = await authService.updateEmployeeProfile(firstName, lastName);
      
      // Actualizar el contexto con los nuevos datos
      updateUser(updatedUser);
      
      // Cerrar el modal y mostrar mensaje de éxito
      setModalVisible(false);
      Alert.alert(
        'Éxito',
        'Tu perfil ha sido actualizado correctamente',
        [{ text: 'OK' }]
      );
    } catch (error: any) {
      console.error('Error al actualizar perfil:', error);
      Alert.alert(
        'Error',
        error.message || 'No se pudo actualizar el perfil. Intenta de nuevo.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Formatear fecha de ingreso
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Obtener datos del usuario o empleado
  const displayName = user?.employee_profile?.full_name || user?.full_name || user?.username || 'Usuario';
  const firstName = user?.employee_profile?.name || user?.first_name || '';
  const lastName = user?.employee_profile?.last_name || user?.last_name || '';
  const employeeId = user?.employee_profile?.employee_id || 'N/A';
  const department = user?.employee_profile?.department_name || 'No asignado';
  const location = user?.employee_profile?.location || 'No especificada';
  const hireDate = formatDate(user?.employee_profile?.hire_date);
  const email = user?.email || 'No especificado';

  return (
    <>
      <View style={styles.profileCard}>
        <View style={styles.userInfoHeader}>
          <View style={styles.userInfoLeft}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.userEmail}>{email}</Text>
            <View style={styles.employeeIdContainer}>
              <MaterialCommunityIcons name="badge-account" size={16} color="#0F3460" style={styles.badgeIcon} />
              <Text style={styles.employeeId}>{employeeId}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name="pencil" size={18} color="#0F3460" />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>

        <ProfileInfoItem
          iconName="briefcase-outline"
          label="Departamento"
          value={department}
        />
        <ProfileInfoItem
          iconName="calendar"
          label="Fecha de Ingreso"
          value={hireDate}
        />
        <ProfileInfoItem
          iconName="map-marker"
          label="Ubicación"
          value={location}
        />
      </View>

      <EditProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        userData={{
          firstName: firstName,
          lastName: lastName,
          email: email,
          employeeId: employeeId,
          department: department,
          location: location,
        }}
        isLoading={isLoading}
      />
    </>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EBF0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeIcon: {
    marginRight: 4,
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
