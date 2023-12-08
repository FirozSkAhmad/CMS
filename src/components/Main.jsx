import Header from "../components/Header";
import DataTable from "../components/DataTable";
import './Main.css'

const Main = ({ name }) => {
  return (
    <div className="master_con">
      <Header headerName={name} />
      <DataTable headerName={name} />
    </div>
  );
};

export default Main;
