import { Helmet } from "react-helmet-async";

function PageTitle({ title }: { title: string }) {
  return (
    <Helmet>
      <title>🌈 {title} | Instaclone 📸</title>
    </Helmet>
  );
}

export default PageTitle;
