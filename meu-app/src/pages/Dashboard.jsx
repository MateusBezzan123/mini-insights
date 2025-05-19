// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import InsightList from '../components/InsightList';
import InsightForm from '../components/InsightForm';
import TagFilter from '../components/TagFilter';

export default function Dashboard() {
  const { logout } = useAuth();
  const [editing, setEditing] = useState(null); // null = sem formulário
  const [filterTag, setFilterTag] = useState('');

  // volta ao estado “sem formulário”
  const refresh = () => setEditing(null);

  return (
    <div className="dashboard">
      <header>
        <h1>Meus Insights</h1>
        <button onClick={logout}>Sair</button>
      </header>

      <TagFilter onFilter={setFilterTag} />

      <button onClick={() => setEditing({})}>Novo Insight</button>

      {/* só renderiza se editing for um objeto */}
      {editing !== null && (
        <InsightForm
          // se vier um objeto vazio (novo), passa null para editar, senão passa o próprio objeto
          editInsight={editing.id ? editing : null}
          onSaved={refresh}
        />
      )}

      <InsightList tagFilter={filterTag} />
    </div>
  );
}
