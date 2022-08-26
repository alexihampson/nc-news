import { useEffect, useState } from "react";
import TopicCard from "./TopicCard";
import { fetchLists } from "../../api";
import CreateTopic from "../createArticle/CreateTopic";

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [displayTopic, setDisplayTopic] = useState(false);

  useEffect(() => {
    setTopicsLoading(true);
    fetchLists("/topics", {}).then(([topics]) => {
      setTopics(topics);
      setTopicsLoading(false);
    });
  }, []);

  const handleTopic = (event) => {
    event.preventDefault();
    setDisplayTopic((curr) => !curr);
  };

  if (topicsLoading)
    return (
      <div className="border-2 border-white rounded m-4 p-2 sm:max-w-xl sm:mx-auto">
        <h3 className="text-xl font-bold p-1 m-3">Loading...</h3>
      </div>
    );

  return (
    <>
      <div className="m-4 p-2">
        <button
          onClick={handleTopic}
          className="col-auto row-auto rounded-full bg-white py-2 px-3 m-2 sm:hover:bg-slate-400 col-auto disabled:opacity-50"
        >
          Create New Topic
        </button>
        <ul className="sm:flex sm:flex-wrap">
          {topics.map((topic) => {
            return <TopicCard topic={topic} key={topic.slug} />;
          })}
        </ul>
      </div>
      {displayTopic ? (
        <div>
          <CreateTopic setDisplayTopic={setDisplayTopic} setTopics={setTopics} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TopicList;
