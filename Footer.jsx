import React from 'react';
import { Box, Text, Link, HStack } from '@chakra-ui/react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
    return (
        <Box bg="gray.200" color="gray.700" py={4} >
            <HStack justifyContent="center" spacing={10}>
                <Link href="https://facebook.com" isExternal>

                    <FaFacebook style={{ fontSize: "25px" }} />
                </Link>
                <Link href="https://twitter.com" isExternal>

                    <FaXTwitter style={{ fontSize: "25px" }} />
                </Link>
                <Link href="https://instagram.com" isExternal>

                    <FaInstagram style={{ fontSize: "25px" }} />
                </Link>
            </HStack>
            <Text align="center" mt={4}>
                &copy; {new Date().getFullYear()} Poster Correction Detection. All rights reserved.
            </Text>
        </Box>
    );
};

export default Footer;
