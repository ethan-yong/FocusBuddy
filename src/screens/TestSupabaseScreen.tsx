import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { authService } from '../services/authService';
import { taskService } from '../services/taskService';
import { useAuth } from '../contexts/AuthContext';

export default function TestSupabaseScreen() {
  const { user, loading } = useAuth();
  const [testing, setTesting] = useState(false);

  const testConnection = async () => {
    setTesting(true);
    try {
      // Test: Fetch tasks
      const tasks = await taskService.getTasks();
      Alert.alert('Success', `Connected! Found ${tasks.length} tasks`);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase Connection Test</Text>
      
      {user ? (
        <>
          <Text style={styles.info}>Logged in as: {user.email}</Text>
          <Button title="Test Connection" onPress={testConnection} disabled={testing} />
          <Button title="Sign Out" onPress={() => authService.signOut()} />
        </>
      ) : (
        <Text style={styles.info}>Not logged in</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
  },
});
