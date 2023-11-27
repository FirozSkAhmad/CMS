import searchIcon from "../../utils/searchIcon.svg";
import './Header.css'

const Header = () => {
  return (
    <div className="header_con">
      <div className="title">
        <h2>In The News</h2>
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
        <button>
          Upload New
        </button>
      </div>
    </div>
  );
};

export default Header;
