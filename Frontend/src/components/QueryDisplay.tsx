// src/components/QueryDisplay.tsx
import React from 'react';

interface QueryDisplayProps {
  sqlQuery: string;
  mongoQuery: string;
}

const QueryDisplay: React.FC<QueryDisplayProps> = ({ sqlQuery, mongoQuery }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h4 className="text-xl font-bold mb-4 text-black">Consulta SQL</h4> {/* Agregado text-black */}
      <pre className="bg-gray-800 text-white p-4 rounded-lg mb-6">{sqlQuery}</pre>

      <h4 className="text-xl font-bold mb-4 text-black">Consulta MongoDB</h4> {/* Agregado text-black */}
      <pre className="bg-gray-800 text-white p-4 rounded-lg">{mongoQuery}</pre>
    </div>
  );
};

export default QueryDisplay;

