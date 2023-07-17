import React, { useState } from "react";
import { useContext } from "react";
import EditModal from "../edit/EditModal";
import { HouseDataContext } from "../../contexts/HouseDataContext";
import TablePagination from "@mui/material/TablePagination";

export default function TableHouseList() {
  const { houseData, setHouseData } = useContext(HouseDataContext);
  const [open, setOpen] = React.useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = event.target.value;
    setRowsPerPage(value === "all" ? houseData.length : parseInt(value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    console.log(id);
    const updatedData = houseData.filter((item) => item.id !== id);
    setHouseData(updatedData);
  };

  const handleOpen = (house) => {
    setSelectedHouse(house);
    setOpen(true);
  };

  const paginatedData =
    rowsPerPage === "all"
      ? houseData
      : houseData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div className="mt-10">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Postcode</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2 text-center">{item.id}</td>
                <td className="border px-4 py-2 text-center">{item.name}</td>
                <td className="border px-4 py-2 text-center">
                  {item.post_code}
                </td>
                <td className="border px-4 py-2 text-center">{item.price}</td>
                <td className="border px-4 py-2 text-center flex justify-center gap-5">
                  <button
                    className="bg-yellow-100 rounded-lg px-2"
                    onClick={() => handleOpen(item)}
                  >
                    <p className="text-yellow-500">VIEW DETAIL</p>
                  </button>
                  <button
                    className="bg-red-100 rounded-lg px-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    <p className="text-red-500">DELETE</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        component="div"
        count={houseData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[
          10,
          20,
          30,
          { label: "All", value: houseData.length },
        ]}
      />
      {open && (
        <EditModal
          open={open}
          house={selectedHouse}
          setOpen={setOpen}
          setHouseData={setHouseData}
        />
      )}
    </>
  );
}
