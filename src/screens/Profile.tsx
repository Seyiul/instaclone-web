import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "../fragments";
import Avatar from "../components/Avatar";
import styled from "styled-components";
const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const Username = styled.div``;
const FollowInfo = styled.div``;
const Bio = styled.div``;

interface ParamTypes {
  username: string;
}

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isFollowing
      isMe
    }
  }
  ${PHOTO_FRAGMENT}
`;
function Profile() {
  const { username } = useParams<ParamTypes>();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  console.log(data);
  return (
    <>
      <InfoContainer>
        <Avatar url={data.seeProfile.avatar} />
        <ProfileInfo>
          <Username>{data.seeProfile.username}</Username>
          <FollowInfo>
            <span>{data.seeProfile.totalFollowers}followers</span>
            <span>{data.seeProfile.totalFollowing}following</span>
          </FollowInfo>
          <Bio>{data.seeProfile.bio}</Bio>
        </ProfileInfo>
      </InfoContainer>
    </>
  );
}

export default Profile;
