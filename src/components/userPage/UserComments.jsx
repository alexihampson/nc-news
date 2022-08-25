import { useEffect, useState } from "react";
import { fetchLists } from "../../api";
import CommentList from "../articleId/CommentList";

const UserComments = ({ params, setListLength }) => {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  useEffect(() => {
    setCommentsLoading(true);
    fetchLists("/comments", params).then(([comments, total_count]) => {
      setComments(comments);
      setListLength(total_count);
      setCommentsLoading(false);
    });
  }, [params, setListLength]);

  return (
    <CommentList comments={comments} commentsLoading={commentsLoading} setComments={setComments} />
  );
};

export default UserComments;
