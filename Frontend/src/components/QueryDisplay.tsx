// src/components/QueryDisplay.tsx
import React, { useState } from 'react';

interface QueryDisplayProps {
  sqlQuery: string;
  mongoQuery: string;
}

const QueryDisplay: React.FC<QueryDisplayProps> = ({ sqlQuery, mongoQuery }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setVisible(!visible)}
      >
        {visible ? "Ocultar Consultas" : "Mostrar Consultas"}
      </button>
      {visible && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-xl font-bold mb-4 text-black">Consulta SQL</h4>
          <pre className="bg-gray-800 text-white p-4 rounded-lg mb-6">{sqlQuery}</pre>
          <h4 className="text-xl font-bold mb-4 text-black">Consulta MongoDB</h4>
          <pre className="bg-gray-800 text-white p-4 rounded-lg">{mongoQuery}</pre>
        </div>
      )}
    </div>
  );
};

export default QueryDisplay;
