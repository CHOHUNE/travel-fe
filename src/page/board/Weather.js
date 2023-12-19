import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LBanner } from "./Banner/LBanner";
import { RBanner } from "./Banner/RBanner";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RMW } from "./weather/RMW";
import { NYW } from "./weather/NYW";
import { KRW } from "./weather/KRW";
import { DUW } from "./weather/DUW";
import { PAW } from "./weather/PAW";
import { TKW } from "./weather/TKW";

export function Weather() {
  const navigate = useNavigate();
  const API_KEY = "985c5eb268728c7749b67d03c99b6c37";
  const [locaion, setLocaion] = useState("");
  const [result, setResult] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${locaion}&Gangwon-doappid=${API_KEY}`;

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
              <NYW />
              <RMW />
              <KRW />
              <DUW />
              <PAW />
              <TKW />
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
