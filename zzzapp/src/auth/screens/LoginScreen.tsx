import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Aquí irá la lógica de autenticación con la BD
    // Por ahora solo llama a onLogin para cambiar el estado
    onLogin();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#0F3460', '#1e5a8e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="heart-pulse" size={64} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>Zero to Zero-Fatigue Zone</Text>
          <Text style={styles.headerSubtitle}>Bienvenido</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Iniciar Sesión</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Correo Electrónico</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="email-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="correo@ejemplo.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="lock-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <MaterialCommunityIcons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#6B7280" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <LinearGradient
              colors={['#0F3460', '#1e5a8e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButtonGradient}
            >
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o continúa con</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Biometric Login */}
          <TouchableOpacity style={styles.biometricButton} onPress={handleLogin}>
            <MaterialCommunityIcons name="fingerprint" size={24} color="#0F3460" />
            <Text style={styles.biometricText}>Autenticación Biométrica</Text>
          </TouchableOpacity>

          {/* Help Section */}
          <View style={styles.helpSection}>
            <MaterialCommunityIcons name="information-outline" size={18} color="#6B7280" />
            <Text style={styles.helpText}>
              ¿Problemas para acceder? Contacta al administrador del sistema
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EBF0',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#B8D4E8',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F3460',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: '#0F3460',
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F3460',
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  loginButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 13,
    color: '#6B7280',
    marginHorizontal: 12,
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 14,
    marginBottom: 24,
    gap: 10,
  },
  biometricText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F3460',
  },
  helpSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0F4F8',
    borderRadius: 12,
    padding: 16,
    gap: 10,
    marginBottom: 20,
  },
  helpText: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
});

export default LoginScreen;
