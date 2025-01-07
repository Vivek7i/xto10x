import React from "react";

function Modal({visibleColumns,setVisibleColumns}) {
    
    const toggleColumnVisibility = (column) => {
        setVisibleColumns((prev) =>
          prev.includes(column)
            ? prev.filter((col) => col !== column)
            : [...prev, column]
        );
      };
  return (
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
  );
}

export default Modal;
