import styled from "styled-components";
import { Comment as CommentTypes } from "../../screens/Home";
import Comment from "./Comment";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import Avatar from "../Avatar";
import useUser from "../../hooks/useUser";

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

const TypeComment = styled.div`
  display: flex;
  margin-top: 15px;
  border-top: 0.5px solid ${(props) => props.theme.borderColor};
  div {
    margin-top: 10px;
  }
  input[type="text"] {
    margin-left: 15px;
    margin-top: 10px;
    width: 100%;
  }
`;

export interface CommentsTypes {
  author: string;
  caption: string;
  commentNumber: number;
  comments: [CommentTypes];
  photoId: number;
  avatar: string;
}

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

function Comments({
  author,
  caption,
  commentNumber,
  comments,
  photoId,
  avatar,
}: CommentsTypes) {
  const { data: userData } = useUser();
  const createCommentUpdate = (cache: any, result: any) => {
    const {
      data: {
        createComment: { ok, error, id },
      },
    } = result;

    if (ok && userData.me) {
      const { payload } = getValues();
      setValue("payload", "");

      const newComment = {
        __typename: "Comment",
        createAt: Date.now(),
        id,
        isMine: true,
        payload,
        user: { ...userData.me },
      };

      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev: Array<any>) {
            return [...prev, newComment];
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onValid = (data: any) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };
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
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <TypeComment>
            <Avatar url={avatar} />
            <input
              {...register("payload", { required: true })}
              type="text"
              placeholder="Write a comment..."
            ></input>
          </TypeComment>
        </form>
      </div>
    </CommentsContainer>
  );
}

export default Comments;
