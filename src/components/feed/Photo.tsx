import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart,
  faPaperPlane,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { FatText } from "../shared";
import Avatar from "../Avatar";
import { Photo as PhotoTypes } from "../../screens/Home";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
  border-radius: 4px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoWrapper = styled.div`
  width: 100%;
  height: 615px;
  padding: 15px;
  background-color: white;
`;
const PhotoFile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PhotoInfo = styled.div`
  padding: 12px 15px;
`;
const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }

  svg {
    font-size: 20px;
  }
`;
const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const Comments = styled.div`
  margin-top: 20px;
`;
const Comment = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  font-size: 10px;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
`;

function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}: PhotoTypes) {
  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    if (ok) {
      const fragmentId = `Photo:${id}`;
      const fragment = gql`
        fragment FGName on Photo {
          isLiked
          likes
        }
      `;

      const result = cache.readFragment({
        id: fragmentId,
        fragment: fragment,
      });

      if ("isLiked" in result && "likes" in result) {
        const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
        cache.writeFragment({
          id: fragmentId,
          fragment: fragment,
          data: {
            isLiked: !cacheIsLiked,
            likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
          },
        });
      }
    }
  };
  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar url={user.avatar} lg={true} />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoWrapper>
        <PhotoFile src={file} />
      </PhotoWrapper>
      <PhotoInfo>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLike()}>
              <FontAwesomeIcon
                icon={isLiked ? fullHeart : faHeart}
                style={{ color: isLiked ? "tomato" : "inherit" }}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <PhotoAction>
              <FontAwesomeIcon icon={faBookmark} />
            </PhotoAction>
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        <Comments>
          <Comment>
            <FatText>{user.username}</FatText>
            <CommentCaption>{caption}</CommentCaption>
          </Comment>
          <CommentCount>
            {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
          </CommentCount>
          {comments?.map((comment) => (
            <div>
              <span>{comment.user.username}</span>
              <span>{comment.payload}</span>
            </div>
          ))}
        </Comments>
      </PhotoInfo>
    </PhotoContainer>
  );
}

export default Photo;
