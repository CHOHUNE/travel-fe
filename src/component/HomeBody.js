import { Box, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import App from "../page/hotel/App";
import React from "react";

export function HomeBody() {
  return (
    <Box>
      <Box w={"100%"} h={"600px"} backgroundColor={"#f5f8ec"}>
        <Flex justifyContent={"space-around"} alignItems={"center"}>

            <Box border={'1px solid black'} borderRadius={'10px'} w={'80%'} h={'500px'}
                 mt={'20px'}>
                <App/>
            </Box>
        </Flex>
      </Box>
    </Box>
  );
}
