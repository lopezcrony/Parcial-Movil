import { useState } from 'react';
import { ArrowRight } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AuthInput from './AuthInput';
import { AuthForm } from '../types/auth';

type LoginProps = {
  onSubmit: (form: AuthForm) => void;
  onRegisterPress: () => void;
};

export default function Login({ onSubmit, onRegisterPress }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Qué bueno verte</Text>
        <Text style={styles.title}>Inicia sesión</Text>
        <Text style={styles.subtitle}>Ingresa tus datos para continuar.</Text>
        <View style={styles.form}>
          <AuthInput label="Correo electrónico" value={email} onChangeText={setEmail} placeholder="tu@correo.com" />
          <AuthInput label="Contraseña" value={password} onChangeText={setPassword} placeholder="Mínimo 8 caracteres" secureTextEntry showPassword={showPassword} onTogglePassword={() => setShowPassword((visible) => !visible)} />
          <Pressable style={styles.primaryButton} onPress={() => onSubmit({ email, password })}>
            <Text style={styles.primaryButtonText}>Entrar</Text><ArrowRight size={18} color="#ffffff" />
          </Pressable>
        </View>
        <View style={styles.switchRow}><Text style={styles.muted}>¿Aún no tienes cuenta?</Text><Pressable onPress={onRegisterPress}><Text style={styles.link}>Regístrate</Text></Pressable></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#eef3f8', flex: 1, justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#ffffff', borderRadius: 24, elevation: 4, padding: 24, shadowColor: '#172033', shadowOpacity: 0.1, shadowRadius: 18 },
  eyebrow: { color: '#0f766e', fontSize: 14, fontWeight: '700', marginBottom: 10 },
  title: { color: '#172033', fontSize: 30, fontWeight: '700' },
  subtitle: { color: '#64748b', fontSize: 15, marginTop: 8 },
  form: { gap: 18, marginTop: 28 },
  primaryButton: { alignItems: 'center', backgroundColor: '#0f766e', borderRadius: 12, flexDirection: 'row', gap: 8, justifyContent: 'center', minHeight: 52 },
  primaryButtonText: { color: '#ffffff', fontSize: 15, fontWeight: '700' },
  switchRow: { alignItems: 'center', flexDirection: 'row', gap: 4, justifyContent: 'center', marginTop: 24 },
  muted: { color: '#64748b', fontSize: 14 },
  link: { color: '#0f766e', fontSize: 14, fontWeight: '700' },
});
