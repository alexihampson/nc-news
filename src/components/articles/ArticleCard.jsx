import { Link } from "react-router-dom";

const ArticleCard = ({ article, pretty }) => {
  const shortenBody = (body, len = 100) => {
    return body.slice(0, len) + "...";
  };

  if (pretty)
    return (
      <li className="border-2 border-white rounded m-4 p-2 shadow-md shadow-sky-800 sm:max-w-2xl sm:mx-auto sm:hover:shadow-lg sm:hover:shadow-sky-800 sm:h-72 w-full">
        <Link to={`/articles/${article.article_id}`}>
          <h4 className="text-l font-bold p-1">{article.title}</h4>
        </Link>
        <Link to={`/topics/${article.topic}`}>
          <h6 className="text-xs font-bold p-1 capitalize">{article.topic}</h6>
        </Link>
        <Link to={`/articles/${article.article_id}`}>
          <p className="text-left">{shortenBody(article.body, 400)}</p>
          <h4 className="text-l font-bold p-1">{article.votes}</h4>
          <h5 className="text-s font-bold p-1">{article.author}</h5>
          <h6 className="text-xs font-bold p-1">
            {new Date(article.created_at).toLocaleString("en-GB", { timeZone: "UTC" })}
          </h6>
        </Link>
      </li>
    );

  return (
    <li className="border-2 border-white rounded m-4 p-2 sm:max-w-2xl sm:mx-auto shadow shadow-sky-800 sm:hover:shadow-lg sm:hover:shadow-sky-800 sm:h-44 w-full">
      <Link to={`/articles/${article.article_id}`}>
        <h4 className="text-l font-bold p-1">{article.title}</h4>
      </Link>
      <Link to={`/topics/${article.topic}`}>
        <h6 className="text-xs font-bold p-1 capitalize">{article.topic}</h6>
      </Link>
      <Link to={`/articles/${article.article_id}`}>
        <p className="text-left">{shortenBody(article.body)}</p>
        <h4 className="text-l font-bold p-1">{article.votes}</h4>
        <h6 className="text-xs font-bold p-1">
          {new Date(article.created_at).toLocaleString("en-GB", { timeZone: "UTC" })}
        </h6>
      </Link>
    </li>
  );
};

export default ArticleCard;
