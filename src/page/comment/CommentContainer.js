import {Box, Button, Textarea, useToast} from "@chakra-ui/react";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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


function CommentList() {
  return <Box>댓글 리스트</Box>;
}

export function CommentContainer({boardId}) {
  return (<Box>
    <CommentForm boardId={boardId}/>
    <CommentList/>
  </Box>);
}