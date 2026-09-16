import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View } from 'react-native';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import { authenticateUser, initialUsers, registerUser } from './data/auth';
import { AuthForm, AuthUser } from './types/auth';

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<AuthUser[]>(initialUsers);

  const handleSubmit = (form: AuthForm) => {
    const result = isLogin ? authenticateUser(users, form) : registerUser(users, form);
    if (!result.success) {
      Alert.alert('Revisa tus datos', result.message);
      return;
    }

    if (isLogin) {
      setIsAuthenticated(true);
    } else {
      setUsers((currentUsers) => [...currentUsers, { email: form.email.trim().toLowerCase(), password: form.password }]);
      Alert.alert('Registro exitoso', result.message, [{ text: 'Iniciar sesión', onPress: () => setIsLogin(true) }]);
    }
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? <Home /> : isLogin ? <Login onSubmit={handleSubmit} onRegisterPress={() => setIsLogin(false)} /> : <Register onSubmit={handleSubmit} onLoginPress={() => setIsLogin(true)} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
