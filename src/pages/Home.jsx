import SideNav from "../components/SideNav";
import Header from "../components/Header";
import DataTable from "../components/DataTable";

import "./Home.css";

const Home = () => {
  return (
    <div className="screen">
      <div className="sideNav">
        <SideNav />
      </div>
      <div className="main">
        <Header />
        <div className="table_con">
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
