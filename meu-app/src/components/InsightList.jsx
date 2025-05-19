import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Pagination from './Pagination';

export default function InsightList({ tagFilter }) {
  const [insights, setInsights] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const fetchData = async () => {
    const params = { page, limit };
    if (tagFilter) params.tag = tagFilter;
    const res = await api.get('/insights', { params });
    setInsights(res.data.insights);
  };
  useEffect(() => { fetchData(); }, [page, tagFilter]);
  return (
    <>
      <ul>
        {insights.map(ins => (
          <li key={ins.id} className="card">
            <h3>{ins.title}</h3>
            <p>{ins.content}</p>
            <small>{ins.tags.join(', ')}</small>
            <div>
              <button onClick={() => {}}>Editar</button>
              <button onClick={() => {}}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
      <Pagination page={page} setPage={setPage} />
    </>
  );
}