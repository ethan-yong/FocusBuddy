import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { authService } from '../services/authService';
import { AuthStackParamList } from '../navigation/AuthNavigator';

const { width } = Dimensions.get('window');

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    // Validation
    if (!displayName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await authService.signUp(email, password, displayName);
      Alert.alert(
        'Success!',
        'Account created successfully! Please check your email to verify your account.',
        [{ text: 'OK' }]
      );
      // Navigation handled automatically by AuthContext
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
      Alert.alert('Signup Error', err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground 
      source={require('../../assets/lego_map_bg.png')} 
      style={styles.container}
    >
      <SafeAreaView style={styles.overlay}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Card */}
          <View style={styles.cardContainer}>
            {/* Header Banner */}
            <View style={styles.banner}>
              <Text style={styles.bannerText}>JOIN THE ADVENTURE!</Text>
            </View>

            {/* Character Avatar */}
            <View style={styles.avatarContainer}>
              <Image 
                source={require('../../assets/lego_adventurer.png')} 
                style={styles.avatar} 
                resizeMode="contain"
              />
            </View>

            {/* Error Message */}
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Form Fields */}
            <View style={styles.form}>
              {/* Display Name Input */}
              <View style={styles.inputWrapper}>
                <View style={styles.studRow}>
                  <View style={styles.stud} /><View style={styles.stud} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Display Name"
                  value={displayName}
                  onChangeText={setDisplayName}
                  editable={!loading}
                />
                <View style={styles.studRow}>
                  <View style={styles.stud} /><View style={styles.stud} />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputWrapper}>
                <View style={styles.studRow}>
                  <View style={styles.stud} /><View style={styles.stud} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!loading}
                />
                <View style={styles.studRow}>
                  <View style={styles.stud} /><View style={styles.stud} />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputWrapper}>
                <View style={styles.studRow}>
                  <View style={styles.stud} /><View style={styles.stud} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password (min 6 characters)"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  editable={!loading}
                />
                <View style={styles.studRow}>
                  <View style={styles.stud} /><View style={styles.stud} />
                </View>
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputWrapper}>
                <View style={styles.studRow}>
                  <View style={styles.stud} /><View style={styles.stud} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  editable={!loading}
                />
                <View style={styles.studRow}>
                  <View style={styles.stud} /><View style={styles.stud} />
                </View>
              </View>

              {/* Blue Signup Button */}
              <TouchableOpacity 
                style={[styles.signupButton, loading && styles.disabledButton]}
                onPress={handleSignup}
                disabled={loading}
              >
                <View style={[styles.studRow, { justifyContent: 'space-around', flexDirection: 'row' }]}>
                  {[1,2,3,4,5,6].map(i => <View key={i} style={styles.buttonStud} />)}
                </View>
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.signupButtonText}>CREATE ACCOUNT</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Footer Links */}
            <View style={styles.footer}>
              <TouchableOpacity onPress={handleBackToLogin}>
                <Text style={styles.footerLink}>← Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  cardContainer: {
    width: width * 0.85,
    backgroundColor: '#F5E6CC', // Parchment color
    borderRadius: 12,
    borderWidth: 6,
    borderColor: '#8B5A2B', // Dark wood border
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  banner: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#333',
    marginTop: -40,
    borderRadius: 4,
  },
  bannerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  avatarContainer: {
    height: 100,
    width: 100,
    marginVertical: 15,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: '#EF5350',
  },
  errorText: {
    color: '#C62828',
    textAlign: 'center',
    fontSize: 12,
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    backgroundColor: '#E6D5B8',
    borderWidth: 2,
    borderColor: '#8B5A2B',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  studRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  stud: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C4B18C',
    marginVertical: 4,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#5D4037',
  },
  signupButton: {
    backgroundColor: '#2196F3', // LEGO Blue
    borderWidth: 3,
    borderColor: '#1565C0',
    borderRadius: 8,
    paddingBottom: 10,
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonStud: {
    width: 12,
    height: 6,
    backgroundColor: '#1565C0',
    borderRadius: 3,
    marginTop: 2,
  },
  signupButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
    paddingVertical: 10,
  },
  footer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  footerLink: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#5D4037',
    fontWeight: '600',
  },
});

export default SignupScreen;
