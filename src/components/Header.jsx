import searchIcon from "../../utils/searchIcon.svg";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = ({ headerName }) => {
  return (
    <div className="header_con">
      <div className="title">
        <h2>{headerName}</h2>
      </div>
      <div className="actions_con">
        <div className="search_container">
          <input
            type="text"
            className="search_input"
            placeholder="Search Title By Name"
          />
          <img className="search_icon" src={searchIcon} alt="searchIcon SVG" />
        </div>
        <NavLink style={{ textDecoration: "none" }} to="/upload">
          <button>Upload New</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
