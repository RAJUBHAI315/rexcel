import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Reducer/rootReducer";
import { Table, Pagination, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";

interface IExcel {
  [key: string]: number | string;
  // Add any other properties if you have them...
  SNO: number;
  FIRSTNAME: string;
  LASTNAME: string;
  AGE: number;
  TELEPHONE: number;
}

export const Data = () => {
  const excelHead = useSelector((state: RootState) => state.excel);
  const tableHead: string[] = excelHead["header"];
  const tableData: IExcel[] = excelHead["body"];

  const location = useLocation();

  // Define the number of items per page and the current page state
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Function to handle items per page change
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  // Calculate the max-height for the table body (always fixed)
  const tableBodyMaxHeight = "200px"; // Set your desired fixed height here

  // Function to generate the range of pagination buttons
  const generatePaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Number of buttons to display at a time

    // Calculate the starting and ending button numbers based on the current page
    let startButton = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endButton = Math.min(totalPages, startButton + maxButtons - 1);

    // Adjust the starting button number if needed
    if (endButton - startButton + 1 < maxButtons) {
      startButton = Math.max(1, endButton - maxButtons + 1);
    }

    // Add "<<" button to go to the first page
    if (currentPage > 1) {
      buttons.push(
        <span
          key="<<"
          className="pagination-button"
          onClick={() => handlePageChange(1)}
        >
          {"<<"}
        </span>
      );
    }

    // Add number buttons
    for (let i = startButton; i <= endButton; i++) {
      buttons.push(
        <span
          key={i}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }

    // Add ">>" button to go to the last page
    if (currentPage < totalPages) {
      buttons.push(
        <span
          key=">>"
          className="pagination-button"
          onClick={() => handlePageChange(totalPages)}
        >
          {">>"}
        </span>
      );
    }

    return buttons;
  };

  return (
    <div className="table-container d-flex flex-column justify-content-center ">
      <div className="m-5 table-position">
        {tableHead.length > 0 && (
          <>
            <div
              className="table-container"
              style={{ maxHeight: tableBodyMaxHeight }}
            >
              <Table striped bordered hover responsive className="custom-table">
                <thead className="thead">
                  <tr>
                    {tableHead.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {tableHead.map((header, columnIndex) => (
                          <td key={columnIndex}>{row[header]}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            {/* Pagination and items per page dropdown */}
            <div className="pagination-container">
              <Form.Group
                controlId="itemsPerPageSelect"
                className="items-per-page-select"
              >
                <Form.Label>Show rows:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleItemsPerPageChange}
                  value={itemsPerPage}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </Form.Control>
              </Form.Group>
              <div className="pagination-buttons">
                {generatePaginationButtons()}
              </div>
            </div>
          </>
        )}

        {tableHead.length === 0 && <p>No data available</p>}
      </div>
    </div>
  );
};
