import Header from "../components/Header";
import DataTable from "../components/DataTable";

const Main = ({ name }) => {
  return (
    <div>
      <Header headerName={name} />
      <div className="table_con">
        <DataTable />
      </div>
    </div>
  );
};

export default Main;
