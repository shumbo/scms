import { Box, chakra, Text, VStack } from "@chakra-ui/react";
import { ReactNode, VFC } from "react";
import { NavLink } from "react-router-dom";

export const ProjectSidebarItem = chakra(NavLink, {
  baseStyle: {
    width: "100%",
    px: "3",
    py: "2",
    rounded: "md",
    fontSize: "sm",
    display: "block",
    _hover: { bg: "purple.50", color: "purple.700" },
    _activeLink: { bg: "purple.700", color: "white" },
  },
});

export const ProjectSidebar: VFC<{ children: ReactNode }> = ({ children }) => (
  <VStack align="start" width="250px">
    <Box width="100%" px="2" py={4}>
      <Text
        as="h1"
        fontSize="5xl"
        fontWeight="extrabold"
        bgGradient="linear(to-l, #7928CA,#FF0080)"
        bgClip="text"
      >
        SCMS
      </Text>
      <VStack mt="4">{children}</VStack>
    </Box>
  </VStack>
);
