import React, { useEffect, useState } from "react";
import axios from "axios";
import ExportData from "./ExportData";

const PositiveReviews = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(
          `${URL}/api/getPositiveResponses?page=${currentPage}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or display an error message to the user
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  console.log(data);

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
        {/* <td>{row["0"]}</td> */}
        <td>{row["1"]}</td>
        <td>{row["2"]}</td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center">Positive reviews:</h1>
      <ExportData data={data} page={currentPage} sentiment={"positive"} />
      <button>
        <a href="PopolurPositive">Popolur word's</a>
      </button>
      <table className="data-table">
        <thead>
          <tr>
            {/* <th>Column 1</th> */}
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

export default PositiveReviews;

//import "./Test.css"; // Import your CSS file with the styles
