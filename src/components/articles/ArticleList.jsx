import ArticleCard from "./ArticleCard";
import { fetchLists } from "../../api";
import { useState, useEffect } from "react";

const ArticleList = ({ endpoint, params }) => {
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  useEffect(() => {
    setArticlesLoading(true);
    fetchLists(endpoint, params).then((articles) => {
      setArticles(articles);
      setArticlesLoading(false);
    });
  }, [endpoint, params]);

  if (articlesLoading)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  return (
    <div>
      <ul className="flex flex-wrap">
        {articles.map((article, index) => {
          return <ArticleCard key={index} article={article} pretty={index === 0} />;
        })}
      </ul>
    </div>
  );
};

export default ArticleList;