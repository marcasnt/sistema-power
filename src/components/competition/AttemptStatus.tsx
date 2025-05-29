import React from 'react';

interface AttemptStatusProps {
  status: 'preparing' | 'attempting' | 'completed';
  result?: 'white' | 'red';
}

export function AttemptStatus({ status, result }: AttemptStatusProps) {
  const getStatusColor = () => {
    if (status === 'preparing') return 'bg-yellow-500';
    if (status === 'attempting') return 'bg-blue-500';
    if (result === 'white') return 'bg-green-500';
    if (result === 'red') return 'bg-red-500';
    return 'bg-gray-500';
  };

  const getStatusText = () => {
    if (status === 'preparing') return 'Preparándose';
    if (status === 'attempting') return 'En Intento';
    if (result === 'white') return '¡Intento Válido!';
    if (result === 'red') return 'Intento No Válido';
    return 'Esperando';
  };

  return (
    <div className="text-center">
      <div className={`inline-block px-4 py-2 rounded-full ${getStatusColor()} text-white`}>
        {getStatusText()}
      </div>
    </div>
  );
} 