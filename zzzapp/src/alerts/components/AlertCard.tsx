import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AlertCardProps {
  type: 'critico' | 'recomendacion' | 'advertencia';
  title: string;
  description: string;
  timeAgo: string;
  badge?: string;
  isRead?: boolean;
}

const AlertCard: React.FC<AlertCardProps> = ({ type, title, description, timeAgo, badge, isRead = false }) => {
  const getAlertConfig = () => {
    switch (type) {
      case 'critico':
        return {
          backgroundColor: '#FEE2E2',
          borderColor: '#FCA5A5',
          iconName: 'alert',
          iconColor: '#DC2626',
          badgeColor: '#DC2626',
        };
      case 'recomendacion':
        return {
          backgroundColor: '#E0E7FF',
          borderColor: '#C7D2FE',
          iconName: 'lightbulb-on',
          iconColor: '#4F46E5',
          badgeColor: '#4F46E5',
        };
      case 'advertencia':
        return {
          backgroundColor: '#FEF3C7',
          borderColor: '#FDE68A',
          iconName: 'alert-circle',
          iconColor: '#D97706',
          badgeColor: '#D97706',
        };
    }
  };

  const config = getAlertConfig();

  return (
    <View style={[styles.container, { backgroundColor: config.backgroundColor, borderColor: config.borderColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name={config.iconName as any} size={24} color={config.iconColor} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
        {badge && (
          <View style={[styles.badge, { backgroundColor: config.badgeColor }]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>

      <Text style={styles.description}>{description}</Text>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <MaterialCommunityIcons name="clock-outline" size={14} color="#6B7280" />
          <Text style={styles.timeText}>{timeAgo}</Text>
        </View>
        <Text style={[styles.statusText, isRead ? styles.statusRead : styles.statusUnread]}>
          {isRead ? 'Leída' : 'No Leída'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  titleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F3460',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusRead: {
    color: '#10B981',
  },
  statusUnread: {
    color: '#EF4444',
  },
});

export default AlertCard;
