// TableComponent.js
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import "./tables.css";
import NavAdmin from "../NavAdmin";
import DeleteConfirmation from "./DeleteConfirmation";
import { Link } from "react-router-dom"; // Import Link component
// import './onlystyle.css'


function TableComponent({
  columns,
  rows,
  onDelete,
  props,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
   const handleDeleteClick = (index) => {
     setRowToDelete(index + page * rowsPerPage);
     setDeleteConfirmationOpen(true);
   };

   const handleConfirmDelete = () => {
     onDelete(rowToDelete);
     setDeleteConfirmationOpen(false);
   };

   const handleCancelDelete = () => {
     setDeleteConfirmationOpen(false);
   };


  return (
    <>
      <NavAdmin />
      <div className="mainTable">
        <center>
          <h1 className="tableHeader">{props.heading}</h1>
        </center>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>                                                            
                              {column.id === "profilePic" || column.id ==="image" ? (
                                <img
                                  src={value}
                                  alt="Profile Pic"
                                  style={{ width: 50, height: 50,borderRadius: "50%"}}
                                />
                              ) : column.id === "name" ? (
                                <Link to={`/${value}`}>{value}</Link>
                            ) : column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                value
                              )}

                            </TableCell>
                          );
                        })}
                        <TableCell>
                          <IconButton
                            // onClick={() => onDelete(index + page * rowsPerPage)}
                            onClick={() => handleDeleteClick(index)}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <DeleteConfirmation
        open={deleteConfirmationOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default TableComponent;
