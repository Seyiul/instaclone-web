import styled from "styled-components";

const SAvatar = styled.div.attrs<{ lg: boolean; profile: boolean }>(
  ({ lg, profile }) => ({
    lg: undefined,
  })
)<{ lg: boolean }>`
  width: ${(props) => (props.lg ? "30px" : props.profile ? "150px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : props.profile ? "150px" : "25px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface AvatarProps {
  url?: string;
  lg?: boolean;
  profile?: boolean;
}
const Avatar: React.FC<AvatarProps> = ({
  url = "",
  lg = false,
  profile = false,
}) => {
  return (
    <SAvatar lg={lg} profile={profile}>
      {url !== "" ? <Img src={url} /> : null}
    </SAvatar>
  );
};
export default Avatar;
