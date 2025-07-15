import { Link } from "react-router";
import "./Event.css";

function Event({ id, name, desc, date }) {
  return (
    <div className="event">
      <div className="event-top">
        <span className="event-name">{name}</span>
        <span className="event-date">{date}</span>
      </div>
      <p className="event-desc">{desc}</p>
      <div className="event-bottom">
        <Link to={`/eventDetail/${id}`} className="event-details">
          Details
        </Link>
      </div>
    </div>
  );
}

export default Event;
