import {
  background,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

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
        <Card
          w={"400px"}
          h={"50px"}
          textAlign={"center"}
          mb={10}
          onClick={() => navigate("list?type=bus")}
          _hover={{ cursor: "pointer", color: "#509896" }}
          lineHeight={"50px"}
        >
          <Box fontWeight={900} fontSize={"1.2rem"}>
            버스 카테고리 게시글
          </Box>
        </Card>

        <Flex>
          {listBus.map(
            (bus) =>
              bus.typeName === "bus" && (
                <Card
                  key={bus.tid}
                  w={"275px"}
                  mr={7}
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "#eeecec",
                    transition: "background 0.5s ease-in-out",
                  }}
                  onClick={() => navigate("/transport/" + bus.tid)}
                >
                  <CardHeader mb={0} pb={0}>
                    <Center>
                      <Box w={"90%"}>
                        <Image src={bus.url} />
                      </Box>
                    </Center>
                  </CardHeader>
                  <CardBody mt={2} pt={0}>
                    <Center>
                      <Box>
                        <Box textColor={"black"} fontWeight={"bold"}>
                          [{bus.transStartLocation}] &nbsp;
                          <FontAwesomeIcon icon={faAnglesRight} />
                          &nbsp; [{bus.transArriveLocation}] &nbsp;{" "}
                          {bus.transTitle}
                        </Box>
                        <FormControl>
                          <Flex>
                            <FormLabel
                              fontSize={"1.1rem"}
                              textColor={"#509896"}
                              fontWeight={"900"}
                            >
                              가격 :
                            </FormLabel>
                            <Box
                              fontSize={"1.1rem"}
                              textColor={"#509896"}
                              fontWeight={"900"}
                            >
                              {bus.transPrice}원
                            </Box>
                          </Flex>
                        </FormControl>
                        <FormControl>
                          <Flex>
                            <FormLabel>출발일 : </FormLabel> {bus.transStartDay}
                          </Flex>
                        </FormControl>
                      </Box>
                    </Center>
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
                  mr={7}
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "#eeecec",
                    transition: "background 0.5s ease-in-out",
                  }}
                  onClick={() => navigate("/transport/" + air.tid)}
                >
                  <CardHeader mb={0} pb={0}>
                    <Center>
                      <Box w={"90%"}>
                        <Image src={air.url} />
                      </Box>
                    </Center>
                  </CardHeader>
                  <CardBody mt={2} pt={0}>
                    <Center>
                      <Box>
                        <Box textColor={"black"} fontWeight={"bold"}>
                          [{air.transStartLocation}] &nbsp;
                          <FontAwesomeIcon icon={faAnglesRight} />
                          &nbsp; [{air.transArriveLocation}] &nbsp;{" "}
                          {air.transTitle}
                        </Box>
                        <FormControl>
                          <Flex>
                            <FormLabel
                              fontSize={"1.1rem"}
                              textColor={"#509896"}
                              fontWeight={"900"}
                            >
                              가격 :
                            </FormLabel>
                            <Box
                              fontSize={"1.1rem"}
                              textColor={"#509896"}
                              fontWeight={"900"}
                            >
                              {air.transPrice}원
                            </Box>
                          </Flex>
                        </FormControl>
                        <FormControl>
                          <Flex>
                            <FormLabel>출발일 : </FormLabel> {air.transStartDay}
                          </Flex>
                        </FormControl>
                      </Box>
                    </Center>
                  </CardBody>
                </Card>
              ),
          )}
        </Flex>
      </Box>
    </Box>
  );
}
