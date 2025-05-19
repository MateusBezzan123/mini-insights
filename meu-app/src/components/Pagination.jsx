import React from 'react';
export default function Pagination({ page, setPage }) {
  return (
    <div>
      <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>Anterior</button>
      <span>Página {page}</span>
      <button onClick={() => setPage(prev => prev + 1)}>Próxima</button>
    </div>
  );
}