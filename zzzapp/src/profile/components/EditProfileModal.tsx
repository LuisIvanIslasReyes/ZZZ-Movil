import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (firstName: string, lastName: string) => void;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    employeeId: string;
    department: string;
    location: string;
  };
  isLoading?: boolean;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ visible, onClose, onSave, userData, isLoading = false }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Actualizar campos cuando se abre el modal o cambian los datos
  useEffect(() => {
    if (visible) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
    }
  }, [visible, userData.firstName, userData.lastName]);

  const handleSave = () => {
    // Validar que no estén vacíos
    if (!firstName.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }
    if (!lastName.trim()) {
      Alert.alert('Error', 'El apellido es requerido');
      return;
    }

    onSave(firstName.trim(), lastName.trim());
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <LinearGradient
            colors={['#0F3460', '#1e5a8e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <MaterialCommunityIcons name="account-edit" size={24} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Editar Perfil</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Content */}
          <View style={styles.content}>
            {/* First Name - Editable */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nombre</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="account-outline" size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Ingresa tu nombre"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Last Name - Editable */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Apellidos</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="account-outline" size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Ingresa tus apellidos"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Email - Read only */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Correo Electrónico</Text>
              <View style={[styles.inputWrapper, styles.readOnlyInput]}>
                <MaterialCommunityIcons name="email-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <Text style={styles.readOnlyText}>{userData.email}</Text>
                <MaterialCommunityIcons name="lock" size={16} color="#9CA3AF" />
              </View>
            </View>

            {/* Employee ID - Read only */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>ID de Empleado</Text>
              <View style={[styles.inputWrapper, styles.readOnlyInput]}>
                <MaterialCommunityIcons name="badge-account-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <Text style={styles.readOnlyText}>{userData.employeeId}</Text>
                <MaterialCommunityIcons name="lock" size={16} color="#9CA3AF" />
              </View>
            </View>

            {/* Department - Read only */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Departamento</Text>
              <View style={[styles.inputWrapper, styles.readOnlyInput]}>
                <MaterialCommunityIcons name="briefcase-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <Text style={styles.readOnlyText}>{userData.department}</Text>
                <MaterialCommunityIcons name="lock" size={16} color="#9CA3AF" />
              </View>
            </View>

            {/* Location - Read only */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Ubicación</Text>
              <View style={[styles.inputWrapper, styles.readOnlyInput]}>
                <MaterialCommunityIcons name="map-marker" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <Text style={styles.readOnlyText}>{userData.location}</Text>
                <MaterialCommunityIcons name="lock" size={16} color="#9CA3AF" />
              </View>
            </View>
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleSave}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['#0F3460', '#1e5a8e']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saveButtonGradient}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <MaterialCommunityIcons name="check" size={20} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>Guardar</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    height: 50,
  },
  readOnlyInput: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0F3460',
  },
  readOnlyText: {
    flex: 1,
    fontSize: 15,
    color: '#6B7280',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  saveButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default EditProfileModal;
