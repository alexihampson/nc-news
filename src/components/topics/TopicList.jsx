import { useEffect, useState } from "react";
import TopicCard from "./TopicCard";
import { fetchLists } from "../../api";

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(true);

  useEffect(() => {
    setTopicsLoading(true);
    fetchLists("/topics", {}).then(([topics]) => {
      setTopics(topics);
      setTopicsLoading(false);
    });
  }, []);

  if (topicsLoading)
    return (
      <div className="border-2 border-white rounded m-4 p-2 sm:max-w-xl sm:mx-auto">
        <h3 className="text-xl font-bold p-1 m-3">Loading...</h3>
      </div>
    );

  return (
    <div className="m-4 p-2">
      <ul className="sm:flex sm:flex-wrap">
        {topics.map((topic) => {
          return <TopicCard topic={topic} key={topic.slug} />;
        })}
      </ul>
    </div>
  );
};

export default TopicList;
