import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const About = () => (
    <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mb={6}>
            About
        </Heading>
        <Text fontSize="lg">
            The Poster Correction Detection project is designed to enhance your sleep quality by analyzing and recommending correct sleeping postures using advanced machine learning techniques.
        </Text>
    </Box>
);

export default About;
