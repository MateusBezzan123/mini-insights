import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';

export default function InsightForm({ editInsight, onSaved }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  useEffect(() => {
    if (editInsight) {
      setTitle(editInsight.title);
      setContent(editInsight.content);
      setTags(editInsight.tags.join(','));
    }
  }, [editInsight]);
  const handleSubmit = async e => {
    e.preventDefault();
    const payload = { title, content, tags: tags.split(',').map(t => t.trim()) };
    try {
      if (editInsight) await api.put(`/insights/${editInsight.id}`, payload);
      else await api.post('/insights', payload);
      toast.success('Insight salvo!');
      onSaved();
    } catch { toast.error('Erro ao salvar'); }
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
      <textarea required value={content} onChange={e => setContent(e.target.value)} placeholder="Conteúdo" />
      <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (vírgula)" />
      <button type="submit">Salvar</button>
    </form>
  );
}