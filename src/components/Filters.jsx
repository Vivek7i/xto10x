import React from "react";

function Filters({
  searchQuery, setSearchQuery, statusFilter,setStatusFilter, genderFilter,setGenderFilter, ratingFilter,setRatingFilter,
  scoreRangeFilter,setScoreRangeFilter, startDateFilter, setStartDateFilter, endDateFilter, setEndDateFilter,
  resetPagination
}) {
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    resetPagination();
  };

  const handleScoreRangeChange = (e) => {
    setScoreRangeFilter(e.target.value);
    resetPagination();
  };

  const handleDateRangeChange = (e) => {
    if (e.target.name === "startDate") {
      setStartDateFilter(e.target.value);
    } else if (e.target.name === "endDate") {
      setEndDateFilter(e.target.value);
    }
    resetPagination();
  };

  const resetFilters = () => {
    window.location.reload();
  };

  return (
    <div className="filters">
      <div className="filters-container">
        <div >
          <input
            type="text"
            placeholder="Search by name, email, or manager email"
            value={searchQuery}
            onChange={handleChange(setSearchQuery)}
            className="search-input-container"
          />
        </div>

        <div className="filter-options">
          <select
            value={statusFilter}
            onChange={handleChange(setStatusFilter)}
            className="filter-dropdown"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Archived">Archived</option>
          </select>

          <select
            value={genderFilter}
            onChange={handleChange(setGenderFilter)}
            className="filter-dropdown"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={ratingFilter}
            onChange={handleChange(setRatingFilter)}
            className="filter-dropdown"
          >
            {[0, 1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}+ Stars
              </option>
            ))}
          </select>

          <select
            value={scoreRangeFilter}
            onChange={handleScoreRangeChange}
            className="filter-dropdown"
          >
            <option value="All">All Scores</option>
            <option value="1-25">1-25</option>
            <option value="26-50">26-50</option>
            <option value="51-75">51-75</option>
            <option value="76-100">76-100</option>
          </select>


          <div className="date-range">
            <input
              type="date"
              name="startDate"
              value={startDateFilter}
              onChange={handleDateRangeChange}
              className="date-input"
              placeholder="Start Date"
            />
            <span>to</span>
            <input
              type="date"
              name="endDate"
              value={endDateFilter}
              onChange={handleDateRangeChange}
              className="date-input"
            />
          </div>
          <button
            onClick={() => document.getElementById("column-modal").style.display = "flex"}
            className="manage-columns-btn"
          >
            Manage Columns
          </button>
          <button
            onClick={resetFilters}
            className="reset-filters-btn"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filters;
