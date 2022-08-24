import { patchSingle } from "./api";

export const errReset = (setErr) => {
  setErr(null);
};

export const handleVote = (event, endpoint, setErr, setVotes) => {
  const inc_votes = event.target.id === "upvote" ? 1 : -1;
  setVotes((currVotes) => currVotes + inc_votes);
  errReset();
  patchSingle(endpoint, { inc_votes }).catch(() => {
    setVotes((currVotes) => currVotes - inc_votes);
    setErr("There was an issue, please retry");
    setTimeout(errReset, 5000, setErr);
  });
};
