// This file contains dummy admin user data for authentication simulation
// In a real app, this would be replaced with an API call to a secure backend

export interface AdminUser {
  id: string;
  email: string;
  password: string; // In a real app, passwords would never be stored in plain text
  name: string;
  role: 'admin' | 'super_admin' | 'editor';
  avatar?: string;
  lastLogin?: string;
  securityQuestion?: string;
  securityAnswer?: string;
  resetToken?: string;
  resetTokenExpiry?: number;
}

export const dummyAdminUsers: AdminUser[] = [
  {
    id: '1',
    email: 'admin@movemate.com',
    password: 'admin123', // This is just for demo purposes
    name: 'Admin User',
    role: 'admin',
    lastLogin: 'April 28, 2025',
    securityQuestion: 'What was your first car?',
    securityAnswer: 'toyota' // In a real app, this would be hashed
  },
  {
    id: '2',
    email: 'john@movemate.com',
    password: 'john123', // This is just for demo purposes
    name: 'John Smith',
    role: 'super_admin',
    lastLogin: 'April 26, 2025',
    securityQuestion: 'What is your mother\'s maiden name?',
    securityAnswer: 'smith' // In a real app, this would be hashed
  },
  {
    id: '3',
    email: 'sarah@movemate.com',
    password: 'sarah123', // This is just for demo purposes
    name: 'Sarah Johnson',
    role: 'editor',
    lastLogin: 'April 27, 2025',
    securityQuestion: 'In what city were you born?',
    securityAnswer: 'chicago' // In a real app, this would be hashed
  }
];

// Find user by email and password
export const findUserByCredentials = (email: string, password: string): AdminUser | null => {
  return dummyAdminUsers.find(user => user.email === email && user.password === password) || null;
};

// Find user by ID
export const findUserById = (id: string): AdminUser | null => {
  return dummyAdminUsers.find(user => user.id === id) || null;
};

// Find user by email
export const findUserByEmail = (email: string): AdminUser | null => {
  return dummyAdminUsers.find(user => user.email === email) || null;
};

// Find user by reset token
export const findUserByResetToken = (token: string): AdminUser | null => {
  return dummyAdminUsers.find(user => user.resetToken === token && user.resetTokenExpiry && user.resetTokenExpiry > Date.now()) || null;
};

// Generate a reset token for a user
export const generateResetToken = (email: string): string | null => {
  const user = findUserByEmail(email);
  if (!user) return null;
  
  // In a real app, this would be a more secure random token
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const expiryTime = Date.now() + 1000 * 60 * 30; // 30 minutes from now
  
  // Update the user with the token
  user.resetToken = token;
  user.resetTokenExpiry = expiryTime;
  
  return token;
};

// Verify security answer
export const verifySecurityAnswer = (email: string, answer: string): boolean => {
  const user = findUserByEmail(email);
  if (!user || !user.securityAnswer) return false;
  
  // In a real app, the comparison would involve hashing
  return user.securityAnswer.toLowerCase() === answer.toLowerCase();
};

// Reset password with token
export const resetPassword = (token: string, newPassword: string): boolean => {
  const user = findUserByResetToken(token);
  if (!user) return false;
  
  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  
  return true;
};