import styled from "styled-components";
import { FatLink } from "../shared";

const SSubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const SubTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return <SSubTitle className={className}>{title}</SSubTitle>;
};
export default SubTitle;
