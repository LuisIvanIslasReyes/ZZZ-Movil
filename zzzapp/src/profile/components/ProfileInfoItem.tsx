import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ProfileInfoItemProps {
  iconName: string;
  label: string;
  value: string;
}

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({ iconName, label, value }) => {
  return (
    <View style={styles.infoSection}>
      <View style={styles.infoRow}>
        <MaterialCommunityIcons name={iconName as any} size={20} color="#718096" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F3460',
  },
});

export default ProfileInfoItem;
