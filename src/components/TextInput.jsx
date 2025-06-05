import React from 'react';
import PropTypes from 'prop-types';

export default function TextInput({
  label,
  type = 'text',
  value,
  onChange,
  error = '',
  className = '',
  ...props
}) {
  const inputId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`absolute left-0 transition-all duration-200 
            ${value ? '-top-4 text-blue-500 text-xs' : 'top-2 text-gray-400 text-sm'}
            ${error ? 'text-red-500' : ''}`}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" " // Placeholder vazio para ativar o comportamento do label flutuante
        className={`peer w-full border-b-2 bg-transparent px-0 py-2 focus:outline-none focus:ring-0 
          ${error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string, // Rótulo do campo
  type: PropTypes.string, // Tipo do input (ex.: text, email, password)
  value: PropTypes.string.isRequired, // Valor do input
  onChange: PropTypes.func.isRequired, // Função chamada ao alterar o valor
  placeholder: PropTypes.string, // Placeholder do input
  error: PropTypes.string, // Mensagem de erro
  className: PropTypes.string, // Classes adicionais para estilização
};

TextInput.defaultProps = {
  label: '', // Valor padrão para o rótulo
  type: 'text', // Valor padrão para o tipo
  placeholder: '', // Valor padrão para o placeholder
  error: '', // Valor padrão para a mensagem de erro
  className: '', // Valor padrão para classes adicionais
};
