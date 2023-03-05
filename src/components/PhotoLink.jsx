import {Link} from "react-router-dom";
import "./PhotoLink.scss";
export default function PhotoLink({src, title, href}) {
  return (
    <Link to={href} key={href} className="photo-link">
      <div>
        <div className="photo-link-wrap"><img src={src} alt={title}/></div>
        <h3>{title}</h3>
      </div>
    </Link>
  );
}