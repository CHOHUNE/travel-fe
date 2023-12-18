import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Icon,
  Img,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { InfoOutlineIcon, PhoneIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RBanner } from "./Banner/RBanner";
import { LBanner } from "./Banner/LBanner";

export function NoticeSound() {
  const navigate = useNavigate();

  return (
    <Box w="80%" ml="10%">
      <Box w="80%" ml="10%">
        <Flex>
          <Box w="20%" padding={"10px"}>
            <LBanner />
          </Box>

          <Box
            w="60%"
            padding={"10px"}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab
                  _selected={{ color: "black", fontWeight: "bold" }}
                  _focus={{ boxShadow: "none" }}
                >
                  소비자 중심 경영
                </Tab>
                <Tab
                  _selected={{ color: "black", fontWeight: "bold" }}
                  _focus={{ boxShadow: "none" }}
                >
                  고객 헌장
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Img
                    src={
                      "https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/%EC%86%8C%EB%B9%84%EC%9E%90+%EC%A4%91%EC%8B%AC+%EA%B2%BD%EC%98%81.jpg"
                    }
                    alt="소비자 중심 경영"
                  />
                </TabPanel>
                <TabPanel>
                  <Img
                    src={
                      "https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/%EA%B3%A0%EA%B0%9D+%ED%97%8C%EC%9E%A5.jpg"
                    }
                    alt="고객 헌장"
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <Box w={"20%"} padding={"10px"}>
            <RBanner />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
