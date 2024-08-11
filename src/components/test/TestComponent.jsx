import React from 'react';
import { Link } from 'react-router-dom';

function TestComponent({ id, name }) {
  return (
    <Link
      to={`/test/${name}`}
      state={{ id, name }}
      className="block p-6 bg-gray-200 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      <h1 className="text-xl font-semibold text-gray-800">{name}</h1>
    </Link>
  );
}

export default TestComponent;
