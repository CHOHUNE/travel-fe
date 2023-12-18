import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../../component/LoginProvider";

export function UserNavBar(props) {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const location = useLocation();
  const urlParams = new URLSearchParams();

  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    fetchLogin();
  }, [location]);

  if (login !== "") {
    urlParams.set("userId", login.userId);
  }
  console.log(urlParams);

  if (user === null) {
    return <Spinner />;
  }

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    switch (buttonName) {
      case "reservationList":
        navigate("/user/reservationList?" + urlParams.toString());
        break;
      case "userInfo":
        navigate("/user?" + urlParams.toString());
        break;
      case "bucket":
        navigate("/user/bucket?" + urlParams.toString());
        break;
      case "delete":
        navigate("/user/delete?" + urlParams.toString());
        break;
      default:
        break;
    }
  };

  return (
    <Center w={"100%"}>
      <VStack spacing={10} w={"100%"} mt={10}>
        <Flex
          direction="column" // column 방향으로 요소를 정렬합니다.
          justify="center" // 수평 중앙 정렬
          textIndent={"11%"}
          h="100px" // 컨테이너의 높이를 지정합니다.
          w="100%" // 컨테이너의 너비를 지정합니다.
          background="#3182CE" // 배경색을 지정합니다.
        >
          <Text fontSize={"2.2rem"} color="white">
            마이페이지
          </Text>
        </Flex>
        <Box>
          {/*<Flex mt={10} alignItems={"center"}>*/}
          <HStack spacing={4}>
            <Button
              fontWeight={"400"}
              variant="ghost"
              borderRadius="0"
              onClick={() => handleButtonClick("reservationList")}
              background={activeButton === "reservationList" ? "#EDF2F7" : ""}
              fontWeight={activeButton === "reservationList" ? "700" : "400"}
            >
              나의예약현황
            </Button>
            <Button
              fontWeight={"400"}
              variant="ghost"
              borderRadius="0"
              onClick={() => handleButtonClick("userInfo")}
              background={activeButton === "userInfo" ? "#EDF2F7" : ""}
              fontWeight={activeButton === "userInfo" ? "700" : "400"}
            >
              회원정보수정
            </Button>
            <Button
              fontWeight={"400"}
              variant="ghost"
              borderRadius="0"
              onClick={() => handleButtonClick("bucket")}
              background={activeButton === "bucket" ? "#EDF2F7" : ""}
              fontWeight={activeButton === "bucket" ? "700" : "400"}
            >
              찜하기
            </Button>
            <Button
              fontWeight={"400"}
              variant="ghost"
              borderRadius="0"
              onClick={() => navigate("/boardwrite")}
            >
              1:1 문의
            </Button>
            <Button
              fontWeight={"400"}
              variant="ghost"
              borderRadius="0"
              onClick={() => handleButtonClick("delete")}
              background={activeButton === "delete" ? "#EDF2F7" : ""}
              fontWeight={activeButton === "delete" ? "700" : "400"}
            >
              회원탈퇴
            </Button>
          </HStack>
          {/*</Flex>*/}
        </Box>
      </VStack>
    </Center>
  );
}

export default UserNavBar;
