import React, { useEffect, useState } from "react";
import axios from "axios";
import ExportData from "./ExportData";

//import "./Test.css"; // Import your CSS file with the styles

const Test = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/getItems?page=${currentPage}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderTableRows = () => {
    if (data === null || data.length === 0) {
      return (
        <tr>
          <td colSpan="3">No data available</td>
        </tr>
      );
    }

    return data.map((row, index) => (
      <tr key={index}>
        <td>{row["0"] === "1" ? "Negative" : "Positive"}</td>
        <td>{row["1"]}</td>
        <td>{row["2"]}</td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center">
        Positive and negative reviews:
      </h1>
      <ExportData data={data} page={currentPage} sentiment={"All_Reviews"} />
      <button>
        <a href="SearchPath">Search reviews...🔎</a>
      </button>
      <table className="data-table">
        <thead>
          <tr>
            <th>positive/negative</th>
            <th>Title</th>
            <th>The content of the review</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>
      <span> Current Page: {currentPage} </span>
      <button onClick={() => handlePageChange(currentPage + 1)}>
        Next Page
      </button>
    </div>
  );
};

export default Test;
