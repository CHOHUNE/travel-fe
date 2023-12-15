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
      <Card h={"500px"}>
        <Center>
          <video style={{ height: "500px", zIndex: 2 }} autoPlay loop muted>
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
            backgroundColor: "#f4e8cd",
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
            fontFamily: "YEONGJUPunggiGinsengTTF",
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

      <Box ml={"12.5%"} mt={"50px"}>
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
            fontWeight={900}
            fontSize={"1.2rem"}
            style={{ fontFamily: "Pretendard-Regular" }}
          >
            🚎 버스 카테고리 게시글
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
                      </Box>
                    </Center>
                  </CardBody>
                </Card>
              ),
          )}
        </Flex>
      </Box>
      <Box ml={"12.5%"} mt={10} mb={20}>
        <Card
          w={"400px"}
          h={"50px"}
          textAlign={"center"}
          mb={10}
          onClick={() => navigate("list?type=air")}
          _hover={{ cursor: "pointer", color: "#509896" }}
          lineHeight={"50px"}
        >
          <Box fontWeight={900} fontSize={"1.2rem"}>
            🛫 항공 카테고리 게시글
          </Box>
        </Card>
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
                      >
                        <RecentViewed />
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
