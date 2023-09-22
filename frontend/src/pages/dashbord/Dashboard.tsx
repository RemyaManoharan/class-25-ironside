import { Link } from "react-router-dom";

function Dashbord() {
  return (
    <div>
      <div>
        <Link to={"/home"}>Home</Link>
      </div>
      <div>
        <Link to={"/event"}>Event</Link>
      </div>
      <div>
        <Link to={"/schedule"}>Schedule</Link>
      </div>
      <div>
        <Link to={"/history"}>History</Link>
      </div>
      <div>
        <Link to={"/company"}>Company</Link>
      </div>
      <div>
        <Link to={"/messages"}>Messages</Link>
      </div>
    </div>
  );
}

export default Dashbord;
