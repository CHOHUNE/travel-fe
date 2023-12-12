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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function PageButton({ variant, pageNumber, children }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  function handleClick() {
    params.set("p", pageNumber);
    navigate("?" + params);
  }

  return (
    <Button variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
}

function Pagination({ pageInfo }) {
  const pageNumbers = [];

  const navigate = useNavigate();

  for (let i = pageInfo.startPageNumber; i <= pageInfo.endPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Center mt={5}>
      <Box>
        {pageInfo.prevPageNumber && (
          <PageButton variant="ghost" pageNumber={pageInfo.prevPageNumber}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </PageButton>
        )}

        {pageNumbers.map((pageNumber) => (
          <PageButton
            key={pageNumber}
            variant={
              pageNumber === pageInfo.currentPageNumber ? "solid" : "ghost"
            }
            pageNumber={pageNumber}
          >
            {pageNumber}
          </PageButton>
        ))}

        {pageInfo.nextPageNumber && (
          <PageButton variant="ghost" pageNumber={pageInfo.nextPageNumber}>
            <FontAwesomeIcon icon={faAngleRight} />
          </PageButton>
        )}
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

  const toast = useToast();

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
    axios
      .get("/api/member/list?" + params.toString())
      .then((response) => {
        setList(response.data.memberList);
        setPageInfo(response.data.pageInfo);
      })
      .catch((error) => {
        navigate("/login");
        toast({
          description: "권한이 없습니다.",
          status: "error",
        });
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
