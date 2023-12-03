import { Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../App";

export function NavBar() {
  const { fetchLogin, login, isAuthenticated } = useContext(LoginContext);
  const toast = useToast();
  const navigate = useNavigate();

  function handleLogout() {
    axios
      .post("/api/member/logout")
      .then(() => {
        toast({
          description: "로그아웃 되었습니다.",
          status: "info",
        });
        navigate("/");
      })
      .finally(() => {
        fetchLogin();
      });
  }

  return (
    <Box>
      {/* 헤더 네브바1 */}
      <Box w="80%" h={"80px"} bgColor={"#eeecec"} ml="10%">
        <Flex justifyContent={"space-between"} textAlign={"center"}>
          {/* 프로젝트 로고 */}
          <Box
            w={"200px"}
            background="#b0daeb"
            lineHeight={"80px"}
            ml={2}
            onClick={() => navigate("/")}
          >
            프로젝트 로고
          </Box>

          {/* 검색창 */}
          <Flex alignItems={"center"} gap={2}>
            <Input w={"400px"} backgroundColor={"#b0daeb"} />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Flex>

          {/* 회원정보, 회원가입, 로그인 버튼 */}
          <Flex alignItems={"center"}>
            {isAuthenticated() && (
              <Button
                w={"50px"}
                h={"60px"}
                borderRadius={0}
                fontSize={"0.8rem"}
                lineHeight={"80px"}
                backgroundColor={"#b0daeb"}
                onClick={() => navigate("userEdit")}
              >
                회원수정
              </Button>
            )}
            {isAuthenticated() || (
              <Button
                w={"50px"}
                h={"60px"}
                borderRadius={0}
                fontSize={"0.8rem"}
                ml={4}
                backgroundColor={"#b0daeb"}
                onClick={() => navigate("signup")}
              >
                회원가입
              </Button>
            )}
            {isAuthenticated() || (
              <Button
                w={"50px"}
                h={"60px"}
                borderRadius={0}
                fontSize={"0.8rem"}
                ml={4}
                mr={2}
                backgroundColor={"#b0daeb"}
                onClick={() => navigate("login")}
              >
                로그인
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                w={"50px"}
                h={"60px"}
                borderRadius={0}
                fontSize={"0.8rem"}
                ml={4}
                mr={2}
                backgroundColor={"#b0daeb"}
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>
      {/* 헤더 네브바2 */}
      <Box w="80%" h={"60px"} bgColor={"#eeeccc"} ml="10%">
        <Flex justifyContent={"space-between"} textAlign={"center"}>
          <Flex ml={2} lineHeight={"60px"} alignItems={"center"} mt={"10px"}>
            <Button w={"100px"} h={"40px"}>
              전체메뉴
            </Button>

            {/* 호텔 */}
            <Button
              w={"100px"}
              h={"40px"}
              ml={1}
              onClick={() => navigate("hotel")}
            >
              호텔 / 숙박
            </Button>

            {/* 운송 */}
            <Button
              w={"100px"}
              h={"40px"}
              ml={1}
              onClick={() => navigate("transport")}
            >
              항공 / 운송
            </Button>
          </Flex>
          <Button
            w={"100px"}
            h={"40px"}
            mr={2}
            mt={"10px"}
            fontSize={"0.8rem"}
            onClick={() => navigate("board")}
          >
            게시판 / 커뮤니티
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
