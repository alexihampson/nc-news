import ArticleBar from "../articles/ArticleBar";
import ArticleList from "../articles/ArticleList";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingles } from "../../api";

const TopicSlug = () => {
  const { slug } = useParams();
  const [topic, setTopic] = useState({});
  const [topicLoading, setTopicLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [articleLength, setArticleLength] = useState(0);

  const params = { topic: slug };
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  useEffect(() => {
    setTopicLoading(true);
    fetchSingles(`/topics/${slug}`, {}).then((data) => {
      setTopic(data);
      setTopicLoading(false);
    });
  }, [slug]);

  return (
    <div>
      <ArticleBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        articleLength={articleLength}
      />
      <h2 className="text-xl font-bold p-2 m-2 capitalize">{slug}</h2>
      {topicLoading ? (
        <></>
      ) : (
        <h3 className="text-m font-bold p-2 m-2 capitalize">{topic.description}</h3>
      )}
      <ArticleList endpoint={`/articles`} params={params} setArticleLength={setArticleLength} />
    </div>
  );
};

export default TopicSlug;
