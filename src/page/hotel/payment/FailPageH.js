import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Center, Icon, Text, VStack } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export function FailPageH() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <Box w="80%" ml="10%">
      <Center h="100vh">
        <VStack spacing={4} bg="white" p={10} rounded="lg" boxShadow="md">
          <FontAwesomeIcon icon={faCircleXmark} color="red" fontSize={50} />
          <Text fontSize="lg" fontWeight="bold">
            결재 실패
          </Text>
          <Text fontSize="md">{`사유: ${searchParams.get("message")}`}</Text>
          <Button colorScheme="gray" w="full" onClick={() => navigate(-2)}>
            {" "}
            이전 페이지{" "}
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}
