import { Box, Button, Flex } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box w={"100%"} height={"220px"} backgroundColor={"#eeecee"}>
      <Flex
        w={"80%"}
        height={"100%"}
        ml={"220px"}
        backgroundColor={"#d9d9d9"}
        justifyContent={"space-between"}
      >
        <Box
          // border={"3px solid black"}
          ml={"40px"}
          paddingTop={"20px"}
          width={"300px"}
          height={"150px"}
        >
          (주) Travel 여행가자 <br />
          주소 : 서울시 마포구 신촌로 176 <br />
          관리자 : 조대훈 최재희 이승원 이정훈 <br />
          문의번호 : 000-0000-0000 <br />
          문의메일 : ㅁㅁㅁ@ㅁㅁㅁ.ㅁㅁㅁ
        </Box>
        <Box paddingTop={10}>
          <Flex gap={6}>
            <Box paddingTop={4}>
              본 페이지는 졸업 프로젝트로 어떻한 영리적
              <br />
              활동도 하지 않는 사이트임을 알립니다.
            </Box>
            <Box mr={2}>
              <Button>조대훈</Button>
              <Button>이승원</Button>
              <br />
              <Button>최재희</Button>
              <Button>이정훈</Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
