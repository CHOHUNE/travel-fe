import { Box, Flex } from "@chakra-ui/react";
import App from "../page/hotel/App";
import React from "react";
import { RecentViewed } from "./RecentViewed";

export function HomeBody() {
  return (
    <Box>
      <Box w={"100%"} h={"700px"}>
        <Flex justifyContent={"space-around"} alignItems={"center"}>
          <Box borderRadius={"10px"} w={"100%"} h={"500px"} mt={"20px"}>
            <App />
          </Box>
          <Box
            position="fixed" // 절대 위치를 사용해 오버레이 설정
            top="300" // 배너의 상단에서 시작
            right="10" // 배너의 우측에서 시작
            zIndex="10" // 다른 요소보다 위에 오도록 z-index 설정
            p="4" // 패딩 값
            bg="rgba(255, 255, 255, 0.5)" // 배경색
            boxShadow="lg" // 그림자 효과
            maxW="sm" // 최대 너비 설정
            overflow="hidden" // 내용이 넘치면 숨김
          >
            <RecentViewed />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
