import ArticleCard from "../articles/ArticleCard";
import { useState, useEffect } from "react";
import { fetchLists } from "../../api";

const PopArticles = () => {
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  useEffect(() => {
    setArticlesLoading(true);
    fetchLists("/articles", {
      limit: 2,
      sort_by: "votes",
      order: "desc",
    }).then((articles) => {
      setArticles(articles);
      setArticlesLoading(false);
    });
  }, []);

  if (articlesLoading)
    return (
      <div className="border-4 border-white rounded m-4 p-2 sm:max-w-2xl sm:mx-auto">
        <h2 className="text-xl font-bold p-1">Most Popular Articles</h2>
        <h3 className="text-l font-bold p-1">Loading...</h3>
      </div>
    );

  return (
    <div className="border-4 border-white rounded m-4 p-2 sm:max-w-2xl sm:mx-auto">
      <h2 className="text-xl font-bold p-1">Most Popular Articles</h2>
      <ul>
        {articles.map((article, index) => {
          return <ArticleCard key={index} article={article} pretty={true} />;
        })}
      </ul>
    </div>
  );
};

export default PopArticles;
