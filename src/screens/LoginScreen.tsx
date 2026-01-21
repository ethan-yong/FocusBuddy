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
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { authService } from '../services/authService';
import { AuthStackParamList } from '../navigation/AuthNavigator';

const { width } = Dimensions.get('window');

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await authService.signIn(email, password);
      // Navigation handled automatically by AuthContext
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
      Alert.alert('Login Error', err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    Alert.alert(
      'Google OAuth',
      'Google OAuth requires additional Expo configuration. For now, please use email/password login.',
      [{ text: 'OK' }]
    );
    // Future implementation:
    // try {
    //   await authService.signInWithGoogle();
    // } catch (err: any) {
    //   Alert.alert('Error', err.message);
    // }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality coming soon!');
  };

  const handleCreateAccount = () => {
    navigation.navigate('Signup');
  };

  return (
    <ImageBackground 
      source={require('../../assets/lego_map_bg.png')} 
      style={styles.container}
    >
      <SafeAreaView style={styles.overlay}>
        {/* Main Card */}
        <View style={styles.cardContainer}>
          {/* Header Banner */}
          <View style={styles.banner}>
            <Text style={styles.bannerText}>WELCOME, LEGO ADVENTURER!</Text>
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
            {/* Email Input with Studs */}
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
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
              <View style={styles.studRow}>
                <View style={styles.stud} /><View style={styles.stud} />
              </View>
            </View>

            {/* Green Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, loading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={loading}
            >
              <View style={[styles.studRow, { justifyContent: 'space-around', flexDirection: 'row' }]}>
                {[1,2,3,4,5,6].map(i => <View key={i} style={styles.buttonStud} />)}
              </View>
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>LOGIN</Text>
              )}
            </TouchableOpacity>

            {/* Google Login Button */}
            <TouchableOpacity 
              style={[styles.googleButton, loading && styles.disabledButton]}
              onPress={handleGoogleLogin}
              disabled={loading}
            >
              <Image source={require('../../assets/google_icon.png')} style={styles.socialIcon} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Links */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.footerLink}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.footerLink}>Create New Account</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
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
    height: 120,
    width: 120,
    marginVertical: 20,
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
    marginBottom: 15,
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
  loginButton: {
    backgroundColor: '#4CAF50', // LEGO Green
    borderWidth: 3,
    borderColor: '#2E7D32',
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
    backgroundColor: '#388E3C',
    borderRadius: 3,
    marginTop: 2,
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
    paddingVertical: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5A2B',
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
  },
  googleButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  footerLink: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: '#5D4037',
  },
});

export default LoginScreen;
