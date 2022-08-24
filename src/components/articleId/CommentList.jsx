import CommentCard from "./CommentCard";

const CommentList = ({ comments, commentsLoading }) => {
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
