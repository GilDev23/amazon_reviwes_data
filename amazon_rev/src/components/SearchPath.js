import axios from "axios";
import React, { useState } from "react";

const SearchPath = () => {
  const [searchWord, setSearchWord] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const URL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.get(
        `${URL}/api/searchReviews?word=${searchWord}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching search data:", error);
      // Display an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const renderTableRows = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td colSpan="3">No data available</td>
        </tr>
      );
    }

    return data.map((row) => (
      <tr key={row.id}>
        <td>{row["0"] === "1" ? "Negative" : "Positive"}</td>
        <td>{row["1"]}</td>
        <td>{row["2"]}</td>
      </tr>
    ));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="container d-flex justify-content-center m-3">
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      <div className="container">
        {data.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default SearchPath;
