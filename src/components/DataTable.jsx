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

  let completeData;
  if (headerName === "In The News") {
    completeData = newsData;
  } else if (headerName === "Insights") {
    completeData = insightsData;
  } else {
    completeData = caseStudiesData;
  }

  const removeCard = async (rowId) => {
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
    <div className="cards_container">
      {completeData?.map((data) => (
        <div className="card" key={data.id}>
          <div className="img_con">
            <img
              src={data?.img}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "fill",
                borderRadius:"10px 10px 0 0"
              }}
              alt="Preview"
            />
          </div>
          <div className="body_con">
            <h3>{data?.name}</h3>
            <p>{headerName!=="Case Studies"?data?.bodyText:data.context}</p>
          </div>
          <div className="btns_con">
            <NavLink
              to={{
                pathname:
                  headerName !== "Case Studies" ? "/editRow" : "/csEditRow",
                search: `rowData=${encodeURIComponent(
                  JSON.stringify(data)
                )}&headerName=${headerName}`,
              }}
            >
              <u>Edit</u>
            </NavLink>
            <button className="remove_btn" onClick={() => removeCard(data.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataTable;
