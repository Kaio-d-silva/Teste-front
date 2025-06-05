# front-end-comum-pi-senac

Este é um projeto que pode ser usado como base para os Projetos Integradores das turmas do Voucher Desenvolvedor do SENAC MS

## Iniciar uma aplicação React com create-react-app

1. Certifique-se de que você tem o node e o npm instalados em sua máquina versão mínima 16:

```bash
npm --version
node --version
```

2. Usando a ferramenta create-react-app:

```bash
npx create-react-app front-end-comum-pi-senac
```

3. Adicione a biblioteca do react-router-dom para usar rotas em seu projeto:

```bash
npm install react-router react-router-dom
```

4. Execute o seguinte comando para inicializar o tailwind:

```bash
npx tailwindcss init -p
```

5. Altere o arquivo **tailwind.config.js** e insira o seguinte código:

```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

6. Adicione no inicio do arquivo **index.css** o seguinte código:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

7. Em seguida altere o arquivo **App.js** e insira o seguinte código:

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import { Home, UserManagement } from './Home';
import { UserForm } from './UserForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm isEditing />} />
      </Routes>
    </Router>
  );
}

export default App;
```

8. Crie o arquivo **Login.js** na pasta components e insira o seguinte código:

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, senha: password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        console.error('Erro no login', data);
      }
    } catch (error) {
      console.error('Erro na requisição', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={login}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-all duration-300"
        >
          Logar
        </button>
      </div>
    </div>
  );
}
```

9. Crie o arquivo **Home.js** na pasta components e insira o seguinte código:

```javascript
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Home</h2>
        <button
          onClick={() => navigate('/users')}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-all duration-300"
        >
          Usuários
        </button>
      </div>
    </div>
  );
}

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Erro ao buscar usuários', data);
      }
    } catch (error) {
      console.error('Erro na requisição', error);
    }
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestão de Usuários</h2>
        <button
          onClick={() => navigate('/users/new')}
          className="bg-green-500 text-white p-2 rounded flex items-center hover:bg-green-600"
        >
          <span className="mr-2">+</span> Novo
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nome</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.nome}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => console.log('Deletar usuário', user.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

10. Crie o arquivo **UserForm.js** na pasta components e insira o seguinte código:

```javascript
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function UserForm({ isEditing = false }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(async () => {
    if (isEditing) {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();

        if (response.ok && data.nome && data.email) {
          setName(data.nome);
          setEmail(data.email);
        } else {
          console.error('Erro ao buscar usuários', data);
        }
      } catch (error) {
        console.error('Erro na requisição', error);
      }
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:3000/api/users/${id}`
      : 'http://localhost:3000/api/users';
    const method = isEditing ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      navigate('/users');
    } else {
      console.error('Erro ao salvar usuário');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-3 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-3 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border rounded"
            required={!isEditing}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Salvar Alterações' : 'Criar Usuário'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

10. Altere o arquivo **Home.js** na pasta components e insira o seguinte código:

```javascript
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Home</h2>
        <button
          onClick={() => navigate('/users')}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-all duration-300"
        >
          Usuários
        </button>
      </div>
    </div>
  );
}

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Erro ao buscar usuários', data);
      }
    } catch (error) {
      console.error('Erro na requisição', error);
    }
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestão de Usuários</h2>
        <button
          onClick={() => navigate('/users/new')}
          className="bg-green-500 text-white p-2 rounded flex items-center hover:bg-green-600"
        >
          <span className="mr-2">+</span> Novo
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nome</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.nome}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => navigate(`/users/delete/${user.id}`)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

11. Altere o arquivo **App.js** na pasta components e insira o seguinte código:

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import { Home, UserManagement } from './home';
import { UserForm } from './user-form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm isEditing />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## Habilitar eslint e prettier em um projeto criado com create-react-app

1. Execute o seguinte comando:

```bash
npx install --save-dev eslint-config-airbnb --legacy-peer-deps
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

2. Crie o arquivo **.eslintrc.json** e insira o seguinte código:

```json
{
  "extends": ["react-app", "airbnb", "plugin:prettier/recommended"],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ]
  }
}
```

3. Crie o arquivo **.prettierrc.json** e insira o seguinte código:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true
}
```

4. Adicione os seguintes scripts no seu arquivo **package.json**:

```json
{
  ...
  "scripts": {
    "lint": "eslint 'src/**/*.{js,jsx}'",
    "format": "prettier --write 'src/**/*.{js,jsx,json,css,scss,md}'"
  }
  ...
}
```

5. Para executar o ESLint e o Prettier:

```bash
npm run lint
```

6. Para formatar o código com Prettier, execute:

```bash
npm run format
```

7. \*\*Crie uma pasta .vscode na raiz do projeto e nessa pasta crie os seguites arquivos:

- extensions.json
- launch.json
- settings.json
- tasks.json

8. **Habilite o ESLint e o Prettier no VS Code**:
   Certifique-se de que as extensões do ESLint e Prettier estão instaladas no VS Code. Adicione as seguintes configurações no arquivo `settings.json` do VS Code:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

9. Abra o arquivo `launch.json` e insira o seguinte código:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

10. Abra o arquivo `tasks.json` e insira o seguinte código:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run ESLint",
      "type": "shell",
      "command": "npm run lint",
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "Run Prettier",
      "type": "shell",
      "command": "npm run format",
      "group": {
        "kind": "build",
        "isDefault": false
      }
    }
  ]
}
```

