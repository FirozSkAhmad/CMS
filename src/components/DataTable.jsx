import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "./DataTable.css";

const PAGE_SIZE = 10;

const DataTable = ({ headerName }) => {
  const [newsData, setNewsData] = useState([]);
  const [insightsData, setInsightsData] = useState([]);
  const [caseStudiesData, setCaseStudiesData] = useState([]);

  const fetchData = async () => {
    try {
      const collectionRef = collection(db, headerName); // Replace 'your_collection_name' with the actual name of your collection
      const snapshot = await getDocs(collectionRef);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Data from Firestore:", data);
      if (headerName === "In The News") {
        setNewsData(data);
      } else if (headerName === "Insights") {
        setInsightsData(data);
      } else {
        setCaseStudiesData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Call the function to fetch data
  useEffect(() => {
    fetchData();
  }, [headerName]);

  const [currentPage, setCurrentPage] = useState(1);
  let totalPages, visibleRows;
  if (headerName === "In The News") {
    totalPages = Math.ceil(newsData.length / PAGE_SIZE);
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    visibleRows = newsData.slice(startIdx, endIdx);
  } else if (headerName === "Insights") {
    totalPages = Math.ceil(insightsData.length / PAGE_SIZE);
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    visibleRows = insightsData.slice(startIdx, endIdx);
  } else {
    totalPages = Math.ceil(caseStudiesData.length / PAGE_SIZE);
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    visibleRows = caseStudiesData.slice(startIdx, endIdx);
  }

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (rowId) => {
    const updatedSelectedRows = [...selectedRows];

    if (updatedSelectedRows.includes(rowId)) {
      updatedSelectedRows.splice(updatedSelectedRows.indexOf(rowId), 1);
    } else {
      updatedSelectedRows.push(rowId);
    }
    setSelectedRows(updatedSelectedRows);
  };

  const handleSelectAllChange = () => {
    let updatedSelectedRows;

    if (headerName === "In The News") {
      updatedSelectedRows = selectAll ? [] : newsData.map((row) => row.id);
    } else if (headerName === "Insights") {
      updatedSelectedRows = selectAll ? [] : insightsData.map((row) => row.id);
    } else {
      updatedSelectedRows = selectAll
        ? []
        : caseStudiesData.map((row) => row.id);
    }

    setSelectedRows(updatedSelectedRows);
    setSelectAll(!selectAll);
  };

  const removeRow = async (rowId) => {
    try {
      const documentRef = doc(db, headerName, rowId);
      await deleteDoc(documentRef);
      console.log(`Row with ID ${rowId} removed successfully from Firestore`);
      fetchData();
    } catch (error) {
      console.error("Error removing document:", error.message);
    }
  };

  return (
    <div className="table_container">
      <table>
        <thead>
          <tr className="tableRow_con">
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
            </th>
            <th>Title</th>
            <th className="align_right">Date Of Upload</th>
            <th className="align_center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows?.map((row) => (
            <tr className="tableRow_con" key={row.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </td>
              <td>{row.name}</td>
              <td className="align_right">{row.uploadDate.split("T")[0]}</td>
              <td className="align_center actions_con">
                <NavLink
                  to={{
                    pathname:
                      headerName !== "Case Studies" ? "/editRow" : "/csEditRow",
                    search: `rowData=${encodeURIComponent(
                      JSON.stringify(row)
                    )}&headerName=${headerName}`,
                  }}
                >
                  <u>Edit</u>
                </NavLink>
                <button
                  className="remove_btn"
                  onClick={() => removeRow(row.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination_container">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
