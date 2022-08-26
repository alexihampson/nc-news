import { Link } from "react-router-dom";

const TopicCard = ({ topic }) => {
  return (
    <Link to={`/topics/${topic.slug}`}>
      <li className="border-2 border-white rounded m-4 p-2 sm:basis-20 shadow shadow-sky-800 sm:hover:shadow-lg sm:hover:shadow-sky-800">
        <div className="grid grid-rows-2">
          <span className="capitalize row-auto text-xl font-bold p-1 m-3">{topic.slug}</span>
          <span className="row-auto">{topic.description}</span>
        </div>
      </li>
    </Link>
  );
};

export default TopicCard;
