import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Card,
  Image,
  Spinner,
  Textarea,
  useToast, CardBody,
} from "@chakra-ui/react";
import { CommentContainer } from "../../page/comment/CommentContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";


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


  function handleLike() {
    axios
      .post("/api/boardLike", { boardId: board.id })
      .then(() => console.log("good"))
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
  }
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Heading size="xl">{board.id}번 글 보기</Heading>
        <Button variant="ghost" size="xl" onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} size="xl" />
        </Button>
      </Flex>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input value={board.title} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Textarea value={board.content} readOnly />
      </FormControl>

      {board.files.map((file) => (
        <Card key={file.id} my={5}>
          <CardBody>
            <Image width="100%" src={file.url} alt={file.name} />
          </CardBody>
        </Card>
      ))}

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
