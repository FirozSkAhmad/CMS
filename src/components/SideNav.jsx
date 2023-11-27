import "./SideNav.css";
import news from "../../utils/news.svg";
import insights from "../../utils/insights.svg";
import caseStudies from "../../utils/caseStudies.svg";
import logout from "../../utils/logout.svg";

const SideNav = () => {
  return (
    <div className="sideNav_con">
      <div className="Routes_con">
        <div className="heading">
          <h2>ProSquad |</h2>
          <h6>cms dashboard</h6>
        </div>
        <div className="categories_con">
          <div className="category">
            <img src={news} alt="News SVG" />
            <h3>News</h3>
          </div>
          <div className="category">
            <img src={insights} alt="insights SVG" />
            <h3>Insight</h3>
          </div>
          <div className="category">
            <img src={caseStudies} alt="caseStudies SVG" />
            <h3>Case Studies</h3>
          </div>
        </div>
      </div>
      <div className="logout_con">
        <h3>
          <u>Logout</u>
        </h3>
        <img src={logout} alt="caseStudies SVG" />
      </div>
    </div>
  );
};

export default SideNav;
