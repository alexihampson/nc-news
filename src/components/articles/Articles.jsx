import ArticleBar from "./ArticleBar";
import ArticleList from "./ArticleList";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [articleLength, setArticleLength] = useState(0);

  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return (
    <div>
      <ArticleBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        articleLength={articleLength}
      />
      <ArticleList endpoint={"/articles"} params={params} setArticleLength={setArticleLength} />
    </div>
  );
};

export default Articles;
