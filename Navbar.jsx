import React from 'react';
import { Box, Flex, HStack, Link, IconButton, Button, Heading, useDisclosure, useColorModeValue, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Avatar
} from '@chakra-ui/react'


const Links = ['Home', 'About', 'Contact'];

const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={`/${children == "Home" ? "" : children.toLowerCase()}`}>
        {children}
    </Link>
);

const Navbar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const isLoggedin = false



    return (
        <>

            <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />

                    <Heading cursor="pointer"  as='h3' size='lg'>
                        Posture Correction
                    </Heading>
                    <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                        {Links.map((link) => (
                            <NavLink link={link == "Home" ? "/" : link} key={link}>{link}</NavLink>
                        ))}
                    </HStack>

                    {isLoggedin ?
                        <Menu>
                            <MenuButton background="non" as={Button}>
                                <Avatar color="white" backgroundColor="teal" name='Dan Abrahmov' />
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title='Profile'>
                                    <MenuItem>My Account</MenuItem>
                                    <MenuItem>Logout</MenuItem>

                                </MenuGroup>

                            </MenuList>
                        </Menu>
                        :
                        <Link href="/login"><Button colorScheme="teal" >Login</Button></Link>}

                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}

            </Box>
            <hr />
        </>
    );
};

export default Navbar;
