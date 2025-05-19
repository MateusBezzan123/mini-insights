import React, { useState } from 'react';
export default function TagFilter({ onFilter }) {
  const [tag, setTag] = useState('');
  const apply = () => onFilter(tag.trim());
  return (
    <div>
      <input value={tag} onChange={e => setTag(e.target.value)} placeholder="Filtrar tag" />
      <button onClick={apply}>Filtrar</button>
    </div>
  );
}