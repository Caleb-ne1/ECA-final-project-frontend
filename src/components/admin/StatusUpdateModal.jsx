import React, { useState } from "react";
import { IoIosAlert } from "react-icons/io";

const StatusUpdateModal = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [onClose]);

  return (
    <div className="fixed inset-x-0 top-14  flex justify-end">
      <div className="bg-green-400 p-2 rounded-sm flex flex-row items-center mr-3">
        <IoIosAlert />
        <p className="text-white font-sans font-thin">{message}</p>
      </div>
    </div>
  );
};

export default StatusUpdateModal;