import React from "react";

function Table({ users, requestSort, sortConfig, visibleColumns }) {
  const getSortArrow = (column) =>
    sortConfig.key === column
      ? sortConfig.direction === "asc"
        ? "↑"
        : sortConfig.direction === "desc"
        ? "↓"
        : ""
      : "";

  return (
    <div className="scrollable-table">
      <table>
        <thead>
          <tr>
            {["Name", "ID", "Gender", "Date", "ManagerEmail", "Score", "Tenure", "Rating", "Status", "Amount", "Location"].map(
              (column) =>
                visibleColumns.includes(column) && (
                  <th key={column} onClick={() => requestSort(column)}>
                    {column} {getSortArrow(column)}
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              {visibleColumns.includes("Name") && (
                <td>
                  <span className="user-info">
                    <img
                      src={user.Picture}
                      alt={`${user.Name}'s avatar`}
                      className="user-avatar"
                    />
                    <div className="user-details">
                      <span className="user-name">{user.Name}</span>
                      <span className="user-email">{user.Email}</span>
                    </div>
                  </span>
                </td>
              )}
              {visibleColumns.includes("ID") && <td>{user.ID}</td>}
              {visibleColumns.includes("Gender") && (
                <td>{user.Gender.charAt(0).toUpperCase() + user.Gender.slice(1)}</td>
              )}
              {visibleColumns.includes("Date") && <td>{user.Date.split('-').reverse().join('-')}</td>}
              {visibleColumns.includes("ManagerEmail") && <td>{user.ManagerEmail}</td>}
              {visibleColumns.includes("Score") && <td>{user.Score}</td>}
              {visibleColumns.includes("Tenure") && <td>{user.Tenure} months</td>}
              {visibleColumns.includes("Rating") && <td>{user.Rating}</td>}
              {visibleColumns.includes("Status") && (
                <td>
                  <span className={`badge badge-${user.Status.toLowerCase()}`}>
                    {user.Status}
                  </span>
                </td>
              )}
              {visibleColumns.includes("Amount") && <td>${user.Amount}</td>}
              {visibleColumns.includes("Location") && (
                <td>{`${user.Location.City}, ${user.Location.Country}`}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
