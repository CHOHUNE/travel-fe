import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/board/list")
      .then((response) => setBoardList(response.data));
  }, []);

  return (
    <Box>
      <Flex>
        <Button onClick={() => navigate("/boardlist")}>게시판 목록</Button>
        <Button onClick={() => navigate("/boardwrite")}>게시판 작성</Button>
        <Button onClick={() => navigate("/signup")}>회원가입</Button>
        <Button onClick={() => navigate("/member/list")}>회원목록</Button>
        <Button onClick={() => navigate("/login")}>로그인</Button>
      </Flex>

      <h1> 게시물 목록</h1>
      <Flex justifyContent={"space-between"}>
        <select>
          <option value="Option1">전 체</option>
          <option value="Option2">제 목</option>
          <option value="Option3">내 용</option>
          <option value="Option3">작성자</option>
        </select>
        <Input type="text" />
        <Button> 검색</Button>
      </Flex>

      <Table>
        <Thead>
          <Tr>
            <Th>타이틀</Th>
            <Th>컨텐츠</Th>
            <Th>작성자</Th>
            <Th>작성일</Th>
          </Tr>
        </Thead>
        <Tbody>
          {boardList === null ? (
            <Spinner />
          ) : (
            boardList.map((board) => (
              <Tr
                key={board.id}
                _hover={{ cursor: "pointer" }}
                onClick={() => navigate("/board/" + board.id)}
              >
                <Td>{board.title}</Td>
                <Td>{board.content}</Td>
                <Td>{board.writer}</Td>
                <Td>{board.inserted}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
