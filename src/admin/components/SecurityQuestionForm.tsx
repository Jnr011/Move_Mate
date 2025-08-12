import React, { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FormInput from './UI/FormInput';
import Button from './UI/Button';
import { useAuth } from '../context/AuthContext';
import { findUserByEmail } from '../data/users';

const SecurityQuestionForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [answer, setAnswer] = useState('');
  const [answerError, setAnswerError] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const { isLoading, verifySecurityAnswerFn } = useAuth();
  const navigate = useNavigate();

  // Retrieve email from session storage
  const email = sessionStorage.getItem('resetEmail') || '';

  useEffect(() => {
    // If no token or email, redirect back to forgot password
    if (!token || !email) {
      navigate('/admin-forgot-password');
      return;
    }

    // Get security question for the email
    const user = findUserByEmail(email);
    if (user && user.securityQuestion) {
      setSecurityQuestion(user.securityQuestion);
    } else {
      // If user not found or no security question, redirect back
      navigate('/admin-forgot-password');
    }
  }, [token, email, navigate]);

  const validateAnswer = (): boolean => {
    if (!answer.trim()) {
      setAnswerError('Security answer is required');
      return false;
    }
    setAnswerError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (validateAnswer()) {
      const result = await verifySecurityAnswerFn(email, answer);
      
      if (result.success) {
        // Store token in session storage
        sessionStorage.setItem('resetToken', token || '');
        // Navigate to reset password page
        navigate('/admin-reset-password');
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

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {message && (
        <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'}`}>
          {message.text}
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Security Verification</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please answer your security question to continue the password reset process.
        </p>
        
        <div className="p-4 bg-blue-50 rounded-md mb-4 flex items-start">
          <HelpCircle className="text-blue-500 mr-2 h-5 w-5 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">Your Security Question</p>
            <p className="text-sm text-blue-700 mt-1">{securityQuestion}</p>
          </div>
        </div>
        
        <FormInput
          id="answer"
          name="answer"
          type="text"
          label="Your Answer"
          placeholder="Enter your answer"
          required
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          error={answerError}
        />
      </div>

      <div className="flex flex-col space-y-3">
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Verify Answer
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
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          For demo: Answer for admin@movemate.com is "toyota"
        </p>
      </div>
    </form>
  );
};

export default SecurityQuestionForm;