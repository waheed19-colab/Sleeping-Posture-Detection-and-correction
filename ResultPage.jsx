// src/components/ResultPage.js

import React, { useEffect, useState } from 'react';
import { Box, Image, Text, VStack, HStack, Badge, Heading, Container, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure, CloseButton, Spinner, Flex } from '@chakra-ui/react';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

const ResultPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState(null);
    const [postureData, setPostureData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostureData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'postureData'));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPostureData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posture data: ", error);
            }
        };

        fetchPostureData();
    }, []);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        onOpen();
    };

    if (loading) {
        return (
            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <Container maxW="container.lg" py={10}>
            <Heading as="h1" size="xl" mb={6} textAlign="center">
                Posture Correction Results
            </Heading>
            <VStack spacing={6}>
                {postureData.map((data) => (
                    <Box key={data.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" width="100%">
                        <HStack spacing={5}>
                            <Image
                                borderRadius="md"
                                boxSize="150px"
                                src={data.image}
                                alt={`Posture ${data.id}`}
                                cursor="pointer"
                                onClick={() => handleImageClick(data.image)}
                            />
                            <VStack align="start" spacing={3}>
                                <HStack>
                                    <Text fontSize="lg" fontWeight="bold">
                                        Time:
                                    </Text>
                                    <Text fontSize="lg">{data.time}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize="lg" fontWeight="bold">
                                        Status:
                                    </Text>
                                    <Badge colorScheme={data.status === true ? "green" : "red"}>
                                        {data.status == true ? "CORRECT" : "INCORRECT"}
                                    </Badge>
                                </HStack>
                                <Text fontSize="md">{data.description}</Text>
                            </VStack>
                        </HStack>
                    </Box>
                ))}
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent maxW="90%">
                    <ModalBody p={0} position="relative">
                        <CloseButton
                            position="absolute"
                            top="10px"
                            right="10px"
                            onClick={onClose}
                        />
                        {selectedImage && <Image src={selectedImage} alt="Selected Posture" />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default ResultPage;
