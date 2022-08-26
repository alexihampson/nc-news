import { useState, useEffect, useContext } from "react";
import { handleVote, errReset } from "../../utils";
import { UserContext } from "../../context/user";
import { deleteSingle } from "../../api";
import { ErrContext } from "../../context/err";

const CommentCard = ({ comment, setComments }) => {
  const { user } = useContext(UserContext);
  const { setErr } = useContext(ErrContext);
  const [votes, setVotes] = useState(comment.votes);
  const [commentDisplay, setCommentDisplay] = useState(true);

  useEffect(() => {
    setVotes(comment.votes);
  }, [comment]);

  const handleButton = (event) => {
    handleVote(event, `/comments/${comment.comment_id}`, setErr, setVotes);
  };

  const handleDelete = () => {
    setCommentDisplay(false);
    deleteSingle(`/comments/${comment.comment_id}`)
      .then(() => {
        setComments((currComments) => {
          return currComments.filter((element) => element.comment_id !== comment.comment_id);
        });
      })
      .catch(() => {
        setCommentDisplay(true);
        setErr("An issue occured, please try again");
        setTimeout(errReset, 5000, setErr);
      });
  };

  return (
    <li
      className={
        "border-2 border-white rounded m-4 p-2 sm:max-w-m sm:mx-auto grid grid-cols-4 grid-rows-comments shadow shadow-sky-800 sm:hover:shadow-lg sm:hover:shadow-sky-800" +
        (commentDisplay ? "" : " hidden")
      }
    >
      <span className="text-3xl font-bold p-1 my-4 col-start-1 row-start-1 row-span-2">
        {votes}
      </span>
      <div className="col-start-1 row-start-3 grid grid-cols-2">
        <button
          id="upvote"
          onClick={handleButton}
          className="rounded-full bg-white py-1 px-3 m-auto sm:hover:bg-slate-400 w-fit col-auto"
        >
          &uarr;
        </button>
        <button
          id="downvote"
          onClick={handleButton}
          className="rounded-full bg-white py-1 px-3 m-auto sm:hover:bg-slate-400 w-fit col-auto"
        >
          &darr;
        </button>
      </div>
      <h5 className="text-m font-bold p-1 col-start-2 col-span-3 row-start-1 h-fit text-left mx-2">
        {comment.author}
      </h5>
      <p className="text-left col-start-2 col-span-3 row-start-2 row-span-3 mx-2">{comment.body}</p>
      {comment.author === user.username ? (
        <button
          className="rounded-full bg-white py-1 px-3 m-auto sm:hover:bg-slate-400 w-fit my-2 h-fit text-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      ) : (
        <></>
      )}
    </li>
  );
};

export default CommentCard;