11. Abra o arquivo `extensions.json` e insira o seguinte código:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag",
    "formulahendry.auto-close-tag"
  ]
}
```

## Adicionar o Axios ao projeto

**Motivação**:
O axios é uma biblioteca muito usada para requisições http, no nosso projeto queremos interceptar \n
tanto as requisições quanto as respostas da API, caso continuássemos com o fetch api precisaríamos criar métodos \n
de interceptação que já estão presentes na biblioteca do axios, dessa forma optamos por esse caminho.

1. Execute o seguinte comando para instalar a biblioteca do axios:

```bash
npm install axios
```

2. Crie uma pasta como o nome **http** e dentro dela crie um arquivo como o nome **api.js** e escreva o seguinte código:

```javascript
import axios from 'axios';

// Cria uma instância do axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Substitua pela URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador de requisição
api.interceptors.request.use(
  (config) => {
    // Adiciona o token Bearer ao header Authorization
    const token = localStorage.getItem('token'); // Substitua pela lógica de onde o token está armazenado
    if (token) {
      const updatedConfig = { ...config };
      updatedConfig.headers.Authorization = `Bearer ${token}`;
      return updatedConfig;
    }
    return config;
  },
  (error) => {
    // Lida com erros na configuração da requisição
    return Promise.reject(error);
  },
);

// Interceptador de resposta
api.interceptors.response.use(
  (response) => {
    // Retorna o status code e a mensagem para respostas bem-sucedidas
    return {
      status: response.status,
      message: response.data?.message || 'Success',
      data: response.data,
    };
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      const { status } = error.response;

      // Caso o status seja 401 e o token tenha sido enviado
      if (status === 401 && originalRequest.headers.Authorization) {
        try {
          // Redireciona para o endpoint de refresh-token
          const refreshResponse = await api.post('/refresh-token', {
            token: localStorage.getItem('refreshToken'), // Substitua pela lógica do refresh token
          });

          // Atualiza o token e refaz a requisição original
          const newToken = refreshResponse.data.token;
          localStorage.setItem('token', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Caso o refresh falhe, redirecione para login
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // Caso o status seja 403
      if (status === 403) {
        alert('Você não possui acesso a esta tela.');
        window.history.back(); // Redireciona para a última tela visitada
        const errorAcessoNegado = new Error('Acesso negado.');
        errorAcessoNegado.status = status;
        return Promise.reject(errorAcessoNegado);
      }

      // Para outros erros acima de 399
      if (status >= 400) {
        return Promise.reject(
          new Error(
            JSON.stringify({
              status,
              message: error.response.data?.message || 'Erro desconhecido.',
            }),
          ),
        );
      }
    }

    // Lida com erros sem resposta (ex.: problemas de rede)
    return Promise.reject(
      new Error(
        JSON.stringify({
          status: 0,
          message: 'Erro de conexão.',
        }),
      ),
    );
  },
);

export default api;
```

### Bônus componente Snackbar usando React com Tailwind:

1. Crie em **src** uma pasta chamada **components** e nessa pasta crie o arquivo **Snackbar.js** e insira o seguinte código:

```javascript
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

export default function Snackbar({
  message,
  type = 'success',
  duration = 3000,
  onClose,
}) {
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
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg ${typeStyles[type]} transition-opacity duration-300`}
    >
      {message}
    </div>
  );
}
```

2. Para testar o **Snackbar** e o **api.js** que agora usa o axios para nossas requisições HTTP faça as seguintes mudanças no **Login.js**:

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './http/api';
import Snackbar from './components/Snackbar';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await api.post('/login', {
        email: username,
        senha: password,
      });
      const { data, status } = response;

      if (status > 199 && status <= 299 && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        navigate('/home');
      } else {
        setSnackbar({
          message: 'Erro no login. Verifique suas credenciais.',
          type: 'error',
        });
      }
    } catch (error) {
      setSnackbar({
        message: 'Erro na requisição. Tente novamente mais tarde.',
        type: 'error',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={login}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-all duration-300"
        >
          Logar
        </button>
      </div>
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ message: '', type: '' })}
      />
    </div>
  );
}
```

3. Use essas mudança da requisição para alterar todas as outras requisições HTTP do projeto.

## Usar o prop-types

1. Execute o seguinte comando para instalar o **prop-types**:

```bash
npm install prop-types
```

2. Modifique o arquivo **Snackbar.js** para aplicar o prop-types:

```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Snackbar({ message, type = 'success', duration = 3000, onClose }) {
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
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
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
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};
Snackbar.defaultProps = {
  type: 'success',
  duration: 3000,
  onClose: null,
};
export default Snackbar;
```

## Adicionar Typescript ao projeto:

1. Execute o seguinte comando para instalar as bibliotecas necessárias:

```bash
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser @types/axios @types/node @types/react @types/react-dom
npm install typescript
```

2. Edite o arquivo **.eslintrc.json** para o seguinte código:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["react", "@typescript-eslint"],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    // Adicione ou ajuste regras conforme necessário
    "react/prop-types": "off", // Desative se estiver usando TypeScript para tipagem de props
    "@typescript-eslint/no-unused-vars": ["error"]
  }
}
```

