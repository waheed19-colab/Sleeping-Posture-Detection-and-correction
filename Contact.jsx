import React from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Textarea, Heading, VStack, Text } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().required('Message is required'),
});

const Contact = () => {
    const onSubmit = (values) => {
        console.log(values);
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
            >
                <Heading as="h2" size="xl" mb={6}>
                    Contact Us
                </Heading>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        message: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <VStack spacing={4}>
                                <FormControl isInvalid={errors.name && touched.name}>
                                    <FormLabel>Name</FormLabel>
                                    <Field as={Input} name="name" placeholder="Name" />
                                    <ErrorMessage name="name" component={Text} color="red.500" />
                                </FormControl>
                                
                                <FormControl isInvalid={errors.email && touched.email}>
                                    <FormLabel>Email</FormLabel>
                                    <Field as={Input} name="email" placeholder="Email" />
                                    <ErrorMessage name="email" component={Text} color="red.500" />
                                </FormControl>
                                
                                <FormControl isInvalid={errors.message && touched.message}>
                                    <FormLabel>Message</FormLabel>
                                    <Field as={Textarea} name="message" placeholder="Message" />
                                    <ErrorMessage name="message" component={Text} color="red.500" />
                                </FormControl>
                                
                                <Button colorScheme="teal" size="lg" width="full" type="submit">
                                    Submit
                                </Button>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
};

export default Contact;
