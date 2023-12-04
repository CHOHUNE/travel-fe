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
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export function FindPwChange() {
  const [params] = useSearchParams();
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");

  // useEffect(() => {
  //   axios.get("/api/member?" + params.toString()).then((response) => {
  //     setUserId(response.data.userId);
  //   });
  // }, []);

  function handleSubmit() {
    axios
      .put("/api/member/findPwChange", {
        userPassword,
      })
      .then((response) => {
        console.log("응답 받음:", response.data);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  }

  return (
    <Center m={20}>
      <Card w={"lg"}>
        <CardHeader>
          <Heading textAlign={"center"}>비밀번호 변경</Heading>
        </CardHeader>

        <CardBody>
          <FormControl mb={3}>
            <Flex>
              <FormLabel
                w={170}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                새로운 비밀번호
              </FormLabel>
              <Input
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </Flex>
          </FormControl>

          <FormControl mb={3}>
            <Flex>
              <FormLabel
                w={170}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                비밀번호 확인
              </FormLabel>
              <Input
                value={userPasswordCheck}
                onChange={(e) => setUserPasswordCheck(e.target.value)}
              />
            </Flex>
          </FormControl>
        </CardBody>

        <CardFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            확인
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
}
