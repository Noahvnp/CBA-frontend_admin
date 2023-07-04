import React from "react";

// Chakra imports
import { Flex, Text, Image, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Logo from "assets/img/layout/logo.png";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  const colorLogo = useColorModeValue("brand.300", "white");
  return (
    <Flex align="center" direction="column">
      <Image borderRadius="full" boxSize="150px" src={Logo} alt="Logo CBA" />
      <Text fontSize="24px" fontWeight="800" color={colorLogo}>
        CBA - Admin
      </Text>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
