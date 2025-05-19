import React, { useState } from 'react';
import { 
  Input, 
  InputGroup, 
  InputRightElement, 
  Button 
} from '@chakra-ui/react';

export default function TagFilter({ onFilter }) {
  const [tag, setTag] = useState('');

  const apply = () => onFilter(tag.trim());
  
  const clear = () => {
    setTag('');
    onFilter('');
  };

  return (
    <InputGroup width="300px">
      <Input
        value={tag}
        onChange={e => setTag(e.target.value)}
        placeholder="Filtrar por tag"
        onKeyPress={e => e.key === 'Enter' && apply()}
      />
      <InputRightElement width="4.5rem">
        {tag ? (
          <Button h="1.75rem" size="sm" onClick={clear}>
            Limpar
          </Button>
        ) : (
          <Button h="1.75rem" size="sm" onClick={apply}>
            Filtrar
          </Button>
        )}
      </InputRightElement>
    </InputGroup>
  );
}