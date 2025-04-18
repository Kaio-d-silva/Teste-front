import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function UserForm({ isEditing = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (isEditing) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/users/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
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
    }
    fetchData();
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:3000/api/users/${id}`
      : "http://localhost:3000/api/users";
    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isEditing ? "Editar Usuário" : "Novo Usuário"}
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
            {isEditing ? "Salvar Alterações" : "Criar Usuário"}
          </button>
        </form>
      </div>
    </div>
  );
}
