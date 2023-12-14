import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
} from "@chakra-ui/react";
import App from "../page/hotel/App";
import React, { useEffect, useState } from "react";
import { RecentViewed } from "./RecentViewed";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

export function HomeBody() {
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

  /*

  이미지 동그라미 만드는법
  w={"224px"} ,
  h={"224px"} ,
  borderRadius={"50%"}

   */

  return (
    <Box>
      {/* ---------- 배너이미지  */}
      <Box boxShadow={"5px 5px 5px 5px gray"} w={"100%"} h={"520px"}>
        <Flex justifyContent={"space-around"} alignItems={"center"}>
          <Box w={"100%"} h={"500px"} mt={"20px"}>
            <App />
          </Box>
          <Box
            position="fixed" // 절대 위치를 사용해 오버레이 설정
            top="300" // 배너의 상단에서 시작
            right="2" // 배너의 우측에서 시작
            zIndex="10" // 다른 요소보다 위에 오도록 z-index 설정
            p="4" // 패딩 값
            bg="rgba(255, 255, 255, 0.5)" // 배경색
            boxShadow="lg" // 그림자 효과
            maxW="sm" // 최대 너비 설정
            overflow="hidden" // 내용이 넘치면 숨김
          >
            <RecentViewed />
          </Box>
        </Flex>
      </Box>

      {/* ------------------- 버스상품 중간정렬 ------------------- */}
      <Flex justifyContent="center" w="100%">
        <Box w={"65%"} justifyContent={"center"} mt={"30px"}>
          <Heading mb={"50px"}>카테고리별 상품</Heading>
          <Card
            w={"400px"}
            h={"50px"}
            textAlign={"center"}
            mb={10}
            onClick={() => navigate("/transport")}
            _hover={{ cursor: "pointer", color: "#509896" }}
            lineHeight={"50px"}
          >
            <Box
              fontWeight={900}
              fontSize={"1.2rem"}
              style={{ fontFamily: "Pretendard-Regular" }}
            >
              🚎 버스 상품
            </Box>
          </Card>

          <Flex>
            {listBus.map(
              (bus) =>
                bus.typeName === "bus" && (
                  <Card
                    key={bus.tid}
                    w={"450px"}
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
                        </Box>
                      </Center>
                    </CardBody>
                  </Card>
                ),
            )}
          </Flex>
        </Box>
      </Flex>

      {/* ------------------- 항공상품 중간정렬 ------------------- */}
      <Flex justifyContent="center" w="100%" bg={"#eeeeee"} mt={5}>
        <Box w={"65%"} justifyContent={"center"} mt={"30px"}>
          <Card
            w={"400px"}
            h={"50px"}
            textAlign={"center"}
            mb={10}
            onClick={() => navigate("/transport")}
            _hover={{ cursor: "pointer", color: "#509896" }}
            lineHeight={"50px"}
          >
            <Box fontWeight={900} fontSize={"1.2rem"}>
              🛫 항공 상품
            </Box>
          </Card>
          <Flex>
            {listAir.map(
              (air) =>
                air.typeName === "air" && (
                  <Card
                    mb={5}
                    key={air.tid}
                    w={"450px"}
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
                        </Box>
                      </Center>
                    </CardBody>
                  </Card>
                ),
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
