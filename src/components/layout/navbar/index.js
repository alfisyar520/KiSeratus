import { UnlockIcon } from "@chakra-ui/icons";
import React from "react";
import styles from "./Navbar.module.scss";

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
  const toast = useToast();

  const handleLogOut = () => {
    toast({
      title: "Logged out.",
      description: "Successfully logged out",
      duration: 10000,
      isClosable: true,
      position: "top",
      status: "success",
      icon: <UnlockIcon />,
    });
  };

  return (
    <Flex as="nav" p="0px" mb="60px" alignItems="center">
      <Heading as="h1" fontSize="1.5em">
        Dashboard
      </Heading>
      <Spacer />

      <HStack spacing="20px">
        <Avatar name="tukang" className={styles.profilAvatar}>
          <AvatarBadge width="1.3em" bg="green">
            <Text fontSize="xs" color="white">
              TK
            </Text>
          </AvatarBadge>
        </Avatar>
        <Text>Tukang Keluarga</Text>
        <Button className={styles.buttonLogOut} onClick={() => handleLogOut()}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
}
