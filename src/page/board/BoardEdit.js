import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import axios from "axios";
import { RBanner } from "./Banner/RBanner";
import { LBanner } from "./Banner/LBanner";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);

  // /edit/:id
  const { id } = useParams();

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => updateBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  function handleUpdate() {
    axios
      .put("/api/board/edit", board)
      .then(() => {
        toast({
          description: board.id + "번 게시글이 수정되었습니다.",
          status: "success",
        });

        navigate("/board/" + id);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "요청이 잘못되었습니다.",
            status: "error",
          });
        } else {
          toast({
            description: "수정 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => console.log("끝"));
  }

  return (
    <Box w="80%" ml="10%">
      <Box w="80%" ml="10%">
        <Flex>
          <Box w="20%" padding={"10px"}>
            <LBanner />
          </Box>
          <Box w="60%" padding={"10px"}>
            <br />
            <Heading size="md">{id}번 글 수정</Heading>
            <br />

            <FormControl>
              <FormLabel>제목</FormLabel>
              <Input
                value={board.title}
                onChange={(e) =>
                  updateBoard((draft) => {
                    draft.title = e.target.value;
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>본문</FormLabel>
              <Textarea
                value={board.content}
                onChange={(e) =>
                  updateBoard((draft) => {
                    draft.content = e.target.value;
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>작성자</FormLabel>
              <Input
                value={board.writer}
                onChange={(e) =>
                  updateBoard((draft) => {
                    draft.writer = e.target.value;
                  })
                }
              />
            </FormControl>
            <Button onClick={handleUpdate}>수정</Button>
          </Box>

          <Box w={"20%"} padding={"10px"}>
            <RBanner />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
