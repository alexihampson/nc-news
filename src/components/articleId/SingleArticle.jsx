import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingles } from "../../api";
import CommentList from "./CommentList";
import { handleVote } from "../../utils";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  const [articleLoading, setArticleLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setArticleLoading(true);
    fetchSingles(`/articles/${article_id}`, {})
      .then((article) => {
        setArticle(article);
        setVotes(article.votes);
        return fetchSingles(`/users/${article.author}`, {});
      })
      .then((author) => {
        setAuthor(author);
        setArticleLoading(false);
      });
  }, [article_id]);

  const handleButton = (event) => {
    handleVote(event, `/articles/${article_id}`, setErr, setVotes);
  };

  return (
    <div className="sm:grid sm:grid-cols-3">
      <div className="border-2 border-white rounded m-4 p-2 sm:max-w-xl sm:mx-auto sm:col-start-1 sm:col-span-2 sm:h-fit sm:sticky sm:top-32">
        {articleLoading ? (
          <h2 className="text-xl font-bold p-1">Loading Article...</h2>
        ) : (
          <>
            <h2 className="text-xl font-bold p-1 m-3">{article.title}</h2>
            <div className="grid grid-cols-2 mx-3">
              <div className="col-auto">
                <div className="grid grid-cols-5 grid-rows-2 text-left">
                  <img
                    className="h-10 col-start-1 row-start-1"
                    src={author.avatar_url}
                    alt="Author Avatar"
                  />
                  <h5 className="col-start-2 col-span-4 row-start-1 text-m font-bold text-left mx-1">
                    {author.name}
                  </h5>
                  <h6 className="col-start-1 col-span-5 row-start-2 text-xs font-bold">
                    {new Date(article.created_at).toLocaleString("en-GB", { timeZone: "UTC" })}
                  </h6>
                </div>
              </div>
              <div className="col-auto flex items-center justify-end">
                <Link to={`/topics/${article.topic}`}>
                  <h5 className="text-m font-bold text-right capitalize mx-6">{article.topic}</h5>
                </Link>
              </div>
            </div>
            <div>
              <p className="text-left mx-2">{article.body}</p>
            </div>
            <div className="grid grid-cols-2">
              <h3 className="text-2xl font-bold p-1 m-3 cols-auto">{votes}</h3>
              <div className="cols-auto grid grid-cols-2">
                <button
                  className="rounded-full bg-white py-1 px-3 m-auto sm:hover:bg-slate-400 w-fit col-auto"
                  id="upvote"
                  onClick={handleButton}
                >
                  &uarr;
                </button>
                <button
                  className="rounded-full bg-white py-1 px-3 m-auto sm:hover:bg-slate-400 w-fit col-auto"
                  id="downvote"
                  onClick={handleButton}
                >
                  &darr;
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="sm:max-w-sm sm:col-start-3">
        <h2 className="text-xl font-bold p-1 sm:text-left">Comments</h2>
        <CommentList endpoint={`/articles/${article_id}/comments`} params={{}} setErr={setErr} />
      </div>
      {err ? (
        <div className="fixed top-28 w-full">
          <div className="flex justify-center text-center text-white">
            <div className="bg-red-800 rounded py-4 px-2 w-fit">
              <p>{err}</p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SingleArticle;
