import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HelpSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="lightbulb-on" size={18} color="#FFFFFF" />
        </View>
        <Text style={styles.question}>¿Qué significa esto?</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>
          <Text style={styles.bold}>HRV (Variabilidad FC):</Text> Mide qué tan bien se recupera tu cuerpo del estrés. Valores más altos indican mejor estado de recuperación.
          <Text style={styles.bold}> RMSSD {'>'} 40ms</Text> es considerado bueno para trabajadores industriales.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F4F8',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F3460',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  question: {
    fontSize: 14,
    color: '#0F3460',
    fontWeight: '700',
    flex: 1,
  },
  content: {
    paddingLeft: 42,
  },
  description: {
    fontSize: 13,
    color: '#4A5568',
    lineHeight: 20,
  },
  bold: {
    fontWeight: '700',
    color: '#0F3460',
  },
});

export default HelpSection;
