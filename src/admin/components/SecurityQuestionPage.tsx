import React from 'react';
import { Navigate } from 'react-router-dom';
import SecurityQuestionForm from './SecurityQuestionForm';
import { useAuth } from '../context/AuthContext';

const SecurityQuestionPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  // If user is already logged in, redirect to admin dashboard
  if (currentUser) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mx-auto">
            M
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Security Verification
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Answer your security question to continue resetting your password
          </p>
        </div>
        
        <SecurityQuestionForm />
      </div>
    </div>
  );
};

export default SecurityQuestionPage;