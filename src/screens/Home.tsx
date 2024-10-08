import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

export interface User {
  username: string;
  avatar: string;
}

export interface Comment {
  id: number;
  payload: string;
  user: User;
  isMine: boolean;
}
export interface Photo {
  id: number;
  user: User;
  file: string;
  caption: string;
  comments: [Comment];
  commentNumber: number;
  likes: number;
  createdAt: string;
  isMine: boolean;
  isLiked: boolean;
}

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      createdAt
      isMine
      comments {
        ...CommentFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  const history = useHistory();
  return (
    <>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo: Photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </>
  );
};

export default Home;
