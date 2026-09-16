import { AuthForm, AuthResult, AuthUser } from '../types/auth';

export const initialUsers: AuthUser[] = [
  { email: 'demo@example.com', password: 'password123' },
];

export function validateAuthForm({ email, password }: AuthForm): string | null {
  if (!email.trim() || !password) return 'Completa todos los campos.';
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return 'Escribe un correo válido.';
  }
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }
  return null;
}

export function authenticateUser(users: AuthUser[], form: AuthForm): AuthResult {
  const validationError = validateAuthForm(form);
  if (validationError) return { success: false, message: validationError };

  const email = form.email.trim().toLowerCase();
  const user = users.find((currentUser) => currentUser.email === email);

  if (!user) return { success: false, message: 'No encontramos una cuenta con este correo.' };
  if (user.password !== form.password) {
    return { success: false, message: 'La contraseña no coincide con este correo.' };
  }

  return { success: true, message: '¡Inicio de sesión exitoso!' };
}

export function registerUser(users: AuthUser[], form: AuthForm): AuthResult {
  const validationError = validateAuthForm(form);
  if (validationError) return { success: false, message: validationError };

  const email = form.email.trim().toLowerCase();
  if (users.some((user) => user.email === email)) {
    return { success: false, message: 'Este correo ya está registrado. Inicia sesión.' };
  }

  return { success: true, message: '¡Registro exitoso! Ya puedes iniciar sesión.' };
}
