import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Image,
  Heading,
  Input,
  Stack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { LBanner } from "./Banner/LBanner";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { RBanner } from "./Banner/RBanner";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Weather() {
  const navigate = useNavigate();
  const API_KEY = "985c5eb268728c7749b67d03c99b6c37";
  const [locaion, setLocaion] = useState("");
  const [result, setResult] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${locaion}&appid=${API_KEY}`;

  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await axios({
          method: "get",
          url: url,
        });
        console.log(data);
        setResult(data);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <Box w="80%" ml="10%">
      <br />
      <br />
      <Box w="80%" ml="10%">
        <Flex textAlign={"center"}>
          <Box w="20%" padding={"10px"}>
            <LBanner />
          </Box>

          <Box w="60%" padding={"10px"}>
            <Input
              placeholder="도시를 입력하세요 "
              type="text"
              onChange={(e) => setLocaion(e.target.value)}
              onKeyDown={searchWeather}
            />
            {Object.keys(result).length !== 0 && (
              <Box>
                <div> {result.data.name}</div>
                <div>
                  {" "}
                  {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C
                </div>
                <div> {result.data.weather[0].main}</div>
              </Box>
            )}
            <SimpleGrid
              spacing={2}
              templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            >
              <Card maxW="sm">
                <CardBody>
                  <Image
                    src="
                    https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/42/ferdinand-stohr-PeFk7fzxTdk-unsplash.jpg"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md"> 뉴욕 날씨</Heading>
                    <Text color="blue.600" fontSize="2xl">
                      32 °C
                    </Text>
                    <Text>Sunny </Text>
                  </Stack>
                </CardBody>
              </Card>
              <Card maxW="sm">
                <CardBody>
                  <Image
                    src="
                    https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/42/cristina-gottardi-I1Lv2yX67GI-unsplash.jpg"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">로마 날씨</Heading>
                    <Text color="blue.600" fontSize="2xl">
                      25 °C
                    </Text>
                    <Text>Rain</Text>
                  </Stack>
                </CardBody>
              </Card>

              <Card maxW="sm">
                <CardBody>
                  <Image
                    src="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/44/%ED%95%9C%EA%B5%AD.jpg"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">한국 날씨</Heading>
                    <Text color="blue.600" fontSize="2xl">
                      25 °C
                    </Text>
                    <Text>Rain</Text>
                  </Stack>
                </CardBody>
              </Card>
              <Card maxW="sm">
                <CardBody>
                  <Image
                    src="
                   https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/43/dan-calderwood-PBokKdfU7ic-unsplash.jpg"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">두바이 날씨</Heading>
                    <Text color="blue.600" fontSize="2xl">
                      25 °C
                    </Text>
                    <Text>Rain</Text>
                  </Stack>
                </CardBody>
              </Card>
              <Card maxW="sm">
                <CardBody>
                  <Image
                    src="
                    https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/43/ilnur-kalimullin-CB0Qrf8ib4I-unsplash.jpg"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">프랑스 날씨</Heading>
                    <Text color="blue.600" fontSize="2xl">
                      25 °C
                    </Text>
                    <Text>Rain</Text>
                  </Stack>
                </CardBody>
              </Card>
              <Card maxW="sm">
                <CardBody>
                  <Image
                    src="
                   https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/44/%EC%9D%BC%EB%B3%B8.jpg"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">일본 날씨</Heading>
                    <Text color="blue.600" fontSize="2xl">
                      25 °C
                    </Text>
                    <Text>Rain</Text>
                  </Stack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>

          <Box w={"20%"} padding={"10px"}>
            <RBanner />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
