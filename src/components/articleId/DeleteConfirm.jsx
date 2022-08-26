import { useContext } from "react";
import { deleteSingle } from "../../api";
import { ErrContext } from "../../context/err";
import { errReset } from "../../utils";

const DeleteConfirm = ({ setDisplayDelete, endpoint, onDelete }) => {
  const { setErr } = useContext(ErrContext);

  const handleClose = () => {
    setDisplayDelete((curr) => !curr);
  };

  const handleDelete = () => {
    deleteSingle(endpoint)
      .then(() => {
        onDelete();
      })
      .catch(() => {
        setDisplayDelete(false);
        setErr("Unable to delete, please try again");
        setTimeout(errReset, 5000, setErr);
      });
  };

  return (
    <>
      <div
        className="h-screen w-screen bg-black opacity-50 fixed top-0"
        onClick={handleClose}
      ></div>
      <div className="h-screen w-screen fixed top-32 pointer-events-none">
        <div className="border-2 border-white bg-sky-300 rounded m-4 p-2 sm:max-w-xl sm:mx-auto mx-auto w-11/12 opacity-100 pointer-events-auto">
          <div className="grid grid-cols-[90%_10%] grid-rows-1">
            <h3 className="text-lg font-bold p-1 m-1 col-start-1 col-span-2 row-start-1">
              Are you sure?
            </h3>
            <button
              onClick={handleClose}
              className="text-white font-bold col-start-2 row-start-1 rounded-full bg-sky-300 py-1 px-3"
            >
              X
            </button>
          </div>
          <div className="grid grid-cols-2 grid-rows-[auto_auto]">
            <span className="col-start-1 col-span-2 row-auto">
              Are you sure you want to delete?
            </span>
            <button
              className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 disabled:opacity-50"
              onClick={handleClose}
            >
              Go Back
            </button>
            <button
              className="rounded-full bg-red-800 text-white py-2 px-3 m-4 sm:hover:bg-slate-400"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirm;
