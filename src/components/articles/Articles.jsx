import ArticleBar from "./ArticleBar";
import ArticleList from "./ArticleList";

const Articles = () => {
  return (
    <div>
      <ArticleBar />
      <ArticleList endpoint={"/articles"} />
    </div>
  );
};

export default Articles;
