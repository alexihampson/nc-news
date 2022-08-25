import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { fetchSingles, postSingle, fetchLists } from "../../api";
import CommentList from "./CommentList";
import { handleVote, errReset } from "../../utils";
import { UserContext } from "../../context/user";
import { ErrContext } from "../../context/err";
import { useNavigate } from "react-router-dom";

const SingleArticle = () => {
  const { user } = useContext(UserContext);
  const { setErr } = useContext(ErrContext);
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  const [articleLoading, setArticleLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentDisplay, setCommentDisplay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setArticleLoading(true);
    setCommentsLoading(true);
    fetchSingles(`/articles/${article_id}`, {})
      .then((article) => {
        setArticle(article);
        setVotes(article.votes);
        return fetchSingles(`/users/${article.author}`, {});
      })
      .then((author) => {
        setAuthor(author);
        setArticleLoading(false);
        return fetchLists(`/articles/${article_id}/comments`, {}, "comments");
      })
      .then(([comments]) => {
        setComments(comments);
        setCommentsLoading(false);
      })
      .catch(() => {
        navigate("/404");
      });
  }, [article_id, navigate]);

  const handleButton = (event) => {
    handleVote(event, `/articles/${article_id}`, setErr, setVotes);
  };

  const handlePost = (event) => {
    event.preventDefault();
    setCommentDisplay(false);
    postSingle(`/articles/${article_id}/comments`, {
      username: user.username,
      body: event.target[0].value,
    })
      .then(({ data: { comment } }) => {
        setComments((currComment) => {
          return [comment, ...currComment];
        });
      })
      .catch(() => {
        setErr("Failed to submit comment");
        setTimeout(errReset, 5000, setErr);
      });
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
        <div className="grid grid-cols-[auto_auto]">
          <h2 className="text-xl font-bold p-1 sm:text-left col-auto my-auto text-left ml-5">
            Comments
          </h2>
          <button
            className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 col-auto disabled:opacity-50"
            disabled={user.username ? false : true}
            onClick={() => {
              setCommentDisplay(true);
            }}
          >
            Post New Comment
          </button>
        </div>
        {commentDisplay ? (
          <form onSubmit={handlePost}>
            <label htmlFor="comment-box" style={{ display: "none" }}>
              Comment
            </label>
            <textarea name="comment-box" id="comment-box" rows="4" cols="30"></textarea>
            <input
              type="submit"
              value="Submit"
              className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 disabled:opacity-50"
              disabled={user.username ? false : true}
            />
          </form>
        ) : (
          <></>
        )}
        <CommentList
          comments={comments}
          commentsLoading={commentsLoading}
          setComments={setComments}
        />
      </div>
    </div>
  );
};

export default SingleArticle;
