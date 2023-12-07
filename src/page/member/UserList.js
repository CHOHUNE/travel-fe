import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Center,
  ChakraProvider,
  extendTheme,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  theme,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Pagination({ pageInfo }) {
  const pageNumbers = [];

  const navigate = useNavigate();

  if (!pageInfo) {
    return null;
  }

  for (let i = pageInfo.startPageNumber; i <= pageInfo.lastPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Center mt={5}>
      <Box>
        {pageNumbers.map((pageNumber) => (
          <Button
            mr={2}
            key={pageNumber}
            onClick={() => navigate("?p=" + pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
      </Box>
    </Center>
  );
}

export function UserList() {
  const [list, setList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const theme = extendTheme({
    styles: {
      global: {
        th: {
          textAlign: "center",
        },
      },
    },
  });

  useEffect(() => {
    axios.get("/api/member/list?" + params.toString()).then((response) => {
      setList(response.data.memberList);
      setPageInfo(response.data.pageInfo);
    });
  }, [location]);

  if (list === null) {
    return <Spinner />;
  }

  function handleTableRowClick(userId) {
    const params = new URLSearchParams();
    params.set("userId", userId);
    navigate("/user?" + params.toString());
  }

  return (
    <ChakraProvider theme={theme}>
      <Center m={20}>
        <Card w={"80%"}>
          <Heading textAlign={"center"} m={3}>
            회원 목록
          </Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>name</Th>
                <Th>password</Th>
                <Th>email</Th>
                <Th>PhoneNumber</Th>
                <Th>가입일시</Th>
              </Tr>
            </Thead>
            <Tbody>
              {list.map((member) => (
                <Tr
                  _hover={{ cursor: "pointer" }}
                  onClick={() => handleTableRowClick(member.userId)}
                  key={member.userId}
                >
                  <Td>{member.userId}</Td>
                  <Td>{member.userName}</Td>
                  <Td>{member.userPassword}</Td>
                  <Td>{member.userEmail}</Td>
                  <Td>{member.userPhoneNumber}</Td>
                  <Td>{member.ago}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Box>
            <Pagination pageInfo={pageInfo} />
          </Box>
        </Card>
      </Center>
    </ChakraProvider>
  );
}
