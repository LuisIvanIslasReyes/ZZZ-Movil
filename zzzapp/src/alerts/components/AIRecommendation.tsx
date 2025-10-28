import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AIRecommendation: React.FC = () => {
  return (
    <LinearGradient
      colors={['#1e3a5f', '#0F3460']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="robot" size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>Recomendación Personalizada de IA</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Basado en tu patrón de fatiga de las últimas 3 horas, te recomendamos:
      </Text>

      {/* Recommendations List */}
      <View style={styles.recommendationsList}>
        <View style={styles.recommendationItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.recommendationText}>
            Tomar un descanso de 10 minutos en los próximos 30 minutos
          </Text>
        </View>

        <View style={styles.recommendationItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.recommendationText}>
            Realizar ejercicios de respiración profunda
          </Text>
        </View>

        <View style={styles.recommendationItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.recommendationText}>
            Hidratarte con al menos 200ml de agua
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#B8D4E8',
    lineHeight: 20,
    marginBottom: 16,
  },
  recommendationsList: {
    gap: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    marginRight: 10,
    marginTop: 2,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
});

export default AIRecommendation;
