import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function Busan() {
  const [result, setResult] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=Busan&appid=985c5eb268728c7749b67d03c99b6c37`;

  useEffect(() => {
    axios.get(url).then((response) => setResult(response.data));
  }, []);
  if (result === null) {
    return <Spinner />;
  }

  return (
    <Card maxW="sm" textAlign={"center"}>
      <CardBody>
        <Image
          src="
         https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/51/%EB%B6%80%EC%82%B0.jpg"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />

        <Stack mt="6" spacing="3">
          <Heading size="md"> 부산 날씨</Heading>
          <Text color="blue.600" fontSize="2xl">
            {Math.round((result.main.temp - 273.15) * 10) / 10}°C
          </Text>
          <Image
            margin={"auto"}
            h={"70px"}
            w={"70px"}
            src={`https://openweathermap.org/img/wn/${result.weather[0].icon}.png`}
          />
          <Text> {result.weather[0].main} </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
