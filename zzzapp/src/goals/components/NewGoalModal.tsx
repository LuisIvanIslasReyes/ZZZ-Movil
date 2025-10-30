import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface NewGoalModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (goal: { title: string; category: string; target: string; unit: string }) => void;
}

const NewGoalModal: React.FC<NewGoalModalProps> = ({ visible, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [target, setTarget] = useState('');
  const [unit, setUnit] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const categories = [
    { label: 'Actividad Física', value: 'actividad', icon: 'run' },
    { label: 'Hidratación', value: 'hidratacion', icon: 'water' },
    { label: 'Descanso', value: 'descanso', icon: 'sleep' },
    { label: 'Nutrición', value: 'nutricion', icon: 'food-apple' },
    { label: 'Bienestar Mental', value: 'mental', icon: 'brain' },
  ];

  const handleSave = () => {
    if (title && category && target && unit) {
      onSave({ title, category, target, unit });
      // Reset form
      setTitle('');
      setCategory('');
      setTarget('');
      setUnit('');
      onClose();
    }
  };

  const handleCategorySelect = (value: string, label: string) => {
    setCategory(label);
    setShowCategoryPicker(false);
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
              <MaterialCommunityIcons name="target-variant" size={24} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Crear Nueva Meta</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Title */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Título de la meta</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="format-title" size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Ej: Pasos diarios"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Category */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Categoría</Text>
              <TouchableOpacity 
                style={styles.inputWrapper}
                onPress={() => setShowCategoryPicker(!showCategoryPicker)}
              >
                <MaterialCommunityIcons name="shape-outline" size={20} color="#6B7280" style={styles.inputIcon} />
                <Text style={[styles.input, !category && styles.placeholderText]}>
                  {category || 'Selecciona una categoría'}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={20} color="#6B7280" />
              </TouchableOpacity>

              {/* Category Picker */}
              {showCategoryPicker && (
                <View style={styles.categoryPicker}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.value}
                      style={styles.categoryItem}
                      onPress={() => handleCategorySelect(cat.value, cat.label)}
                    >
                      <MaterialCommunityIcons name={cat.icon as any} size={20} color="#0F3460" />
                      <Text style={styles.categoryItemText}>{cat.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Target */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Objetivo</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="target" size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={target}
                  onChangeText={setTarget}
                  placeholder="Ej: 8000"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Unit */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Unidad</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="ruler" size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={unit}
                  onChangeText={setUnit}
                  placeholder="Ej: pasos, horas, litros"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Info Helper */}
            <View style={styles.infoBox}>
              <MaterialCommunityIcons name="information-outline" size={18} color="#0F3460" />
              <Text style={styles.infoText}>
                Define metas alcanzables para mejorar tu salud y bienestar laboral
              </Text>
            </View>
          </ScrollView>

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
                <Text style={styles.saveButtonText}>Crear Meta</Text>
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
    maxHeight: '80%',
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
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0F3460',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  categoryPicker: {
    marginTop: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryItemText: {
    fontSize: 15,
    color: '#0F3460',
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0F4F8',
    borderRadius: 12,
    padding: 16,
    gap: 10,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
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

export default NewGoalModal;
