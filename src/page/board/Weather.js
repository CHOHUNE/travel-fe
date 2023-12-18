import { Box, Flex, Input, Text } from "@chakra-ui/react";
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
          </Box>

          <Box w={"20%"} padding={"10px"}>
            <RBanner />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
