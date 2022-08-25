const UserPageListButtons = ({ listLength, listPage, setListPage }) => {
  const handleButton = (event) => {
    let inc_page = event.target.id === "left-button" ? -1 : 1;
    setListPage((currPage) => currPage + inc_page);
  };

  return (
    <div className="my-2 grid grid-cols-[20%_1fr_20%] grid-rows-2 sm:max-w-2xl sm:mx-auto">
      <div className="col-start-1 row-start-1 row-span-2">
        <button
          className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 disabled:opacity-50"
          disabled={!(listPage > 1)}
          id="left-button"
          onClick={handleButton}
        >
          &larr;
        </button>
      </div>
      <div className="col-start-3 row-start-1 row-span-2">
        <button
          className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 disabled:opacity-50"
          id="right-button"
          onClick={handleButton}
          disabled={!(listPage < Math.ceil(listLength / 10))}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default UserPageListButtons;
