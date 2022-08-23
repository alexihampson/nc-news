import { useState, useEffect } from "react";
import { handleVote } from "../../utils";

const CommentCard = ({ comment, setErr }) => {
  const [votes, setVotes] = useState(comment.votes);

  useEffect(() => {
    setVotes(comment.votes);
  }, [comment]);

  const handleButton = (event) => {
    handleVote(event, `/comments/${comment.comment_id}`, setErr, setVotes);
  };

  return (
    <li className="border-2 border-white rounded m-4 p-2 sm:max-w-m sm:mx-auto grid grid-cols-4 grid-rows-comments">
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
    </li>
  );
};

export default CommentCard;
