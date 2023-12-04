import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function TransPortList() {
  const [list, setList] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const navigate = useNavigate();

  const [params] = useSearchParams();
  console.log(params.get("type"));

  useEffect(() => {
    axios.get("/api/transport/list").then((response) => {
      setList(response.data);
    });
  }, []);

  if (list === null) {
    <Spinner />;
  }

  return (
    <Box>
      <Box
        w={"100%"}
        h={"300px"}
        textAlign={"center"}
        lineHeight={"300px"}
        mt={4}
        bg={"#f5f8ec"}
      >
        버스 항공 이미지
      </Box>
      <Flex
        w={"85%"}
        h={"100px"}
        ml={"7.5%"}
        bg={"#d9d9d9"}
        mt={2}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Input
          w={"290px"}
          h={"60px"}
          bg={"white"}
          placeholder={"검색어를 입력해 주세요"}
        />
        <Button onClick={onOpen}>출발일</Button>

        <Button w={"50px"} h={"50px"} bg={"white"}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </Flex>
      <Flex
        ml={"7.5%"}
        mt={4}
        w={"85%"}
        h={"50px"}
        justifyContent={"space-between"}
      >
        <Box
          w={"400px"}
          lineHeight={"50px"}
          bg={"#d9d9d9"}
          textAlign={"center"}
          fontSize={"2rem"}
        >
          {params.get("type") === "bus" && <Box>버스 게시글 목록</Box>}
          {params.get("type") === "air" && <Box>항공 게시글 목록</Box>}
        </Box>
        <Box>
          <Button
            ml={2}
            onClick={() => navigate("/transport/write?" + params.toString())}
          >
            {params.get("type") === "bus" && <Box>버스 상품 등록</Box>}
            {params.get("type") === "air" && <Box>항공 상품 등록</Box>}
          </Button>
        </Box>
      </Flex>
      <SimpleGrid columns={4} w={"85%"} ml={"8.5%"} mt={4} spacing={"25px"}>
        {list.map(
          (transport) =>
            params.get("type") === transport.typeName && (
              <Card
                w={"275px"}
                h={"275px"}
                _hover={{ cursor: "pointer" }}
                onClick={() => navigate("/transport/" + transport.tid)}
                key={transport.tid}
              >
                <CardHeader>
                  {transport.tid}
                  <br />
                  제목 : {transport.transTitle}
                </CardHeader>
                <CardBody>
                  가격 : {transport.transPrice} 원<br />
                  출발일 : {transport.transStartDay}
                </CardBody>
              </Card>
            ),
        )}
      </SimpleGrid>

      <Flex w={"80%"} ml={"10%"} mt={10} justifyContent={"center"}>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Select Date and Time"
              type="date"
              bg={"white"}
              w={"200px"}
              h={"50px"}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
