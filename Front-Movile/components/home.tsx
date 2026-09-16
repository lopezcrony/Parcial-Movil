import { CheckCircle2 } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.icon}><CheckCircle2 size={42} color="#0f766e" /></View>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.message}>Has iniciado sesión correctamente. Qué bueno verte por aquí.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: '#eef3f8', flex: 1, justifyContent: 'center', padding: 24 },
  icon: { alignItems: 'center', backgroundColor: '#ccfbf1', borderRadius: 32, justifyContent: 'center', marginBottom: 20, padding: 18 },
  title: { color: '#172033', fontSize: 32, fontWeight: '700' },
  message: { color: '#64748b', fontSize: 16, lineHeight: 24, marginTop: 10, maxWidth: 320, textAlign: 'center' },
});
