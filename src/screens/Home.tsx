import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";

interface User {
  username: string;
  avatar: string;
}
export interface Photo {
  id: number;
  user: User;
  file: string;
  caption: string;
  comments: [string];
  likes: number;
  createdAt: string;
  isMine: boolean;
  isLiked: boolean;
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
      isLiked
    }
  }
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  const history = useHistory();
  return (
    <>
      {data?.seeFeed?.map((photo: Photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </>
  );
};

export default Home;
