import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Logo from "../../../assets/img/layout/logo.png";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      {/* <img src="../../../assets/img/layout/logo.png"  /> */}
      <h1>Cantho Bussiness Association</h1>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
