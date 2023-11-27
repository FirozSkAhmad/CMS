import { useState } from "react";
import "./DataTable.css";

const PAGE_SIZE = 10;

const DataTable = () => {
  const rows = [
    {
      id: 1,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 2,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 3,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 4,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 5,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 6,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 7,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 8,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 9,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 10,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 11,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 12,
      title: "In The World Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 14,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 15,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 16,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 17,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 18,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 19,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 20,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 21,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 22,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 23,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 24,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 25,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 26,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 27,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 28,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 29,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 30,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 31,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 32,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
    {
      id: 33,
      title: "In The News Title",
      dateOfUpload: "15-11-23",
      actions: "Edit",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(rows.length / PAGE_SIZE);

  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const visibleRows = rows.slice(startIdx, endIdx);

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
    const updatedSelectedRows = selectAll ? [] : rows.map((row) => row.id);
    setSelectedRows(updatedSelectedRows);
    setSelectAll(!selectAll);
  };

  const handleEdit = (rowId) => {
    // Replace this with your actual logic for making an API call for editing
    console.log(`Edit row ${rowId}`);
  };

  const removeRow = (rowId) => {
    // Replace this with your actual logic for making an API call for removing
    console.log(`Remove row ${rowId}`);
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
          {visibleRows.map((row) => (
            <tr className="tableRow_con" key={row.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </td>
              <td>{row.title}</td>
              <td className="align_right">{row.dateOfUpload}</td>
              <td className="align_center actions_con">
                <p
                  onClick={() => handleEdit(row.id)}
                  style={{ cursor: "pointer" }}
                >
                  <u>Edit</u>
                </p>
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
