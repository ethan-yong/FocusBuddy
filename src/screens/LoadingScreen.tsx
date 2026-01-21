import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>LEGO ADVENTURER</Text>
        <ActivityIndicator size="large" color="#4CAF50" style={styles.spinner} />
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB', // Sky blue background
  },
  card: {
    backgroundColor: '#F5E6CC',
    borderRadius: 12,
    borderWidth: 6,
    borderColor: '#8B5A2B',
    padding: 40,
    alignItems: 'center',
    minWidth: 250,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    letterSpacing: 1,
  },
  spinner: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#5D4037',
    marginTop: 10,
  },
});
