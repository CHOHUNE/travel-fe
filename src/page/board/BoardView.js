import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Box, Button, Flex, FormControl, FormLabel, Input, Spinner, Textarea, useToast,} from "@chakra-ui/react";
import { CommentContainer } from "../../page/comment/CommentContainer";


export function BoardView() {
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => setBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios.delete("/api/board/remove/" + id).then(() => {
      toast({ description: "삭제되었습니다.", status: "error" });
      navigate("/");
    });
  }

  return (
    <Box>
      <h1>{board.id}번 글 보기</h1>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input value={board.title} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Textarea value={board.content} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input value={board.writer} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>작성일시</FormLabel>
        <Input value={board.inserted} readOnly />
      </FormControl>

      <br />

      <Flex justifyContent={"space-between"}>
        <Button colorScheme={"green"} onClick={() => navigate("/edit/" + id)}>
          수정
        </Button>
        <Button colorScheme="red" onClick={handleDelete}>
          삭제
        </Button>
      </Flex>

      <CommentContainer boardId={id}/>
    </Box>
  );
}
