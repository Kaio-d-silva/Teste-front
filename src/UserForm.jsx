import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import api from "./http/api";
import Snackbar from "./Snackbar";

// eslint-disable-next-line react/prop-types
export default function UserForm({ isEditing = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "",
    duration: 0,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (isEditing) {
        try {
          const duration = 10000;
          const response = await api.get(`/users/${id}`);

          const { data, message } = await response;

          if (response.status > 199 && data.nome && data.email) {
            setName(data.nome);
            setEmail(data.email);
            // console.log("deu certo");
          } else {
            setSnackbar({
              message: message || "Erro ao buscar usuarios",
              type: "error",
              duration,
            });
            // console.error("Erro ao buscar usuários", data);
          }
        } catch (error) {
          setSnackbar({
            message: error || "Erro na requisição",
            type: "error",
          });
          // console.error("Erro na requisição", error);
        }
      }
    }
    fetchData();
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing ? `/users/${id}` : "/users";

    const method = isEditing ? "put" : "post";
    const response = await api[method](url, {
      nome: name,
      email,
      senha: password,
    });

    // const response = await fetch(url, {
    //   method,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   body: JSON.stringify({ name, email, password }),
    // });

    if (response.data) {
      setSnackbar({
        message: "Usuario salvo com sucesso",
        type: "success",
        duration: 10000,
      });
      setTimeout(() => {
        navigate("/users");
      }, 10000);
    } else {
      setSnackbar({
        message: "Erro ao salvar usuário",
        type: "error",
        duration: 10000,
      });
      // console.error("Erro ao salvar usuário");
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
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ message: "", type: "" })}
        duration={snackbar.duration}
      />
    </div>
  );
}
UserForm.propTypes = {
  isEditing: PropTypes.bool,
};
UserForm.defaultProps = {
  isEditing: false,
};
