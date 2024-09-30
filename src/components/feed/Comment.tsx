import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const SComment = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
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

const DeleteBtn = styled.button`
  background-color: inherit;
  border: none;
  cursor: pointer;
  color: gray;
  &:hover {
    color: ${(props) => props.theme.fontColor};
  }
`;

interface CommentProps {
  author: string;
  payload: string;
  id?: number;
  isMine?: boolean;
  photoId?: number;
}

const DELETE_COMMENT = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

function Comment({ author, payload, id, isMine, photoId }: CommentProps) {
  const regexHT = /#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/;
  const regexPF = /@[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/;

  const updateDeleteComment = (cache: any, result: any) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;

    if (ok) {
      cache.evict({
        id: `Comment:${id}`,
      });

      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev: number) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  return (
    <SComment>
      <div>
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
      </div>
      {isMine ? (
        <DeleteBtn onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faTrashCan} />
        </DeleteBtn>
      ) : null}
    </SComment>
  );
}

export default Comment;
