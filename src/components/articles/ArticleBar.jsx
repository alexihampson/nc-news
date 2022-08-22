const ArticleBar = () => {
  const sortByTopics = ["created_at", "title", "topic", "author", "votes", "comment_count"];

  const processTopicName = (name) => {
    return name.replaceAll("_", " ");
  };

  return (
    <div className="p-4">
      <label htmlFor="sort-by">Sort By: </label>
      <select name="sort-by">
        {sortByTopics.map((topic, index) => {
          return (
            <option key={index} value={topic} className="capitalize">
              {processTopicName(topic)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ArticleBar;
