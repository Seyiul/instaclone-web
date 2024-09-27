import styled from "styled-components";
import { FatText } from "../shared";
import { Comment as CommentTypes } from "../../screens/Home";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  font-size: 10px;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
`;

export interface CommentsTypes {
  author: string;
  caption: string;
  commentNumber: number;
  comments: [CommentTypes];
}

function Comments({ author, caption, commentNumber, comments }: CommentsTypes) {
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment: CommentTypes) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
    </CommentsContainer>
  );
}

export default Comments;
