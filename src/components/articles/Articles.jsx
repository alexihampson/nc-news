import ArticleBar from "./ArticleBar";
import ArticleList from "./ArticleList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [articleLength, setArticleLength] = useState(0);
  const navigate = useNavigate();

  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const handleCreate = () => {
    navigate("/articles/create");
  };

  return (
    <div>
      <div className="sm:grid sm:grid-cols-3">
        <ArticleBar
          className="sm:col-start-2"
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          articleLength={articleLength}
        />
        <button
          className="row-auto rounded-full bg-white py-2 px-3 my-4 mx-auto w-fit sm:hover:bg-slate-400 col-auto disabled:opacity-50"
          onClick={handleCreate}
        >
          Create New Article
        </button>
      </div>
      <ArticleList endpoint={"/articles"} params={params} setArticleLength={setArticleLength} />
    </div>
  );
};

export default Articles;
