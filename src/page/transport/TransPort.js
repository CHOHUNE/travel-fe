import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Image,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function TransPort() {
  const navigate = useNavigate();

  const [listBus, setListBus] = useState([]);
  const [listAir, setListAir] = useState([]);

  useEffect(() => {
    axios
      .get("/api/transport/listPopularBus")
      .then((response) => setListBus(response.data));
  }, []);

  useEffect(() => {
    axios
      .get("/api/transport/listPopularAir")
      .then((response) => setListAir(response.data));
  }, []);

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
        <Flex>
          {listBus.map(
            (bus) =>
              bus.typeName === "bus" && (
                <Card
                  key={bus.tid}
                  w={"275px"}
                  h={"275px"}
                  bg={"#eeecec"}
                  mr={7}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => navigate("/transport/" + bus.tid)}
                >
                  <CardHeader>
                    <Box w={"80%"} ml={"10%"}>
                      <Image src={bus.url} />
                    </Box>
                    <Box>{bus.transTitle}</Box>
                  </CardHeader>
                  <CardBody>
                    <Box>가격 : {bus.transPrice}원</Box>
                    <Box>출발일 : {bus.transStartDay}</Box>
                  </CardBody>
                </Card>
              ),
          )}
        </Flex>
      </Box>
      <Box ml={"12.5%"} mt={10} mb={20}>
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
        <Flex>
          {listAir.map(
            (air) =>
              air.typeName === "air" && (
                <Card
                  key={air.tid}
                  w={"275px"}
                  h={"275px"}
                  bg={"#eeecec"}
                  mr={7}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => navigate("/transport/" + air.tid)}
                >
                  <CardHeader>
                    <Box w={"80%"} ml={"10%"}>
                      <Image src={air.url} />
                    </Box>
                    <Box>{air.transTitle}</Box>
                  </CardHeader>
                  <CardBody>
                    <Box>가격 : {air.transPrice}원</Box>
                    <Box>출발일 : {air.transStartDay}</Box>
                  </CardBody>
                </Card>
              ),
          )}
        </Flex>
      </Box>
    </Box>
  );
}
