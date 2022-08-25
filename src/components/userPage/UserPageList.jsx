import { useState } from "react";
import UserPageListButtons from "./UserPageListButtons";
import ArticleList from "../articles/ArticleList";
import UserComments from "./UserComments";

const UserPageList = ({ username }) => {
  const [articleSelected, setArticleSelected] = useState(true);
  const [listLength, setListLength] = useState(0);
  const [listPage, setListPage] = useState(1);

  const handleButton = (event) => {
    setArticleSelected((currSelection) => !currSelection);
    setListPage(1);
    setListLength(0);
  };

  return (
    <div className="sm:max-w-sm sm:col-start-3">
      <div className="grid grid-cols-2">
        <button
          className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 col-auto disabled:bg-slate-800 disabled:text-white"
          id="article-button"
          disabled={articleSelected}
          onClick={handleButton}
        >
          Articles
        </button>
        <button
          className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 col-auto disabled:bg-slate-800 disabled:text-white"
          id="comment-button"
          disabled={!articleSelected}
          onClick={handleButton}
        >
          Comments
        </button>
      </div>
      <div>
        <UserPageListButtons
          listLength={listLength}
          listPage={listPage}
          setListPage={setListPage}
        />
      </div>
      {articleSelected ? (
        <div>
          <ArticleList
            endpoint={"/articles"}
            params={{ p: listPage, author: username }}
            setArticleLength={setListLength}
          />
        </div>
      ) : (
        <div>
          <UserComments params={{ p: listPage, author: username }} setListLength={setListLength} />
        </div>
      )}
    </div>
  );
};

export default UserPageList;
