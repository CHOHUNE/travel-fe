import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { InfoOutlineIcon, PhoneIcon } from "@chakra-ui/icons";
import { MapMarker, Map } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import { RBanner } from "./Banner/RBanner";
import { LBanner } from "./Banner/LBanner";
import axios from "axios";

export function Kakao(props) {
  const navigate = useNavigate();
  const API_KEY = "985c5eb268728c7749b67d03c99b6c37";
  const [locaion, setLocaion] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${locaion}&appid=${API_KEY}`;

  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await axios({
          method: "get",
          url: url,
        });
        console.log(data);
        // setResult(data);
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <Box w="80%" ml="10%">
      <br />
      <br />
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
          <Box>
            {/*<div> {result.data.name}</div>*/}
            {/*<div> {result.data.name}</div>*/}
          </Box>

          <Map
            center={{ lat: 37.56564, lng: 126.97939 }}
            style={{ width: "100%", height: "360px" }}
          >
            <MapMarker position={{ lat: 37.56564, lng: 126.97939 }}>
              <Text style={{ color: "#000", textAlign: "center" }}>
                TRAVEL 투어
              </Text>
            </MapMarker>
          </Map>
        </Box>

        <Box w={"20%"} padding={"10px"}>
          <RBanner />
        </Box>
      </Flex>
    </Box>
  );
}
