import React from 'react';

interface ColunasProps {
  colunas: string[];
}

const Colunas = ({ colunas }: ColunasProps) => {
  const colunasMapeadas = colunas.map((coluna) => (
    <th key={coluna} className="border border-gray-300 p-2">
      {coluna}
    </th>
  ));

  return (
    <>
      <thead>
        <tr className="bg-gray-200">{colunasMapeadas}</tr>
      </thead>
    </>
  );
};

export default Colunas;
