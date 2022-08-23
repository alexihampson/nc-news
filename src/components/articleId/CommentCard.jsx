import { useState } from "react";
import { patchSingle } from "../../api";

const CommentCard = ({ comment, setErr, errReset }) => {
  const [votes, setVotes] = useState(comment.votes);

  const handleVote = (event) => {
    const inc_votes = event.target.id === "upvote" ? 1 : -1;
    setVotes((currVotes) => currVotes + inc_votes);
    setErr(null);
    patchSingle(`/comments/${comment.comment_id}`, { inc_votes }).catch(() => {
      setVotes((currVotes) => currVotes - inc_votes);
      setErr("There was an issue, please retry");
      setTimeout(errReset, 5000);
    });
  };

  return (
    <li className="border-2 border-white rounded m-4 p-2 sm:max-w-m sm:mx-auto grid grid-cols-4 grid-rows-comments">
      <span className="text-3xl font-bold p-1 my-4 col-start-1 row-start-1 row-span-2">
        {votes}
      </span>
      <div className="col-start-1 row-start-3 grid grid-cols-2">
        <button
          id="upvote"
          onClick={handleVote}
          className="rounded-full bg-white py-1 px-3 m-auto sm:hover:bg-slate-400 w-fit col-auto"
        >
          &uarr;
        </button>
        <button
          id="downvote"
          onClick={handleVote}
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
