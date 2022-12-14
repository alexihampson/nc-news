import ArticleCard from "./ArticleCard";
import { fetchLists } from "../../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ArticleList = ({ endpoint, params, setArticleLength }) => {
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setArticlesLoading(true);
    fetchLists(endpoint, params)
      .then(([articles, total_count]) => {
        setArticles(articles);
        setArticleLength(total_count);
        setArticlesLoading(false);
      })
      .catch(() => {
        navigate("/404");
      });
  }, [endpoint, params, setArticleLength, navigate]);

  if (articlesLoading)
    return (
      <div className="border-2 border-white rounded m-4 p-2 sm:max-w-xl sm:mx-auto">
        <h3 className="text-xl font-bold p-1 m-3">Loading...</h3>
      </div>
    );

  return (
    <div>
      <ul className="flex flex-wrap mx-3">
        {articles.map((article, index) => {
          return <ArticleCard key={index} article={article} pretty={index === 0} />;
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
