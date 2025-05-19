import React from 'react';
import { 
  Button, 
  Flex, 
  Text,
  Select
} from '@chakra-ui/react';

export default function Pagination({ page, setPage, total, limit }) {
  const totalPages = Math.ceil(total / limit);
  const pageNumbers = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (e) => {
    setPage(Number(e.target.value));
  };

  return (
    <Flex align="center" justify="space-between" mt={4}>
      <Button 
        disabled={page === 1} 
        onClick={() => setPage(prev => prev - 1)}
        variant="outline"
      >
        Anterior
      </Button>
      
      <Flex align="center" gap={2}>
        <Text>Página</Text>
        <Select 
          value={page} 
          onChange={handlePageChange}
          width="auto"
        >
          {pageNumbers.map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </Select>
        <Text>de {totalPages}</Text>
      </Flex>
      
      <Button 
        disabled={page === totalPages} 
        onClick={() => setPage(prev => prev + 1)}
        variant="outline"
      >
        Próxima
      </Button>
    </Flex>
  );
}