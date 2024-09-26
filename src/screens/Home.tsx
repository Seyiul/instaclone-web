import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatLink, FatText } from "../components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart,
  faPaperPlane,
  faComment,
} from "@fortawesome/free-regular-svg-icons";

interface User {
  username: string;
  avatar: string;
}
interface Photo {
  id: number;
  user: User;
  file: string;
  caption: string;
  comments: [string];
  likes: number;
  createdAt: string;
  isMine: Boolean;
}

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      comments
      likes
      createdAt
      isMine
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px 10px;
  display: flex;
  align-items: center;
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
  padding: 15px;
`;
const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
`;
const PhotoAction = styled.div`
  margin-right: 10px;
`;

const Likes = styled(FatText)`
  margin-top: 10px;
  display: block;
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  const history = useHistory();
  return (
    <>
      {data?.seeFeed?.map((photo: Photo) => (
        <PhotoContainer>
          <PhotoHeader>
            <Avatar url={photo.user.avatar} lg={true} />
            <Username>{photo.user.username}</Username>
          </PhotoHeader>
          <PhotoWrapper>
            <PhotoFile src={photo.file} />
          </PhotoWrapper>
          <PhotoInfo>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon size={"xl"} icon={faHeart} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size={"xl"} icon={faComment} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size={"xl"} icon={faPaperPlane} />
                </PhotoAction>
              </div>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon size={"xl"} icon={faBookmark} />
                </PhotoAction>
              </div>
            </PhotoActions>
            <Likes>
              {photo.likes === 1 ? "1 like" : `${photo.likes} likes`}
            </Likes>
          </PhotoInfo>
        </PhotoContainer>
      ))}
    </>
  );
};

export default Home;
