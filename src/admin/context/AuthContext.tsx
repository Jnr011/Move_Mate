import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AdminUser, 
  findUserByCredentials, 
  findUserById, 
  findUserByEmail,
  generateResetToken,
  verifySecurityAnswer,
  resetPassword as resetUserPassword
} from '../data/users';

interface AuthContextType {
  currentUser: AdminUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  // Password reset methods
  initiatePasswordReset: (email: string) => Promise<{ success: boolean, message: string, token?: string }>;
  verifySecurityAnswerFn: (email: string, answer: string) => Promise<{ success: boolean, message: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean, message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUserId = localStorage.getItem('movemateAdminUserId');
    if (storedUserId) {
      const user = findUserById(storedUserId);
      if (user) {
        setCurrentUser(user);
      } else {
        // Invalid stored ID, remove it
        localStorage.removeItem('movemateAdminUserId');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay for a more realistic login experience
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = findUserByCredentials(email, password);
      if (user) {
        setCurrentUser(user);
        // Save user ID to localStorage for persistent login
        localStorage.setItem('movemateAdminUserId', user.id);
        setIsLoading(false);
        return true;
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('movemateAdminUserId');
  };

  const clearError = () => {
    setError(null);
  };

  // Password reset functionality
  const initiatePasswordReset = async (email: string): Promise<{ success: boolean, message: string, token?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = findUserByEmail(email);
      if (!user) {
        setIsLoading(false);
        return {
          success: false,
          message: 'No account found with that email address.'
        };
      }

      if (!user.securityQuestion) {
        setIsLoading(false);
        return {
          success: false,
          message: 'This account does not have a security question set.'
        };
      }

      const resetToken = generateResetToken(email);
      setIsLoading(false);

      if (!resetToken) {
        return {
          success: false,
          message: 'Failed to generate reset token.'
        };
      }

      return {
        success: true,
        message: 'Please answer your security question to continue.',
        token: resetToken
      };
    } catch (err) {
      setIsLoading(false);
      return {
        success: false,
        message: 'An error occurred. Please try again.'
      };
    }
  };

  const verifySecurityAnswerFn = async (email: string, answer: string): Promise<{ success: boolean, message: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const isCorrect = verifySecurityAnswer(email, answer);
      setIsLoading(false);

      if (isCorrect) {
        return {
          success: true,
          message: 'Security answer verified. You may now reset your password.'
        };
      } else {
        return {
          success: false,
          message: 'Incorrect security answer. Please try again.'
        };
      }
    } catch (err) {
      setIsLoading(false);
      return {
        success: false,
        message: 'An error occurred. Please try again.'
      };
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<{ success: boolean, message: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const success = resetUserPassword(token, newPassword);
      setIsLoading(false);

      if (success) {
        return {
          success: true,
          message: 'Password reset successfully. You can now log in with your new password.'
        };
      } else {
        return {
          success: false,
          message: 'Invalid or expired token. Please try resetting your password again.'
        };
      }
    } catch (err) {
      setIsLoading(false);
      return {
        success: false,
        message: 'An error occurred. Please try again.'
      };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isLoading, 
      error, 
      login, 
      logout, 
      clearError,
      initiatePasswordReset,
      verifySecurityAnswerFn,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};