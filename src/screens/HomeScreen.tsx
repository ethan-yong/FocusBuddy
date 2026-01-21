import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';

export default function HomeScreen() {
  const { user } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await authService.signOut();
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Welcome Card */}
      <View style={styles.card}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>WELCOME BACK, ADVENTURER!</Text>
        </View>
        
        <Text style={styles.title}>FocusBuddy</Text>
        <Text style={styles.subtitle}>You're all set!</Text>
        
        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={[styles.studRow, { justifyContent: 'space-around', flexDirection: 'row' }]}>
            {[1,2,3,4].map(i => <View key={i} style={styles.buttonStud} />)}
          </View>
          <Text style={styles.logoutButtonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    padding: 20,
  },
  card: {
    backgroundColor: '#F5E6CC',
    borderRadius: 12,
    borderWidth: 6,
    borderColor: '#8B5A2B',
    padding: 30,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
  },
  banner: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#333',
    marginTop: -50,
    marginBottom: 20,
    borderRadius: 4,
  },
  bannerText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#5D4037',
    marginBottom: 20,
  },
  userInfo: {
    backgroundColor: '#E6D5B8',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8B5A2B',
    padding: 15,
    width: '100%',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 12,
    color: '#8B5A2B',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#5D4037',
  },
  logoutButton: {
    backgroundColor: '#EF5350',
    borderWidth: 3,
    borderColor: '#C62828',
    borderRadius: 8,
    paddingBottom: 8,
    paddingHorizontal: 40,
    marginTop: 10,
  },
  studRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  buttonStud: {
    width: 12,
    height: 6,
    backgroundColor: '#C62828',
    borderRadius: 3,
    marginTop: 2,
  },
  logoutButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
    paddingVertical: 8,
  },
});
