import { Box, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function HomeBody() {
  return (
    <Box>
      <Box w={"100%"} h={"600px"} backgroundColor={"#f5f8ec"}>
        <Flex justifyContent={"space-around"} alignItems={"center"}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <Box>홈페이지 광고판 입니다.</Box>
          <FontAwesomeIcon icon={faArrowRight} />
        </Flex>
      </Box>
    </Box>
  );
}
