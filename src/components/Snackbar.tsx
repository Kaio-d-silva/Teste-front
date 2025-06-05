/* eslint-disable react/require-default-props */
import * as React from 'react';
import { useState, useEffect, JSX } from 'react';

interface SnackbarProps {
  message: string; // Mensagem a ser exibida no Snackbar
  type?: 'success' | 'error' | 'warning' | 'info'; // Tipo do Snackbar
  duration?: number; // Duração em milissegundos
  onClose?: () => void; // Função chamada ao fechar o Snackbar
}

function Snackbar({
  message,
  type = 'success', // Tipo do Snackbar
  duration = 10000, // Valor padrão
  onClose = undefined, // Valor padrão
}: SnackbarProps): JSX.Element | null {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      // Oculta o snackbar após o tempo definido
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [message, duration, onClose]);

  if (!visible) return null;

  const typeStyles: Record<string, string> = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg ${typeStyles[type]} transition-opacity duration-300`}
    >
      {message}
    </div>
  );
}

// Removed defaultProps as default values are already set in the function parameters

export default Snackbar;
