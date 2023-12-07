import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <Box w={"100%"} height={"150px"} backgroundColor={"#eeecee"}>
      <Flex
        w={"80%"}
        ml={"10%"}
        height={"100%"}
        backgroundColor={"#d9d9d9"}
        justifyContent={"space-between"}
      >
        <Box ml={"40px"} paddingTop={"20px"} width={"300px"} height={"150px"}>
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
              <Button>
                <Link to={"https://github.com/CHOHUNE"}>조대훈</Link>
              </Button>
              <Button>
                <Link to={"https://github.com/Garbi93"}>이승원</Link>
              </Button>
              <br />
              <Button>
                <Link to={"https://github.com/travelerjh"}>최재희</Link>
              </Button>
              <Button>
                <Link to={"https://github.com/gns14585"}>이정훈</Link>
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
