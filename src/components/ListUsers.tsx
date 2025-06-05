import React from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

interface ListUsersProps {
  users: User[];
}

const ListUsers: React.FC<ListUsersProps> = ({ users }) => {
  const navigate = useNavigate();
  return (
    <>
      {users.map((user: User) => (
        <tbody key={user.id}>
          <tr key={user.id} className="text-center">
            <td className="border border-gray-300 p-2">{user.id}</td>
            <td className="border border-gray-300 p-2">{user.nome}</td>
            <td className="border border-gray-300 p-2">{user.email}</td>
            <td className="border border-gray-300 p-2">
              <button
                type="button"
                onClick={() => navigate(`/users/edit/${user.id}`)}
                className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => console.log('Deletar usuário', user.id)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
              >
                Deletar
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
};

export default ListUsers;
