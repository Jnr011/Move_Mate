import React, { useState, useEffect } from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FormInput from './UI/FormInput';
import Button from './UI/Button';
import { useAuth } from '../context/AuthContext';

const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isLoading, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Retrieve token from session storage
  const token = sessionStorage.getItem('resetToken') || '';

  useEffect(() => {
    // If no token, redirect back to forgot password
    if (!token) {
      navigate('/admin-forgot-password');
    }
  }, [token, navigate]);

  const validateForm = (): boolean => {
    let isValid = true;
    
    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (validateForm()) {
      const result = await resetPassword(token, password);
      
      if (result.success) {
        setIsSuccess(true);
        setMessage({
          type: 'success',
          text: result.message
        });
        
        // Clear session storage values
        sessionStorage.removeItem('resetEmail');
        sessionStorage.removeItem('resetToken');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/admin-login');
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: result.message
        });
      }
    }
  };

  const handleBack = () => {
    navigate('/admin-forgot-password');
  };

  if (isSuccess) {
    return (
      <div className="mt-8 space-y-6 text-center">
        <div className="flex flex-col items-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900">Password Reset Successful!</h3>
          <p className="mt-2 text-gray-600">
            Your password has been reset successfully. You'll be redirected to the login page in a moment.
          </p>
        </div>
        
        <Button
          type="button"
          fullWidth
          onClick={() => navigate('/admin-login')}
        >
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {message && (
        <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'}`}>
          {message.text}
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Reset Your Password</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please create a new password for your account.
        </p>
        
        <FormInput
          id="password"
          name="password"
          type="password"
          label="New Password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          icon={<Lock size={18} />}
        />
        
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm New Password"
          placeholder="••••••••"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          icon={<Lock size={18} />}
        />
      </div>

      <div className="flex flex-col space-y-3">
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Reset Password
        </Button>
        
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={handleBack}
        >
          Back
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;