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
  Image,
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
    </Box>
  );
}
