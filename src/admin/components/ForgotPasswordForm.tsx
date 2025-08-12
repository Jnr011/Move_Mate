import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FormInput from './UI/FormInput';
import Button from './UI/Button';
import { useAuth } from '../context/AuthContext';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const { isLoading, initiatePasswordReset } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (validateEmail()) {
      const result = await initiatePasswordReset(email);
      
      if (result.success && result.token) {
        // Store email in session storage to pass it to the security question page
        sessionStorage.setItem('resetEmail', email);
        // Navigate to security question page with token
        navigate(`/admin-reset-security?token=${result.token}`);
      } else {
        setMessage({
          type: 'error',
          text: result.message
        });
      }
    }
  };

  const handleBackToLogin = () => {
    navigate('/admin-login');
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {message && (
        <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'}`}>
          {message.text}
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Forgot Password</h3>
        <p className="text-sm text-gray-600 mb-4">
          Enter your email address and we'll help you reset your password.
        </p>
        
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          icon={<Mail size={18} />}
        />
      </div>

      <div className="flex flex-col space-y-3">
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Continue
        </Button>
        
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={handleBackToLogin}
        >
          Back to Login
        </Button>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Demo email: admin@movemate.com
        </p>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;