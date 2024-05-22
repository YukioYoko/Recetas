import React from 'react';

const AlertComponent = ({ type, message }) => {
  const alertStyles = {
    success: 'bg-green-500 text-white p-4 rounded mb-4',
    error: 'bg-red-500 text-white p-4 rounded mb-4'
  };

  return (
    <div className={alertStyles[type]}>
      {message}
    </div>
  );
};

export default AlertComponent;
