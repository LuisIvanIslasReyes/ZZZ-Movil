import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NotificationSettings: React.FC = () => {
  const [fatigueAlerts, setFatigueAlerts] = useState(true);
  const [iaRecommendations, setIaRecommendations] = useState(true);
  const [goalsReminders, setGoalsReminders] = useState(false);
  const [dataSync, setDataSync] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="bell-outline" size={20} color="#0F3460" />
        <Text style={styles.title}>Notificaciones</Text>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Alertas de Fatiga</Text>
          <Text style={styles.settingDescription}>Recibir alertas cuando se detecte fatiga</Text>
        </View>
        <Switch
          value={fatigueAlerts}
          onValueChange={setFatigueAlerts}
          trackColor={{ false: '#D1D5DB', true: '#0F3460' }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Recomendaciones de IA</Text>
          <Text style={styles.settingDescription}>Sugerencias personalizadas para tu bienestar</Text>
        </View>
        <Switch
          value={iaRecommendations}
          onValueChange={setIaRecommendations}
          trackColor={{ false: '#D1D5DB', true: '#0F3460' }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Recordatorios de Metas</Text>
          <Text style={styles.settingDescription}>Notificaciones sobre progreso de objetivos</Text>
        </View>
        <Switch
          value={goalsReminders}
          onValueChange={setGoalsReminders}
          trackColor={{ false: '#D1D5DB', true: '#0F3460' }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Sincronización de Datos</Text>
          <Text style={styles.settingDescription}>Confirmaciones de sincronización con el dispositivo</Text>
        </View>
        <Switch
          value={dataSync}
          onValueChange={setDataSync}
          trackColor={{ false: '#D1D5DB', true: '#0F3460' }}
          thumbColor="#FFFFFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F3460',
    marginLeft: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F3460',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
});

export default NotificationSettings;
