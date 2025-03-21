import React from 'react';

interface QueryDisplayProps {
  query: object;
}

const QueryDisplay: React.FC<QueryDisplayProps> = ({ query }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md my-4">
      <h3 className="text-lg font-semibold mb-2">Consulta:</h3>
      <pre className="text-sm">{JSON.stringify(query, null, 2)}</pre>
    </div>
  );
};

export default QueryDisplay;
