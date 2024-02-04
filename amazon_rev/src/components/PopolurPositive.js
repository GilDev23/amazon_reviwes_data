import React, { useEffect, useState } from "react";
import axios from "axios";
import ExportData from "./ExportData";

const PopolurPositive = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = process.env.REACT_APP_BACKEND_URL;

        const response = await axios.get(
          `${URL}/api/getPopolurPositiveResponses?page=${currentPage}`
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
        <td>{row["word"]}</td>
        <td>{row["frequency"]}</td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center">
        Popolur word's in positive reviews:
      </h1>
      <ExportData
        data={data}
        page={currentPage}
        sentiment={"popolar_positive"}
      />
      <table className="data-table">
        <thead>
          <tr>
            {/* <th>Column 1</th> */}
            <th>Column 2</th>
            <th>Column 3</th>
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

export default PopolurPositive;
// PopolarPositive
