import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader, Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useToast
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {DeleteIcon} from "@chakra-ui/icons";

function CommentForm({boardId}) {
  const [comment, setComment] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  function handleSubmit() {
    axios.post("/api/comment/add",{boardId,comment})
      .then(()=>{toast({description:"글 쓰기 완료",status:"success"});navigate("/boardlist")})

  }

  return (<Box>
    <Textarea value={comment} onChange={ (e)=>setComment(e.target.value)}/>
    <Button onClick={handleSubmit}>글 쓰기</Button>
  </Box>);
}


function CommentList({boardId}) {
  const [commentList, setCommentList] = useState([])
  useEffect(() => {
    const  params = new URLSearchParams();
    params.set("id",boardId);
    axios.get("/api/comment/list?"+params)
      .then((response)=>setCommentList(response.data));

  }, []);


  function handleDelete(id) {

    axios.delete("/api/comment/"+id)
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">댓글 리스트</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {commentList.map((comment) => (
            <Box key={comment.id}>
              <Flex justifyContent="space-between">
                <Heading size="xs">{comment.userId}</Heading>
                <Text fontSize="xs">{comment.inserted}</Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text sx={{ whiteSpace: "pre-wrap" }} pt="2" fontSize="sm">
                  {comment.comment}
                </Text>
                <Button
                  onClick={() => handleDelete(comment.id)}
                  size="xs"
                  colorScheme="red"
                >
                  <DeleteIcon />
                </Button>
              </Flex>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function CommentContainer({boardId}) {
  return (<Box>
    <CommentForm boardId={boardId}/>
    <CommentList boardId={boardId} />
  </Box>);
}