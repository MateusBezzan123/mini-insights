import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Tag,
  Text,
  useToast
} from '@chakra-ui/react';
import api from '../api/api';
import Pagination from './Pagination';

export default function InsightList({ tagFilter }) {
  const [insights, setInsights] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const params = { page, limit };
      if (tagFilter) params.tag = tagFilter;
      const res = await api.get('/insights', { params });
      setInsights(res.data.insights);
      setTotal(res.data.total);
    } catch (error) {
      toast({
        title: 'Erro ao carregar insights',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/insights/${id}`);
      toast({
        title: 'Insight removido',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchData();
    } catch (error) {
      toast({
        title: 'Erro ao remover insight',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, [page, tagFilter]);

  return (
    <Stack spacing={4}>
      {insights.length === 0 ? (
        <Text textAlign="center" py={10}>Nenhum insight encontrado</Text>
      ) : (
        <>
          {insights.map(ins => (
            <Card key={ins.id} variant="outline">
              <CardBody>
                <Heading size="md">{ins.title}</Heading>
                <Text mt={2}>{ins.content}</Text>
                <Flex mt={3} wrap="wrap" gap={2}>
                  {ins.tags.map(tag => (
                    <Tag key={tag} colorScheme="blue">{tag}</Tag>
                  ))}
                </Flex>
              </CardBody>
              <CardFooter>
                <Flex gap={2}>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {}}
                  >
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    colorScheme="red" 
                    variant="outline"
                    onClick={() => handleDelete(ins.id)}
                  >
                    Deletar
                  </Button>
                </Flex>
              </CardFooter>
            </Card>
          ))}
          <Pagination 
            page={page} 
            setPage={setPage} 
            total={total}
            limit={limit}
          />
        </>
      )}
    </Stack>
  );
}