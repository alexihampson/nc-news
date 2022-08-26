import { useState, useContext } from "react";
import { postSingle } from "../../api";
import { ErrContext } from "../../context/err";
import { errReset } from "../../utils";

const CreateTopic = ({ setDisplayTopic, setTopics }) => {
  const { setErr } = useContext(ErrContext);
  const [topicUploading, setTopicUploading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = { slug: event.target[0].value, description: event.target[1].value };
    setTopicUploading(true);
    postSingle("/topics", body)
      .then((res) => {
        setTopics((currTopics) => {
          return [res.data.topic, ...currTopics];
        });
        setTopicUploading(false);
        setDisplayTopic(false);
      })
      .catch(() => {
        setDisplayTopic(false);
        setErr("Unable to add topic, please retry");
        setTimeout(errReset, 5000, setErr);
      });
  };

  const handleClose = () => {
    setDisplayTopic((curr) => !curr);
  };

  return (
    <>
      <div
        className="h-screen w-screen bg-black opacity-50 fixed top-0"
        onClick={handleClose}
      ></div>
      <div className="h-screen w-screen fixed top-32">
        <div className="border-2 border-white bg-sky-300 rounded m-4 p-2 sm:max-w-xl sm:mx-auto mx-auto w-11/12 opacity-100">
          <div className="grid grid-cols-[90%_10%] grid-rows-1">
            <h3 className="text-lg font-bold p-1 m-1 col-start-1 col-span-2 row-start-1">
              New Topic
            </h3>
            <button
              onClick={handleClose}
              className="text-white font-bold col-start-2 row-start-1 rounded-full bg-sky-300 py-1 px-3"
            >
              X
            </button>
          </div>
          {topicUploading ? (
            <h3 className="text-xl font-bold p-1 m-2">Adding...</h3>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-rows-[auto_auto_auto_auto_auto]">
              <label htmlFor="slug" className="row-auto font-bold m-1">
                Slug
              </label>
              <input name="slug" placeholder="Slug" className="row-auto w-5/6 mx-auto" required />
              <label htmlFor="description" className="row-auto font-bold m-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Description"
                rows="4"
                cols="30"
                className="row-auto w-5/6 mx-auto"
                required
              />
              <button className="row-auto rounded-full bg-white py-2 px-3 my-4 mx-auto w-fit sm:hover:bg-slate-400">
                Submit Topic
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateTopic;
