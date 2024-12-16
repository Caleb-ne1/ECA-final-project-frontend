import React from "react";

const RegistrationPending = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8  text-center max-w-md">
        <div className="text-yellow-500 text-6xl mb-4">🚧</div>
        <h1 className="text-2xl font-bold mb-2">Registration Pending</h1>
        <p className="text-gray-600 mb-6">
          Your registration is currently under review. Please allow some time
          for our team to process your details. You will be notified via email
          once your account is activated. Thank you for your patience!
        </p>
      </div>
    </div>
  );
};

export default RegistrationPending;