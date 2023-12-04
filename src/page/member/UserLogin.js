import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  Heading,
  Img,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { LoginContext } from "../../component/LoginProvider";

export function UserLogin() {
  // -------------------- 로그인 상태 --------------------
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { fetchLogin } = useContext(LoginContext);

  // -------------------- toast / navigate --------------------
  const toast = useToast();
  const navigate = useNavigate();

  // -------------------- 로그인 정보 백엔드로 넘기는 로직 --------------------
  function handleLogin() {
    axios
      .post("/api/member/login", { userId, userPassword })
      .then(() => {
        toast({
          description: "로그인 성공하였습니다.",
          status: "info",
        });
        // sessionStorage.setItem("userId", userId);
        navigate("/");
      })
      .catch(() => {
        toast({
          description: "아이디와 암호를 다시 확인해주세요.",
          status: "warning",
        });
      })
      .finally(() => {
        fetchLogin();
      });
  }

  // -------------------- 카카오 로그인 --------------------
  function handleKakaoLogin() {
    // 프론트에서 서버로 카카오 로그인을 위한 정보 요청
    axios
      .get("/api/member/kakaoKey")
      .then((response) => {
        // response에서 받은 키 정보를 사용하여 카카오 로그인 URL 생성
        const kakaourl = `https://kauth.kakao.com/oauth/authorize?client_id=${response.data.key}&redirect_uri=${response.data.redirect}&response_type=code&prompt=login`;
        // 여기서 URL로 리디렉션하면 사용자는 카카오 로그인 페이지로 이동
        window.location.href = kakaourl;
      })
      .catch((error) => {
        console.error("카카오 키 가져오는 중 오류 발생 : ", error);
      });
  }

  // -------------------- 로그인 폼 --------------------
  return (
    <Center m={20}>
      <Card w={"lg"}>
        <CardHeader>
          <Heading textAlign={"center"}>로그인</Heading>
        </CardHeader>

        <CardBody>
          <Box w={"80%"} m={"auto"}>
            <FormControl mb={5}>
              <Input
                value={userId}
                w={"100%"}
                placeholder="아이디 입력"
                onChange={(e) => setUserId(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <Input
                type="password"
                value={userPassword}
                w={"100%"}
                placeholder="비밀번호 입력"
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </FormControl>
          </Box>
        </CardBody>

        <CardFooter>
          <Box w={"80%"} m={"auto"}>
            <Button colorScheme="blue" w={"100%"} onClick={handleLogin}>
              로그인
            </Button>

            <Center w={"100%"} justifyContent={"space-around"} mt={5}>
              <Link to={"/"}>아이디 찾기</Link>
              <Link to={"/"}>비밀번호 찾기</Link>
              <Link to={"/signup"}>회원가입</Link>
            </Center>

            <Center w={"100%"}>
              <Flex w={"60px"} justifyContent={"space-around"} mt={10}>
                {/* 카카오 로그인 이미지 */}
                <Img
                  _hover={{
                    cursor: "pointer",
                  }}
                  src="https://image.hanatour.com/usr/static/img2/mobile/com/btn_kakao_192x192.png"
                  onClick={handleKakaoLogin}
                  mr={20}
                />

                {/* 네이버 로그인 이미지 */}
                <Img
                  _hover={{
                    cursor: "pointer",
                  }}
                  src="https://image.hanatour.com/usr/static/img2/mobile/com/btn_naver_192x192.png"
                />
              </Flex>
            </Center>
          </Box>
        </CardFooter>
      </Card>
    </Center>
  );
}
