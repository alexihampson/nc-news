import ArticleBar from "../articles/ArticleBar";
import ArticleList from "../articles/ArticleList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingles } from "../../api";

const TopicSlug = () => {
  const { slug } = useParams();
  const [topic, setTopic] = useState({});
  const [topicLoading, setTopicLoading] = useState(true);

  useEffect(() => {
    setTopicLoading(true);
    fetchSingles(`/topics/${slug}`).then((data) => {
      setTopic(data);
      setTopicLoading(false);
    });
  }, [slug]);

  return (
    <div>
      <ArticleBar />
      <h2 className="text-xl font-bold p-2 m-2 capitalize">{slug}</h2>
      {topicLoading ? (
        <></>
      ) : (
        <h3 className="text-m font-bold p-2 m-2 capitalize">{topic.description}</h3>
      )}
      <ArticleList endpoint={`/articles?topic=${slug}`} />
    </div>
  );
};

export default TopicSlug;
