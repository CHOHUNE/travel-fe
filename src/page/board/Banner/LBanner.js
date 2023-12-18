import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export function LBanner() {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <Heading size="md">투어 고객센터</Heading>
      </CardHeader>

      <CardBody textAlign={"left"}>
        <Box>
          <Divider my="2" />
          <Box>
            <Text
              fontSize="md"
              _hover={{ cursor: "pointer", color: "skyblue" }}
              onClick={() => navigate("/notice")}
            >
              자주 찾는 질문
            </Text>
          </Box>

          <Divider my="4" />
          <Box>
            <Text
              fontSize="md"
              _hover={{ cursor: "pointer", color: "skyblue" }}
              onClick={() => navigate("/boardList")}
            >
              게 시 판
            </Text>
          </Box>
          {/* 구분선 추가 */}
          <Divider my="4" />
          <Box>
            <Text
              fontSize="md"
              _hover={{ cursor: "pointer", color: "skyblue" }}
              onClick={() => navigate("/boardwrite")}
            >
              고객의 소리
            </Text>
          </Box>

          <Divider my="4" />
          <Box>
            <Text
              fontSize="md"
              _hover={{ cursor: "pointer", color: "skyblue" }}
              onClick={() => navigate("/NoticeSound")}
            >
              소비자 중심 경영
            </Text>
          </Box>
          <Divider my="4" />
          <Box>
            <Text
              fontSize="md"
              _hover={{ cursor: "pointer", color: "skyblue" }}
              onClick={() => navigate("/Kakao")}
            >
              TRAVEL투어 지점 찾기
            </Text>
          </Box>

          <Divider my="4" />
          <Box>
            <Text
              fontSize="md"
              _hover={{ cursor: "pointer", color: "skyblue" }}
              onClick={() => navigate("/weather")}
            >
              유명 명소 날씨
            </Text>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
}
