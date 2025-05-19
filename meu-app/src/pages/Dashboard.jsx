import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  Input, 
  Stack, 
  useColorModeValue 
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import InsightList from '../components/InsightList';
import InsightForm from '../components/InsightForm';
import TagFilter from '../components/TagFilter';

export default function Dashboard() {
  const { logout } = useAuth();
  const [editing, setEditing] = useState(null);
  const [filterTag, setFilterTag] = useState('');
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  const refresh = () => setEditing(null);

  return (
    <Box minH="100vh" bg={bgColor}>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        p={4}
        bg={cardBg}
        boxShadow="sm"
      >
        <Heading size="lg">Meus Insights</Heading>
        <Button 
          colorScheme="red" 
          variant="outline"
          onClick={logout}
        >
          Sair
        </Button>
      </Flex>

      <Stack spacing={6} p={6} maxW="1200px" mx="auto">
        <Flex justify="space-between" align="center">
          <TagFilter onFilter={setFilterTag} />
          <Button 
            colorScheme="blue"
            onClick={() => setEditing({})}
          >
            Novo Insight
          </Button>
        </Flex>

        {editing !== null && (
          <Box p={6} bg={cardBg} borderRadius="md" boxShadow="md">
            <InsightForm
              editInsight={editing.id ? editing : null}
              onSaved={refresh}
              onCancel={() => setEditing(null)}
            />
          </Box>
        )}

        <Box p={6} bg={cardBg} borderRadius="md" boxShadow="md">
          <InsightList tagFilter={filterTag} />
        </Box>
      </Stack>
    </Box>
  );
}