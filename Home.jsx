import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Image, Flex } from '@chakra-ui/react';
import posture from '../assets/posture.jpg';
import posture1 from '../assets/posture1.jpeg';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
// import badPosture1 from '../assets/badPosture1.jpg';
// import badPosture2 from '../assets/badPosture2.jpg';

const badPostureInfo = [
    {
        text: "Bad sleeping posture can lead to back pain and discomfort.",
        image: posture,
    },
    {
        text: "Sleeping in the wrong position can affect your spinal alignment.",
        image: posture1,
    },
    // Add more info objects as needed
];

const Home = () => {
    const navigate = useNavigate();
    const [currentInfoIndex, setCurrentInfoIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % badPostureInfo.length);
        }, 5000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);



    function handleclick() {
        navigate("/register")
    }

    return (
        <Flex height="100vh" alignItems="center" justifyContent="space-between" position="relative" bg="gray.100" px={10}>
            <Box
                textAlign="left"
                py={10}
                px={6}
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                position="relative"
                maxWidth="50%"
                zIndex={1}
            >

                    <Heading cursor="hand" as="h2" size="xl" mb={6} color="black">
                        Posture Correction Detection
                    </Heading>
                

                <Text fontSize="lg" mb={6} color="black">
                    This project aims to detect and correct sleeping postures using machine learning.
                    The system recommends the right posture for sleeping based on camera input and provides other advice.
                    Data is connected to Firebase and displayed on this web application.
                </Text>
                <Button colorScheme="teal" size="lg" onClick={handleclick}>
                    Get Started
                </Button>
            </Box>

            <Box
                position="relative"
                bg="white"

                borderRadius="md"
                boxShadow="md"
                // maxW="sm"
                height="75%"
                zIndex={1}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="50%"
                opacity="0.85"
            >
                <motion.div
                    key={currentInfoIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.9 }}
                    style={{ textAlign: 'center', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                    <Text fontSize="lg" mb={4}>
                        {badPostureInfo[currentInfoIndex].text}
                    </Text>
                    <Image
                        src={badPostureInfo[currentInfoIndex].image}
                        alt="Bad Posture"
                        borderRadius="md"
                        objectFit="cover"
                        width="100%"
                        height="100%"
                    />
                </motion.div>
            </Box>
        </Flex>
    );
};

export default Home;
