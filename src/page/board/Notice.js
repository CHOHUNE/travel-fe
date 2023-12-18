import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Spacer,
  ButtonGroup,
  Button,
  Center,
  SimpleGrid,
  Input,
  VStack,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "@chakra-ui/react";
import { InfoOutlineIcon, PhoneIcon } from "@chakra-ui/icons";
import { type } from "@testing-library/user-event/dist/type";
import { RBanner } from "./Banner/RBanner";
import { LBanner } from "./Banner/LBanner";
export function Notice() {
  const [noticeList, setNoticeList] = useState([]); //map이 안된 이유 초기값이 없어서 []
  const navigate = useNavigate();

  useEffect(() => {
    handleSwitch(1);
  }, []);

  function handleSwitch(type) {
    axios
      .get("/api/notice/list?type=" + type)
      .then((response) => setNoticeList(response.data))
      .catch(() => console.log("b"))
      .finally(() => console.log("d"));
  }

  return (
    <Box w="80%" ml="10%">
      <br />
      <br />
      <Flex textAlign={"center"}>
        <Box w="20%" padding={"10px"}>
          <LBanner />
        </Box>
        <Box w="60%" padding={"10px"}>
          <Accordion defaultIndex={[0]} allowMultiple>
            <Heading size="md"> 자주 찾는 질문</Heading>
            <br></br>
            <Stack direction="row" spacing={3} padding={"5px"}>
              <Button
                size={"sm"}
                variant="outline"
                color={"green"}
                onClick={() => handleSwitch(1)}
              >
                {" "}
                급상승 질문{" "}
              </Button>
              <Button
                size={"sm"}
                variant="outline"
                color={"green"}
                onClick={() => handleSwitch(2)}
              >
                {" "}
                패키지 여행{" "}
              </Button>
              <Button
                size={"sm"}
                variant="outline"
                color={"green"}
                onClick={() => handleSwitch(3)}
              >
                {" "}
                자유 여행{" "}
              </Button>
              <Button
                size={"sm"}
                variant="outline"
                color={"green"}
                onClick={() => handleSwitch(4)}
              >
                {" "}
                항 공{" "}
              </Button>
              <Button
                size={"sm"}
                variant="outline"
                color={"green"}
                onClick={() => handleSwitch(5)}
              >
                {" "}
                호 텔{" "}
              </Button>
              <Button
                size={"sm"}
                variant="outline"
                color={"green"}
                onClick={() => handleSwitch(6)}
              >
                {" "}
                예 약 / 결 재{" "}
              </Button>
            </Stack>
            <br></br>

            {noticeList.map((notice) => (
              <AccordionItem key={notice.id}>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      padding={"15px"}
                      flex="1"
                      fontSize={"13px"}
                      as="b"
                      textAlign="left"
                    >
                      {notice.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>{notice.content}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
        <Box w={"20%"} padding={"10px"}>
          <RBanner />
        </Box>
      </Flex>
    </Box>
  );
}
