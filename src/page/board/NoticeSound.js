import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Image,
  Img,
  Input,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import { InfoOutlineIcon, PhoneIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

export function NoticeSound() {
  const navigate = useNavigate();

  return (
    <Box w="80%" ml="10%">
      <Flex>
        <Box w="20%" padding={"10px"}>
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
                    _hover={{ cursor: "pointer", color: "green" }}
                    onClick={() => navigate("/notice")}
                  >
                    자주 찾는 질문
                  </Text>
                </Box>

                <Divider my="4" />
                <Box>
                  <Text
                    fontSize="md"
                    _hover={{ cursor: "pointer", color: "green" }}
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
                    _hover={{ cursor: "pointer", color: "green" }}
                    onClick={() => navigate("/boardwrite")}
                  >
                    고객의 소리
                  </Text>
                </Box>

                <Divider my="4" />
                <Box>
                  <Text
                    fontSize="md"
                    _hover={{ cursor: "pointer", color: "green" }}
                    onClick={() => navigate("/NoticeSound")}
                  >
                    소비자 중심 경영
                  </Text>
                </Box>
              </Box>
            </CardBody>
          </Card>
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
          <Card>
            <CardHeader>
              <Heading size="md">투어 고객센터</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <Icon as={PhoneIcon} /> 해외/국내 여행상담
                  </Heading>
                  <Text pt="2" fontSize="md" fontWeight="bold" color={"green"}>
                    1544-5252
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <Icon as={PhoneIcon} /> 해외/국내 항공상담
                  </Heading>
                  <Text pt="2" fontSize="md" fontWeight="bold" color={"green"}>
                    1544-5353
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <Icon as={PhoneIcon} /> 부산/대구출발 여행상담
                  </Heading>
                  <Text pt="2" fontSize="md" fontWeight="bold" color={"green"}>
                    1544-6722
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <Icon as={PhoneIcon} /> 기업행사/출장문의
                  </Heading>
                  <Text pt="2" fontSize="md" fontWeight="bold" color={"green"}>
                    1661-4873
                  </Text>
                  <Text pt="2" fontSize="sm" color={"gray"}>
                    https://biz.tour.com
                  </Text>
                </Box>
                <Box textAlign={"left"}>
                  <Heading size="xs" textTransform="uppercase" p="2">
                    <Icon as={InfoOutlineIcon} /> 상담시간 안내
                  </Heading>

                  <Text pt="2" fontSize="11px">
                    *해외/국내 여행 및 항공상담 평일 9:00 ~ 18:00 (토/일요일 및
                    공휴일 휴무)
                  </Text>
                  <Text pt="2" fontSize="11px">
                    *항공권은 전화상담 예약 시 항공료 외 별도의 취급 수수료가
                    발생합니다.
                  </Text>
                  <Text pt="2" fontSize="11px">
                    *항공 시스템 결제요청, 환불/변경 문의 평일 9:00 ~ 17:00
                    (토/일요일 및 공휴일 휴무)
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
}
