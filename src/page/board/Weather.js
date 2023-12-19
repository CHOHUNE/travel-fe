import {
  Box,
  Flex,
  Input,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { LBanner } from "./Banner/LBanner";
import { RBanner } from "./Banner/RBanner";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RMW } from "./weather/F/RMW";
import { NYW } from "./weather/F/NYW";
import { KRW } from "./weather/F/KRW";
import { DUW } from "./weather/F/DUW";
import { PAW } from "./weather/F/PAW";
import { TKW } from "./weather/F/TKW";
import { Seoul } from "./weather/D/Seoul";
import { Busan } from "./weather/D/Busan";
import { Gangneung } from "./weather/D/Gangneung";
import { Incheon } from "./weather/D/Incheon";
import { Jeonju } from "./weather/D/Jeonju";
import { Jeju } from "./weather/D/Jeju";

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
              <Box fontSize={"lg"}>
                <br />
                <Box fontSize={"25px"}> {result.data.name}</Box>
                <Box color={"blue.500"}>
                  {" "}
                  {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C
                </Box>
                <Box fontSize={"15px"}> {result.data.weather[0].main}</Box>
              </Box>
            )}
            <br />
            <br />

            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab
                  _selected={{
                    color: "white",
                    bgColor: "blue.500",
                  }}
                >
                  해외 도시 날씨
                </Tab>
                <Tab
                  _selected={{
                    color: "white",
                    bgColor: "blue.500",
                  }}
                  _focus={{ boxShadow: "none" }}
                >
                  국내 도시 날씨
                </Tab>
              </TabList>{" "}
              <TabPanels>
                <TabPanel>
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
                </TabPanel>
                <TabPanel>
                  <SimpleGrid
                    spacing={2}
                    templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                  >
                    <Seoul />
                    <Busan />
                    <Incheon />
                    <Jeonju />
                    <Gangneung />
                    <Jeju />
                  </SimpleGrid>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <Box w={"20%"} padding={"10px"}>
            <RBanner />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
