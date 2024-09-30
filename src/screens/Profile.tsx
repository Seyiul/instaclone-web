import { useParams } from "react-router-dom";

interface ParamTypes {
  username: string;
}
function Profile() {
  const { username } = useParams<ParamTypes>();
  return <>{username}</>;
}

export default Profile;
