import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function TransPort() {
  const navigate = useNavigate();

  return (
    <Box mt={4}>
      <Box w={"100%"} h={"500px"} backgroundColor={"#f5f8ec"}>
        <Box w="85%" ml="12.5%">
          운송 추천 광고
        </Box>
        <Flex justifyContent={"space-around"}>
          <Button>광고1</Button>
          <Button>광고2</Button>
          <Button>광고3</Button>
        </Flex>
      </Box>
      <Box ml={"12.5%"} mt={"100px"}>
        <Input
          w={"400px"}
          h={"50px"}
          readOnly
          value={"버스 카테고리 게시글"}
          textAlign={"center"}
          mb={10}
          onClick={() => navigate("list?type=bus")}
          _hover={{ cursor: "pointer", color: "green" }}
        />
        <Flex mb={10}>
          <Box w={"275px"} h={"275px"} bg={"#eeecec"}>
            버스 글1
          </Box>
          <Box w={"275px"} h={"275px"} bg={"#eeecec"} ml={7}>
            버스 글2
          </Box>
          <Box w={"275px"} h={"275px"} bg={"#eeecec"} ml={7}>
            버스 글3
          </Box>
          <Box w={"275px"} h={"275px"} bg={"#eeecec"} ml={7}>
            버스 글4
          </Box>
        </Flex>
      </Box>
      <Box ml={"12.5%"}>
        <Input
          w={"400px"}
          h={"50px"}
          readOnly
          value={"항공 카테고리 게시글"}
          textAlign={"center"}
          mb={10}
          onClick={() => navigate("list?type=air")}
          _hover={{ cursor: "pointer", color: "green" }}
        />
        <Flex mb={10}>
          <Box w={"275px"} h={"275px"} bg={"#eeecec"}>
            항공 글1
          </Box>
          <Box w={"275px"} h={"275px"} bg={"#eeecec"} ml={7}>
            항공 글2
          </Box>
          <Box w={"275px"} h={"275px"} bg={"#eeecec"} ml={7}>
            항공 글3
          </Box>
          <Box w={"275px"} h={"275px"} bg={"#eeecec"} ml={7}>
            항공 글4
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
