import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import UserInfoCard from '../components/UserInfoCard';
import NotificationSettings from '../components/NotificationSettings';
import AccountActions from '../components/AccountActions';

const ProfileScreen: React.FC = () => {
  return (
    <ScrollView 
      style={styles.container}
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader />
      <UserInfoCard />
      <NotificationSettings />
      <AccountActions />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EBF0',
  },
});

export default ProfileScreen;
