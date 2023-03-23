import { UnlockIcon, LockIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Heading,
  Text,
  Button,
  Spacer,
  HStack,
  useToast,
  AvatarBadge,
  Avatar,
} from "@chakra-ui/react";

export default function Navbar() {
  const [navbarName, setNavbarName] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('USER'));

  useEffect(() => {
    switch (window.location.pathname) {
      case '/silsilah-keluarga':
        setNavbarName("Silsilah Keluarga")
        break;
      default:
        setNavbarName("Dashboard")
        break;
    }
  });

  const handleLogOut = () => {
    const isAuth = localStorage.getItem("USER");
    if (isAuth) {
      localStorage.removeItem('USER');
      localStorage.removeItem('tree_data');
      
      toast({
        title: "Logged out.",
        description: "Successfully logged out",
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "success",
        icon: <UnlockIcon />,
      });

      return navigate("/login");
    } else {
      toast({
        title: "Logged out.",
        description: "Failed logged out",
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "error",
        icon: <LockIcon />,
      });
    }

  };

  return (
    <Flex as="nav" p="0px" mb="60px" alignItems="center">
      <Heading as="h1" fontSize="1.5em">
        {navbarName}
      </Heading>
      <Spacer />

      <HStack spacing="20px">
        <Avatar name={user?.name} className={styles.profilAvatar} color="white">
          <AvatarBadge width="1.3em" bg="green">
            <Text fontSize="xs" color="white">
              TK
            </Text>
          </AvatarBadge>
        </Avatar>
        <Text>{user?.name}</Text>
        <Button className={styles.buttonLogOut} onClick={() => handleLogOut()}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
}
