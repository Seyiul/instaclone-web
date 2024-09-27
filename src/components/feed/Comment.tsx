import sanitizeHtml from "sanitize-html";
import styled from "styled-components";
import { FatText } from "../shared";

const SComment = styled.div`
  margin-bottom: 8px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;

  mark {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
interface CommentProps {
  author: string;
  payload: string;
}

function Comment({ author, payload }: CommentProps) {
  const cleanPayload = sanitizeHtml(
    payload.replace(/#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g, "<mark>$&</mark>"),

    {
      allowedTags: ["mark"],
    }
  );

  return (
    <SComment>
      <FatText>{author}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanPayload,
        }}
      ></CommentCaption>
    </SComment>
  );
}

export default Comment;
