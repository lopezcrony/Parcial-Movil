import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type AuthInputProps = {
  label: string;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  onChangeText: (value: string) => void;
  onTogglePassword?: () => void;
};

export default function AuthInput({
  label,
  value,
  placeholder,
  secureTextEntry = false,
  showPassword = false,
  onChangeText,
  onTogglePassword,
}: AuthInputProps) {
  const Icon = secureTextEntry ? LockKeyhole : Mail;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Icon size={18} color="#64748b" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          secureTextEntry={secureTextEntry && !showPassword}
          autoCapitalize="none"
          style={styles.input}
        />
        {secureTextEntry && onTogglePassword && (
          <Pressable onPress={onTogglePassword} accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
            {showPassword ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  label: { color: '#172033', fontSize: 14, fontWeight: '600' },
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderColor: '#dbe3ed',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    minHeight: 52,
    paddingHorizontal: 14,
  },
  input: { color: '#172033', flex: 1, fontSize: 15, minHeight: 50 },
});
