import React from "react";

const RegistrationPending = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-2xl p-8 max-w-md w-full text-center transform transition-all duration-300">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100 p-5 rounded-full animate-pulse">
            <div className="text-yellow-500 text-5xl">⏳</div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Registration Pending
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your registration is currently under review. Please allow some time
          for our team to process your details. You'll receive a notification
          email once your account is activated.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-blue-600 font-medium">
            Thank you for your patience!
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Need help? <a href="mailto:kibetcaleb@zetech.ac.ke" className="text-blue-600 hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPending;