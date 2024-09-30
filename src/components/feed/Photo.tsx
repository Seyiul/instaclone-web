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
import Comments from "./Comments";
import { Link } from "react-router-dom";

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

function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  comments,
  commentNumber,
}: PhotoTypes) {
  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev: boolean) {
            return !prev;
          },
          likes(prev: number) {
            return isLiked ? prev - 1 : prev + 1;
          },
        },
      });
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
        <Link to={`/profile/${user.username}`}>
          <Avatar url={user.avatar} lg={true} />
        </Link>
        <Link to={`/profile/${user.username}`}>
          <Username>{user.username}</Username>
        </Link>
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
        <Comments
          author={user.username}
          avatar={user.avatar}
          caption={caption}
          comments={comments}
          commentNumber={commentNumber}
          photoId={id}
        />
      </PhotoInfo>
    </PhotoContainer>
  );
}

export default Photo;
