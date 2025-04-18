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
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { Home, UserManagement } from "./Home";
import { UserForm } from "./UserForm";

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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, senha: password }),
      });

      const data = await response.json();
      
      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        console.error("Erro no login", data);
      }
    } catch (error) {
      console.error("Erro na requisição", error);
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Home</h2>
        <button
          onClick={() => navigate("/users")}
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
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
      })
      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setUsers(data);
      } else {
          console.error("Erro ao buscar usuários", data);
      }
    } catch (error) {
        console.error("Erro na requisição", error);
    }
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestão de Usuários</h2>
        <button
          onClick={() => navigate("/users/new")}
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
                  onClick={() => console.log("Deletar usuário", user.id)}
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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function UserForm({ isEditing = false }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(async () => {
        if (isEditing) {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                const data = await response.json();

                if (response.ok && data.nome && data.email) {
                    setName(data.nome);
                    setEmail(data.email);
                } else {
                    console.error("Erro ao buscar usuários", data);
                }
            } catch (error) {
                console.error("Erro na requisição", error);
            }
        }
    }, [id, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing ? `http://localhost:3000/api/users/${id}` : "http://localhost:3000/api/users";
        const method = isEditing ? "PUT" : "POST";

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            navigate("/users");
        } else {
            console.error("Erro ao salvar usuário");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">{isEditing ? "Editar Usuário" : "Novo Usuário"}</h2>
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
                        {isEditing ? "Salvar Alterações" : "Criar Usuário"}
                    </button>
                </form>
            </div>
        </div>
    );
}
```

10. Altere o arquivo **Home.js** na pasta components e insira o seguinte código:
```javascript
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Home</h2>
        <button
          onClick={() => navigate("/users")}
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
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          }
      })
      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setUsers(data);
      } else {
          console.error("Erro ao buscar usuários", data);
      }
  } catch (error) {
      console.error("Erro na requisição", error);
  }
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestão de Usuários</h2>
        <button
          onClick={() => navigate("/users/new")}
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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import { Home, UserManagement } from "./home";
import { UserForm } from "./user-form";

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
# front-clone-professor
# front-clone-professor
