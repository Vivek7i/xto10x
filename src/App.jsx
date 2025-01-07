import React, { useEffect, useState } from "react";
import sampleData from "./sample_data.json";
import Filters from "./components/Filters";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import useSort from "./hooks/useSort";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [scoreRangeFilter, setScoreRangeFilter] = useState("All");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState([
    "Name", "ID", "Gender", "Date", "ManagerEmail", "Score", "Tenure", "Rating", "Status", "Amount", "Location"
  ]);

  const pageSize = 10;

  const { sortedUsers, sortConfig, requestSort } = useSort(users);

  useEffect(() => {
    setUsers(sampleData); 
  }, []);

 
  const filteredUsers = sortedUsers.filter((user) => {
    const matchesSearch =
      user.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.ManagerEmail &&
        user.ManagerEmail.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "All" || user.Status === statusFilter;

    const matchesGender =
      genderFilter === "All" ||
      user.Gender.toLowerCase() === genderFilter.toLowerCase();

    const matchesRating = user.Rating >= ratingFilter;

    const matchesScoreRange =
      scoreRangeFilter === "All" ||
      (scoreRangeFilter === "1-25" && user.Score >= 1 && user.Score <= 25) ||
      (scoreRangeFilter === "26-50" && user.Score >= 26 && user.Score <= 50) ||
      (scoreRangeFilter === "51-75" && user.Score >= 51 && user.Score <= 75) ||
      (scoreRangeFilter === "76-100" && user.Score >= 76 && user.Score <= 100);

    const matchesDateRange =
      (!startDateFilter || new Date(user.Date) >= new Date(startDateFilter)) &&
      (!endDateFilter || new Date(user.Date) <= new Date(endDateFilter));

    return (
      matchesSearch && matchesStatus && matchesGender && matchesRating && matchesScoreRange && matchesDateRange
    );
  });


  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const currentPageUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  return (
    <div className="container">
      <h1>Employee's Data ({filteredUsers.length})</h1>
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        scoreRangeFilter={scoreRangeFilter}
        setScoreRangeFilter={setScoreRangeFilter}
        startDateFilter={startDateFilter}
        setStartDateFilter={setStartDateFilter}
        endDateFilter={endDateFilter}
        setEndDateFilter={setEndDateFilter}
        resetPagination={() => setCurrentPage(1)}
      />
      
      {filteredUsers.length > 0&&(<Table
        users={currentPageUsers}
        requestSort={requestSort}
        sortConfig={sortConfig}
        visibleColumns={visibleColumns}
      />)}
      {filteredUsers.length > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={setCurrentPage}
        />
      )}

      <div id="column-modal" className="modal">
        <div className="modal-content">
          <h2>Manage Columns</h2>
          <div className="checkboxes">
            {["Name", "ID", "Gender", "Date", "ManagerEmail", "Score", "Tenure", "Rating", "Status", "Amount", "Location"].map((column) => (
              <div key={column} className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id={`column-${column}`}
                  checked={visibleColumns.includes(column)}
                  onChange={() => toggleColumnVisibility(column)}
                />
                <label htmlFor={`column-${column}`}>{column}</label>
              </div>
            ))}
          </div>
          <button
            onClick={() => document.getElementById("column-modal").style.display = "none"}
            className="close-btn"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
