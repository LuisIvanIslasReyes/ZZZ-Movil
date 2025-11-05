import React, { useState } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Goal, goalsService } from '../services/goalsService';
import { useGoalsRefresh } from '../context/GoalsContext';

interface UpdateProgressModalProps {
  visible: boolean;
  goal: Goal | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const UpdateProgressModal: React.FC<UpdateProgressModalProps> = ({
  visible,
  goal,
  onClose,
  onSuccess,
}) => {
  const [progressValue, setProgressValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { triggerGoalsRefresh } = useGoalsRefresh();

  const handleOpenModal = () => {
    if (goal) {
      setProgressValue(Math.floor(parseFloat(goal.current_progress) || 0).toString());
    }
  };

  React.useEffect(() => {
    if (visible) {
      handleOpenModal();
    }
  }, [visible, goal]);

  const handleUpdateProgress = async () => {
    if (!goal) return;

    const newProgress = parseFloat(progressValue);
    if (isNaN(newProgress) || newProgress < 0) {
      Alert.alert('Error', 'Por favor ingresa un valor válido');
      return;
    }

    try {
      setIsLoading(true);
      await goalsService.updateProgress(goal.id, newProgress);
      
      // Disparar refresco de metas para sincronizar StepsCard
      triggerGoalsRefresh();
      
      Alert.alert('Éxito', 'Progreso actualizado correctamente');
      onSuccess?.();
      onClose();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo actualizar el progreso');
    } finally {
      setIsLoading(false);
    }
  };

  if (!goal) return null;

  const currentValue = parseFloat(goal.current_progress) || 0;
  const targetValue = parseFloat(goal.target) || 0;
  const newProgress = parseFloat(progressValue) || 0;
  const canComplete = newProgress >= targetValue;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Actualizar Progreso</Text>
            <TouchableOpacity onPress={onClose} disabled={isLoading}>
              <MaterialCommunityIcons name="close" size={24} color="#718096" />
            </TouchableOpacity>
          </View>

          {/* Goal Info */}
          <View style={styles.goalInfo}>
            <Text style={styles.goalTitle}>{goal.title}</Text>
            <Text style={styles.goalCategory}>{goal.category_display}</Text>
          </View>

          {/* Current and Target */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Progreso Actual</Text>
              <Text style={styles.statValue}>
                {currentValue.toLocaleString()} {goal.unit}
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Meta</Text>
              <Text style={styles.statValue}>
                {targetValue.toLocaleString()} {goal.unit}
              </Text>
            </View>
          </View>

          {/* Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nuevo Progreso</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ingresa el nuevo valor"
                placeholderTextColor="#A0AEC0"
                value={progressValue}
                onChangeText={setProgressValue}
                keyboardType="decimal-pad"
                editable={!isLoading}
              />
              <Text style={styles.inputUnit}>{goal.unit}</Text>
            </View>
          </View>

          {/* Completion Indicator */}
          {parseFloat(progressValue) >= targetValue && (
            <View style={styles.completionAlert}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
              <Text style={styles.completionText}>¡Meta completada!</Text>
            </View>
          )}

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleUpdateProgress}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.saveButtonText}>Guardar</Text>
              )}
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
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F3460',
  },
  goalInfo: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F3460',
    marginBottom: 4,
  },
  goalCategory: {
    fontSize: 13,
    color: '#718096',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F3460',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F3460',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0F3460',
  },
  inputUnit: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 8,
  },
  completionAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  completionText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F1F5F9',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F3460',
  },
  saveButton: {
    backgroundColor: '#0F3460',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default UpdateProgressModal;
