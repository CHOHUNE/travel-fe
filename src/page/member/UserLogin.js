import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  FormControl,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function UserLogin() {
  // -------------------- 로그인 상태 --------------------
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

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
          status: "success",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          description: "아이디와 암호를 다시 확인해주세요.",
          status: "warning",
        });
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
          </Box>
        </CardFooter>
      </Card>
    </Center>
  );
}
