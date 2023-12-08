import React, { useEffect, useState } from "react";
import {
  Box,
  Button, ButtonGroup,
  Flex, Heading,
  Input, Spacer,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import * as PropTypes from "prop-types";

function PageButton({ variant, pageNumber, children }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  function handleClick() {
    params.set("p", pageNumber);
    navigate("/boardList?" + params);
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
    <Box w="80%" ml="10%"  display="flex" justifyContent="center" alignItems="center">
      <br/>
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
  );
}

function SearchComponent() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();


  function handleSearch() {
    // /?k=keyword
    const params = new URLSearchParams();
    params.set("k", keyword);
    navigate("/boardList?" + params);
  }
  return     (


    <Box w="80%" h={"60px"} ml="10%">

    <Flex justifyContent={"space-between"}>
      <select>
        <option value="Option1">전 체</option>
        <option value="Option2">제 목</option>
        <option value="Option3">내 용</option>
        <option value="Option3">작성자</option>
      </select>
      <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <Button onClick={handleSearch}>검색</Button>
    </Flex>
    </Box>);
}

export function BoardList() {
  const [boardList, setBoardList] = useState(null);
  const navigate = useNavigate();
const [params] = useSearchParams();
  const [pageInfo, setPageInfo] = useState(null);
  const location = useLocation();


  useEffect(() => {
    axios
      .get("/api/board/list?"+params)
      .then((response) =>{ setBoardList(response.data.boardList);
      setPageInfo(response.data.pageInfo)});

  }, [location]);

  if (boardList === null) {
    return <Spinner />;
  }


  return (
    <Box>
      <br/>
      <Box w="80%" h={"60px"} ml="10%">
        <Flex ml={2} lineHeight={"60px"} alignItems={"center"} mt={"3px"}>
          <Box p='2'>
            <Heading size='md' colorScheme="green">게시판 목록</Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap='2'>
            <Button colorScheme='teal' onClick={() => navigate("/boardlist")}>게시판 목록</Button>
            <Button colorScheme='teal'onClick={() => navigate("/boardwrite")}>게시판 작성</Button>
            <Button colorScheme='teal'onClick={() => navigate("/Notice")}>공지사항</Button>
          </ButtonGroup>
        </Flex>
      </Box>
      <br/>
      <br/>

  <SearchComponent />
  <br/>

  <Table  w="80%" h={"60px"}   ml="10%">
        <Thead>
          <Tr>
            <Th>글 순서</Th>
            <Th>타이틀</Th>
            <Th>컨텐츠</Th>
            <Th>작성자</Th>
            <Th>작성일</Th>
          </Tr>
        </Thead>
        <Tbody>
          {boardList.map((board) => (
              <Tr
                key={board.id}
                _hover={{ cursor: "pointer" }}

                onClick={() => navigate("/board/" + board.id)}
              >
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.content}</Td>
                <Td>{board.writer}</Td>
                <Td>{board.inserted}</Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
      <Pagination  pageInfo={pageInfo} />
    </Box>
  );
}
