import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ visible, onClose, onSave }) => {
  const [name, setName] = useState('Carlos Rodríguez');

  const handleSave = () => {
    onSave(name);
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
            {/* Name - Editable */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nombre Completo</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="account-outline" size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Ingresa tu nombre"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Email - Read only */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Correo Electrónico</Text>
              <View style={[styles.inputWrapper, styles.readOnlyInput]}>
                <MaterialCommunityIcons name="email-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <Text style={styles.readOnlyText}>carlos.rodriguez@empresa.com</Text>
                <MaterialCommunityIcons name="lock" size={16} color="#9CA3AF" />
              </View>
            </View>

            {/* Employee ID - Read only */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>ID de Usuario</Text>
              <View style={[styles.inputWrapper, styles.readOnlyInput]}>
                <MaterialCommunityIcons name="badge-account-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <Text style={styles.readOnlyText}>EMP001234</Text>
                <MaterialCommunityIcons name="lock" size={16} color="#9CA3AF" />
              </View>
            </View>

            {/* Department - Read only */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Departamento</Text>
              <View style={[styles.inputWrapper, styles.readOnlyInput]}>
                <MaterialCommunityIcons name="briefcase-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <Text style={styles.readOnlyText}>Operaciones - Turno Mañana</Text>
                <MaterialCommunityIcons name="lock" size={16} color="#9CA3AF" />
              </View>
            </View>

            {/* Location - Read only */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Ubicación</Text>
              <View style={[styles.inputWrapper, styles.readOnlyInput]}>
                <MaterialCommunityIcons name="map-marker" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <Text style={styles.readOnlyText}>Planta Industrial Norte</Text>
                <MaterialCommunityIcons name="lock" size={16} color="#9CA3AF" />
              </View>
            </View>
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <LinearGradient
                colors={['#0F3460', '#1e5a8e']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saveButtonGradient}
              >
                <MaterialCommunityIcons name="check" size={20} color="#FFFFFF" />
                <Text style={styles.saveButtonText}>Guardar</Text>
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
