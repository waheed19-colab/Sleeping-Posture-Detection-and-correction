import React from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Link, Heading, VStack, Text, Select } from '@chakra-ui/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    age: Yup.number().required('Age is required').min(0, 'Age must be greater than 0'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Register = () => {
    const toast = useToast();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            // Save additional user info in Firestore
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                fullName: values.fullName,
                email: values.email,
                gender: values.gender,
                age: values.age
            });

            toast({
                title: 'Registration Successful',
                description: 'You have successfully registered. Please log in.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            resetForm();
        } catch (error) {
            let errorMessage = 'An error occurred. Please try again.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already in use. Please use a different email.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email. Please check your email.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Please use a stronger password.';
            }
            toast({
                title: 'Registration Error',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center" bg="gray.100">
            <Box
                margin="20px"
                overflow="hidden"
                textAlign="center"
                py={10}
                px={6}
                width="400px"
                bg="white"
                borderRadius="md"
                boxShadow="lg"
                border="1px"
                borderColor="gray.200"
            >
                <Heading as="h2" size="xl" mb={6}>
                    Register
                </Heading>
                <Formik
                    initialValues={{
                        fullName: '',
                        email: '',
                        gender: '',
                        age: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <VStack spacing={4}>
                                <FormControl isInvalid={errors.fullName && touched.fullName}>
                                    <Field as={Input} name="fullName" placeholder="Full Name" />
                                    <ErrorMessage name="fullName" component={Text} color="red.500" />
                                </FormControl>

                                <FormControl isInvalid={errors.email && touched.email}>
                                    <Field as={Input} name="email" placeholder="Email" type="email" />
                                    <ErrorMessage name="email" component={Text} color="red.500" />
                                </FormControl>

                                <FormControl isInvalid={errors.gender && touched.gender}>
                                    <Field as={Select} name="gender" placeholder="Select gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Field>
                                    <ErrorMessage name="gender" component={Text} color="red.500" />
                                </FormControl>

                                <FormControl isInvalid={errors.age && touched.age}>
                                    <Field as={Input} name="age" placeholder="Age" type="number" />
                                    <ErrorMessage name="age" component={Text} color="red.500" />
                                </FormControl>

                                <FormControl isInvalid={errors.password && touched.password}>
                                    <Field as={Input} name="password" placeholder="Password" type="password" />
                                    <ErrorMessage name="password" component={Text} color="red.500" />
                                </FormControl>

                                <FormControl isInvalid={errors.confirmPassword && touched.confirmPassword}>
                                    <Field as={Input} name="confirmPassword" placeholder="Confirm Password" type="password" />
                                    <ErrorMessage name="confirmPassword" component={Text} color="red.500" />
                                </FormControl>

                                <Button colorScheme="teal" size="lg" width="full" type="submit" isLoading={isSubmitting}>
                                    Register
                                </Button>
                            </VStack>
                        </Form>
                    )}
                </Formik>
                <Text mt={4}>
                    <Link color="teal.500" href="#">
                        Forgot Password?
                    </Link>
                </Text>
                <Text mt={2}>
                    I have an account?{' '}
                    <Link color="teal.500" href="/login">
                        Sign In
                    </Link>
                </Text>
            </Box>
        </Flex>
    );
};

export default Register;
