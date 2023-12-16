import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import "../TransFont.css";
import { RecentViewed } from "../../component/RecentViewed";

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
      <Card h={"600px"} overflow={"hidden"} boxShadow={"5px 5px 5px 5px gray"}>
        <Center>
          <video style={{ width: "1500px", zIndex: 2 }} autoPlay loop muted>
            <source
              src={
                "https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/trans/video/plan.mp4"
              }
              type="video/mp4"
            />
          </video>
        </Center>
        <Box
          style={{
            position: "absolute",
            marginTop: "0px",
            width: "100%",
            height: "400px",
            backgroundColor: "#f5f6f6",
            zIndex: 1,
          }}
        ></Box>
        <Box
          style={{
            position: "absolute",
            marginTop: "80px",
            marginLeft: "68%",
            width: "100%",
            height: "400px",
            zIndex: 3,
            fontFamily: "GmarketSansMedium",
            fontWeight: "900",
            fontSize: "2rem",
          }}
        >
          <p>같이 여행 갈래요?</p>
          <p style={{ color: "#064b69" }}>지금 가면 항공권 40% 할인</p>

          <br />
          <br />
          <p style={{ fontSize: "1.1rem" }}>생각만해도 설레는 특가</p>
          <p style={{ fontSize: "1.1rem" }}>놓치기는 너무 아쉬운데</p>
        </Box>
      </Card>

      <Center>
        <Box mt={"50px"} w={"55%"}>
          <Card
            w={"400px"}
            h={"50px"}
            textAlign={"center"}
            mb={10}
            onClick={() => navigate("list?type=bus")}
            _hover={{ cursor: "pointer", color: "#509896" }}
            lineHeight={"50px"}
          >
            <Box
              fontWeight={"900"}
              fontSize={"1.2rem"}
              style={{ fontFamily: "GmarketSansMedium" }}
            >
              🚎 버스 카테고리 게시글
            </Box>
          </Card>

          <Flex justifyContent={"center"} flexWrap={"wrap"}>
            <SimpleGrid columns={4} w={"100%"} spacing={9}>
              {listBus.map(
                (bus) =>
                  bus.typeName === "bus" && (
                    <Box
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      _hover={{ cursor: "pointer" }}
                      onClick={() => navigate("/transport/" + bus.tid)}
                      key={bus.tid}
                    >
                      <Box position="relative" overflow={"hidden"}>
                        <Image src={bus.url} h={"100%"} />
                      </Box>
                      <Box p={3}>
                        <Box display="flex" alignItems="baseline">
                          <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                          ></Box>
                          <Box>
                            <Box
                              fontWeight="bold"
                              fontSize={"large"}
                              as="h4"
                              lineHeight="tight"
                              noOfLines={1}
                            >
                              {bus.transTitle}
                            </Box>
                            <Box
                              as="h4"
                              lineHeight="tight"
                              noOfLines={1}
                              fontWeight={"bold"}
                              color={"gray"}
                            >
                              [{bus.transStartLocation}] &nbsp;
                              <FontAwesomeIcon icon={faAnglesRight} />
                              &nbsp; [{bus.transArriveLocation}]
                            </Box>
                            <Box as="h4" lineHeight="tight" noOfLines={1}>
                              {bus.transAddress}
                            </Box>
                            <Box
                              display="flex"
                              mt="2"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Box
                                fontSize={"1.1rem"}
                                textColor={"#509896"}
                                fontWeight={"900"}
                              >
                                {parseInt(bus.transPrice).toLocaleString(
                                  "ko-KR",
                                )}
                                {/*{transport.transPrice}*/}
                                &nbsp;원
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ),
              )}
            </SimpleGrid>
          </Flex>
        </Box>
      </Center>

      <Box mt={10} boxShadow={"1px 2px 1px 2px #f5f6f6"}></Box>

      <Center>
        <Box mt={10} w={"55%"}>
          <Card
            w={"400px"}
            h={"50px"}
            textAlign={"center"}
            mb={10}
            onClick={() => navigate("list?type=air")}
            _hover={{ cursor: "pointer", color: "#509896" }}
            lineHeight={"50px"}
          >
            <Box
              fontWeight={"900"}
              fontSize={"1.2rem"}
              style={{ fontFamily: "GmarketSansMedium" }}
            >
              🛫항공 카테고리 게시글
            </Box>
          </Card>

          <Flex justifyContent={"center"} flexWrap={"wrap"}>
            <SimpleGrid columns={4} w={"100%"} spacing={9}>
              {listAir.map(
                (air) =>
                  air.typeName === "air" && (
                    <Box
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      _hover={{ cursor: "pointer" }}
                      onClick={() => navigate("/transport/" + air.tid)}
                      key={air.tid}
                    >
                      <Box position="relative" overflow={"hidden"}>
                        <Image src={air.url} h={"100%"} />
                      </Box>
                      <Box p={3}>
                        <Box display="flex" alignItems="baseline">
                          <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                          ></Box>
                          <Box>
                            <Box
                              fontWeight="bold"
                              fontSize={"large"}
                              as="h4"
                              lineHeight="tight"
                              noOfLines={1}
                            >
                              {air.transTitle}
                            </Box>
                            <Box
                              as="h4"
                              lineHeight="tight"
                              noOfLines={1}
                              fontWeight={"bold"}
                              color={"gray"}
                            >
                              [{air.transStartLocation}] &nbsp;
                              <FontAwesomeIcon icon={faAnglesRight} />
                              &nbsp; [{air.transArriveLocation}]
                            </Box>
                            <Box as="h4" lineHeight="tight" noOfLines={1}>
                              {air.transAddress}
                            </Box>
                            <Box
                              display="flex"
                              mt="2"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Box
                                fontSize={"1.1rem"}
                                textColor={"#509896"}
                                fontWeight={"900"}
                              >
                                {parseInt(air.transPrice).toLocaleString(
                                  "ko-KR",
                                )}
                                &nbsp;원
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        position="fixed" // 절대 위치를 사용해 오버레이 설정
                        top="300" // 배너의 상단에서 시작
                        right="2" // 배너의 우측에서 시작
                        zIndex="10" // 다른 요소보다 위에 오도록 z-index 설정
                        p="4" // 패딩 값
                        bg="rgba(255, 255, 255, 0.3)" // 배경색
                        boxShadow="lg" // 그림자 효과
                        maxW="sm" // 최대 너비 설정
                        overflow="hidden" // 내용이 넘치면 숨김
                        borderRadius="15px"
                      >
                        <RecentViewed />
                      </Box>
                    </Box>
                  ),
              )}
            </SimpleGrid>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
}
