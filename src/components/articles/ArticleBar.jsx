const ArticleBar = ({ className, searchParams, setSearchParams, articleLength }) => {
  const sortByTopics = ["created_at", "title", "topic", "author", "votes", "comment_count"];

  const processTopicName = (name) => {
    const temp = name.split("_");
    return temp.map((element) => element[0].toUpperCase() + element.slice(1)).join(" ");
  };

  const handleSelect = (event) => {
    const newParams = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });
    delete newParams[event.target.name];
    newParams[event.target.name] = event.target.value;
    setSearchParams(newParams);
  };

  const handleButton = (event) => {
    let inc_page = event.target.id === "left-button" ? -1 : 1;
    const newParams = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });
    newParams["p"] = newParams["p"] ? inc_page + parseInt(newParams["p"]) : inc_page + 1;
    setSearchParams(newParams);
  };

  return (
    <div className={className}>
      <div className="my-2 grid grid-cols-[20%_1fr_20%] grid-rows-2 sm:max-w-2xl sm:mx-auto">
        <div className="col-start-1 row-start-1 row-span-2">
          <button
            className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 disabled:opacity-50"
            disabled={!(searchParams.get("p") > 1)}
            id="left-button"
            onClick={handleButton}
          >
            &larr;
          </button>
        </div>
        <div className="my-2 mx-auto col-start-2 row-start-1">
          <label htmlFor="sort_by">Sort By: </label>
          <select name="sort_by" onChange={handleSelect}>
            {sortByTopics.map((topic, index) => {
              return (
                <option
                  key={index}
                  value={topic}
                  label={processTopicName(topic)}
                  className="capitalize"
                >
                  {processTopicName(topic)}
                </option>
              );
            })}
          </select>
        </div>
        <div className="my-2 mx-auto col-start-2 row-start-2">
          <label htmlFor="order">Order: </label>
          <select name="order" onChange={handleSelect}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        <div className="col-start-3 row-start-1 row-span-2">
          <button
            className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 disabled:opacity-50"
            id="right-button"
            onClick={handleButton}
            disabled={
              !(
                searchParams.get("p") < Math.ceil(articleLength / (searchParams.get("limit") || 10))
              )
            }
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleBar;
