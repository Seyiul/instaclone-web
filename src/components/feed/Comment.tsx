import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import React from "react";

const SComment = styled.div`
  margin-bottom: 8px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;

  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      font-weight: 600;
    }
  }
`;
interface CommentProps {
  author: string;
  payload: string;
}

function Comment({ author, payload }: CommentProps) {
  const regexHT = /#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/;
  const regexPF = /@[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/;
  return (
    <SComment>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload.split(" ").map((word, idx) =>
          regexHT.test(word) ? (
            <React.Fragment key={idx}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : regexPF.test(word) ? (
            <React.Fragment key={idx}>
              <Link to={`/profile/${word}`}>{word}</Link>
            </React.Fragment>
          ) : (
            <React.Fragment key={idx}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </SComment>
  );
}

export default Comment;
