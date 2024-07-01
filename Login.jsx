import React, { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Link, Heading, VStack, Text, useToast, Spinner } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            // Redirect or perform any action after successful login
            console.log(user)
            toast({
                title: 'Login Successful',
                description: 'You have successfully logged in.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            let errorMessage = 'An error occurred. Please try again.';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'User not found. Please check your email.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Invalid password. Please try again.';
            }
            toast({
                title: 'Login Error',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center" bg="gray.100">
            <Box
                textAlign="center"
                py={10}
                px={6}
                width="400px"
                bg="white"
                borderRadius="md"
                boxShadow="lg"
                border="1px"
                borderColor="gray.200"
                backgroundColor="rgba(255, 255, 255, 0.74)"
            >
                <Heading as="h2" size="xl" mb={6}>
                    Login
                </Heading>
                <Box maxW="md" mx="auto">
                    <VStack spacing={4} as="form" onSubmit={handleLogin}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <Button colorScheme="teal" size="lg" width="full" type="submit" isLoading={loading} spinner={<Spinner size="md" />}>
                            Login
                        </Button>
                    </VStack>
                    <Text mt={4}>
                        <Link color="teal.500" href="#">
                            Forgot Password?
                        </Link>
                    </Text>
                    <Text mt={2}>
                        I don't have an account?{' '}
                        <Link color="teal.500" href="/register">
                            Sign Up
                        </Link>
                    </Text>
                </Box>
            </Box>
        </Flex>
    );
};

export default Login;
