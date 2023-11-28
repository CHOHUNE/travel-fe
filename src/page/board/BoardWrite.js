import {
  Alert,
  Box,
  Button,
  Flex,
  flexbox,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");

  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .post("/api/board/add", { title, content, writer })
      .then((response) => {
        console.log(response.data);
        toast({ description: "글이 작성되었습니다.", status: "success" });
        navigate("/");
      })
      .catch(() => {
        toast({ description: "글이 작성 안됬습니다.", status: "error" });
      })
      .finally(() => {
        console.log("done");
        setIsSubmitting(false);
      });
  }

  let selectedOption;

  function handleOptionChange() {}

  return (
    <Box>
      <br />
      <h1>게시물 작성</h1>
      <br />

      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Textarea>
        </FormControl>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          ></Input>
        </FormControl>
        <Button
          isDisabled={isSubmitting}
          onClick={handleSubmit}
          colorScheme="green"
        >
          {" "}
          저장{" "}
        </Button>
      </Box>
    </Box>
  );
}
