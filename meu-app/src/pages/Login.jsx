import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Flex, 
  FormControl, 
  FormLabel, 
  Heading, 
  Input, 
  Link, 
  Stack, 
  Text 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handle = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box 
        p={8} 
        maxWidth="500px" 
        width="full" 
        boxShadow="md" 
        borderRadius="md"
      >
        <Heading mb={6} textAlign="center">Login</Heading>
        <form onSubmit={handle}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="seu@email.com" 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Senha</FormLabel>
              <Input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="********" 
              />
            </FormControl>

            <Button 
              type="submit" 
              colorScheme="blue"
              isLoading={isLoading}
              loadingText="Entrando..."
            >
              Entrar
            </Button>

            <Text textAlign="center">
              Não tem uma conta?{' '}
              <Link as={RouterLink} to="/register" color="blue.500">
                Registre-se
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}