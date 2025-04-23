import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Snackbar({ message, type, duration, onClose }) {
  const [visible, setVisible] = useState(false);

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

  const typeStyles = {
    success: "bg-green-500 text-black",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`fixed top-4 right-1 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg ${typeStyles[type]} transition-opacity duration-300`}
    >
      {message}
    </div>
  );
}
Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};
Snackbar.defaultProps = {
  type: "success",
  duration: 3000,
  onClose: null,
};
export default Snackbar;
