import CommentCard from "./CommentCard";
import { fetchLists } from "../../api";
import { useEffect, useState } from "react";

const CommentList = ({ endpoint, params }) => {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  useEffect(() => {
    setCommentsLoading(true);
    fetchLists(endpoint, params, "comments").then((comments) => {
      setComments(comments);
      setCommentsLoading(false);
    });
  }, [endpoint, params]);

  if (commentsLoading)
    return (
      <div className="border-2 border-white rounded m-4 p-2 sm:max-w-m sm:mx-auto">
        <h3 className="text-xl font-bold p-1 m-3">Loading...</h3>
      </div>
    );

  return (
    <div>
      <ul>
        {comments.map((comment, index) => {
          return <CommentCard key={index} comment={comment} />;
        })}
      </ul>
    </div>
  );
};

export default CommentList;
