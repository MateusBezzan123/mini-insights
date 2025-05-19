import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Stack,
  useToast,
  Flex
} from '@chakra-ui/react';
import api from '../api/api';

export default function InsightForm({ editInsight, onSaved, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (editInsight) {
      setTitle(editInsight.title);
      setContent(editInsight.content);
      setTags(editInsight.tags.join(', '));
    }
  }, [editInsight]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = { 
      title, 
      content, 
      tags: tags.split(',').map(t => t.trim()).filter(t => t) 
    };

    try {
      if (editInsight?.id) {
        await api.put(`/insights/${editInsight.id}`, payload);
      } else {
        await api.post('/insights', payload);
      }
      
      toast({
        title: 'Insight salvo com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      onSaved();
    } catch (error) {
      toast({
        title: 'Erro ao salvar insight',
        description: error.response?.data?.message || 'Tente novamente',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Título</FormLabel>
          <Input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Título do insight" 
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Conteúdo</FormLabel>
          <Textarea 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            placeholder="Descreva seu insight" 
            rows={6}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Tags (separadas por vírgula)</FormLabel>
          <Input 
            value={tags} 
            onChange={e => setTags(e.target.value)} 
            placeholder="ex: react, javascript, frontend" 
          />
        </FormControl>

        <Flex justify="flex-end" gap={3}>
          <Button onClick={onCancel} variant="outline">
            Cancelar
          </Button>
          <Button 
            type="submit" 
            colorScheme="blue"
            isLoading={isSubmitting}
          >
            {editInsight?.id ? 'Atualizar' : 'Salvar'}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}