3. Crie o arquivo **react-app--env.d.ts** na raiz do projeto e insira o seguinte código:

```typescript
/// <reference types="react-scripts" />
```

4. Crie o arquivo **tsconfig.json** e adicione o seguinte código:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": ["src"]
}
```

## Proteger Rotas do Front-End

1. Crie um arquivo com o nome de **ProtectedRoute.tsx** e insira o seguinte código:

```typescript
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Função para verificar se o token é válido
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
    const isExpired = payload.exp * 1000 < Date.now(); // Verifica se o token expirou
    if (isExpired) {
      localStorage.removeItem('token'); // Remove o token expirado
      return false;
    }
    return true;
  } catch (error) {
    return false; // Token inválido
  }
};

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
```

2. Altere o arquivo **App.tsx** para o seguinte código:

```typescript
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import ProtectedRoute from '../ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rota de login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
        </Route>

        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

```

## Criação de Layouts

1. Execute o seguinte comando para instalar o **react-icons/fi**:

```bash
npm install react-icons --legacy-peer-deps
```

2. Crie uma pasta **layout** dentro da pasta **src**.

3. Na pasta layout que você acabou de criar crie o arquivo **RestrictedLayout** e insira o seguinte código:

```javascript
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiHome, FiUser, FiSettings, FiMenu } from 'react-icons/fi';

const RestrictedLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { path: '/home', label: 'Home', icon: <FiHome /> },
    { path: '/profile', label: 'Profile', icon: <FiUser /> },
    { path: '/settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-blue-600 text-white transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          <span
            className={`${isSidebarOpen ? 'block' : 'hidden'} text-lg font-bold`}
          >
            Meu Sistema
          </span>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <FiMenu size={24} />
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 hover:bg-blue-500 transition-colors ${
                  isActive ? 'bg-blue-700' : ''
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Área Restrita</h1>
          <button
            onClick={toggleSidebar}
            className="text-blue-600 focus:outline-none md:hidden"
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RestrictedLayout;
```

4. Altere o arquivo **App.tsx** para:

```javascript
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import UserManagement from './UserManagement';
import UserForm from './UserForm';
import ProtectedRoute from '../ProtectedRoute';
import RestrictedLayout from '../layout/RestrictedLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota de login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RestrictedLayout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm isEditing />} />
          </Route>
        </Route>

        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## Criando componente Sidebar

1. Crie na pasta layout um arquivo com o nome **Sidebar.tsx** e insira o seguinte código:

```javascript
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  menuItems: { path: string; label: string; icon: React.ReactNode }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  menuItems,
}) => {
  return (
    <div
      className={`${
        isSidebarOpen ? 'w-64' : 'w-16'
      } bg-blue-600 text-white transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        <span
          className={`${isSidebarOpen ? 'block' : 'hidden'} text-lg font-bold`}
        >
          Meu Sistema
        </span>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <FiMenu size={24} />
        </button>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 hover:bg-blue-500 transition-colors ${
                isActive ? 'bg-blue-700' : ''
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
```

2. Altere o arquivo **RestrictedLayout.tsx** para o seguinte código:

```javascript
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FiHome, FiUser, FiSettings, FiMenu } from 'react-icons/fi';
import { Outlet } from 'react-router';

const RestrictedLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { path: '/home', label: 'Home', icon: <FiHome /> },
    { path: '/profile', label: 'Profile', icon: <FiUser /> },
    { path: '/settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={menuItems}
      />
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Área Restrita</h1>
          <button
            onClick={toggleSidebar}
            className="text-blue-600 focus:outline-none md:hidden"
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RestrictedLayout;
```
