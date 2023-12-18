import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Icon,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { InfoOutlineIcon, PhoneIcon } from "@chakra-ui/icons";
import React from "react";

export function RBanner() {
  return (
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
            <Text pt="2" fontSize="md" fontWeight="bold" color={"skyblue"}>
              1544-5252
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              <Icon as={PhoneIcon} /> 해외/국내 항공상담
            </Heading>
            <Text pt="2" fontSize="md" fontWeight="bold" color={"skyblue"}>
              1544-5353
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              <Icon as={PhoneIcon} /> 부산/대구출발 여행상담
            </Heading>
            <Text pt="2" fontSize="md" fontWeight="bold" color={"skyblue"}>
              1544-6722
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              <Icon as={PhoneIcon} /> 기업행사/출장문의
            </Heading>
            <Text pt="2" fontSize="md" fontWeight="bold" color={"skyblue"}>
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
              *해외/국내 여행 및 항공상담 평일 9:00 ~ 18:00 (토/일요일 및 공휴일
              휴무)
            </Text>
            <Text pt="2" fontSize="11px">
              *항공권은 전화상담 예약 시 항공료 외 별도의 취급 수수료가
              발생합니다.
            </Text>
            <Text pt="2" fontSize="11px">
              *항공 시스템 결제요청, 환불/변경 문의 평일 9:00 ~ 17:00 (토/일요일
              및 공휴일 휴무)
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
