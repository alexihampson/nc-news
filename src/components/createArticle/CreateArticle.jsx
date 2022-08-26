import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLists, postSingle } from "../../api";
import { UserContext } from "../../context/user";

const CreateArticle = () => {
  const { user } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [articleSending, setArticleSending] = useState(false);
  const [articleSent, setArticleSent] = useState(false);
  const navigate = useNavigate();

  const processTopicName = (name) => {
    const temp = name.split("_");
    return temp.map((element) => element[0].toUpperCase() + element.slice(1)).join(" ");
  };

  useEffect(() => {
    setPageLoading(true);
    fetchLists("/topics", {}).then(([topics]) => {
      setTopics(topics.map((topic) => topic.slug));
      setPageLoading(false);
    });
  }, []);

  const handleArticle = (event) => {
    event.preventDefault();
    const body = {
      title: event.target[0].value,
      body: event.target[1].value,
      topic: event.target[2].value,
      author: user.username,
    };
    setArticleSending(true);
    postSingle("/articles", body).then(() => {
      setArticleSent(true);
      setArticleSending(false);
    });
  };

  const handleView = () => {
    navigate("/articles");
  };

  if (pageLoading)
    return (
      <div className="border-2 border-white rounded m-4 p-2 sm:max-w-xl sm:mx-auto">
        <h3 className="text-xl font-bold p-1 m-3">Loading...</h3>
      </div>
    );

  if (articleSent)
    return (
      <div className="border-2 border-white rounded m-4 p-2 sm:max-w-xl sm:mx-auto grid grid-rows-2">
        <h3 className="text-xl font-bold p-1 m-3 row-auto">Article Uploaded!</h3>
        <button
          className="row-auto rounded-full bg-white py-2 px-3 my-4 mx-auto w-fit sm:hover:bg-slate-400 col-auto disabled:opacity-50"
          onClick={handleView}
        >
          View
        </button>
      </div>
    );

  return (
    <>
      {articleSending ? (
        <>
          <div
            className="h-screen w-screen bg-black opacity-50 fixed top-0"
            onClick={() => {}}
          ></div>
          <div className="h-screen w-screen fixed top-32">
            <div className="border-2 border-white bg-sky-300 rounded m-4 p-2 sm:max-w-xl sm:mx-auto mx-auto w-11/12 opacity-100">
              <h3 className="text-xl font-bold p-1 m-3">Sending...</h3>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="border-2 border-white rounded m-4 p-2 sm:max-w-xl sm:mx-auto">
        <h3 className="text-xl font-bold p-1 m-3">New Article</h3>
        <form onSubmit={handleArticle} className="grid grid-cols-3 grid-rows-[auto_auto_auto_auto]">
          <label htmlFor="title" className="hidden">
            Title:{" "}
          </label>
          <input
            name="title"
            placeholder="Title"
            className="w-10/12 mx-auto my-2 p-1 col-auto col-span-3 row-auto"
            required
          />
          <label htmlFor="body" className="hidden">
            Body:{" "}
          </label>
          <textarea
            name="comment-box"
            id="comment-box"
            rows="10"
            cols="30"
            placeholder="Body"
            className="w-10/12 mx-auto my-2 p-1 col-auto col-span-3 row-auto"
            required
          />
          <label htmlFor="topic" className="col-auto row-auto h-fit w-2/3 m-auto text-lg font-bold">
            Topic:{" "}
          </label>
          <select name="topic" className="col-auto row-auto h-fit w-10/12 m-auto" required>
            {topics.map((topic) => {
              return (
                <option
                  key={topic}
                  value={topic}
                  label={processTopicName(topic)}
                  className="capitalize"
                >
                  {processTopicName(topic)}
                </option>
              );
            })}
          </select>
          <button
            onClick={(event) => event.preventDefault()}
            className="col-auto row-auto rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 col-auto disabled:opacity-50"
          >
            New Topic
          </button>
          <button
            className="col-auto col-span-3 row-auto rounded-full bg-white py-2 px-3 my-4 mx-auto w-fit sm:hover:bg-slate-400 col-auto disabled:opacity-50"
            disabled={!user.username}
          >
            Submit Article
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateArticle;
