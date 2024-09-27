import styled from "styled-components";
import { FatText } from "../shared";

const SComment = styled.div`
  margin-bottom: 8px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
`;
interface CommentProps {
  author: string;
  payload: string;
}

function Comment({ author, payload }: CommentProps) {
  return (
    <SComment>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </SComment>
  );
}

export default Comment;
