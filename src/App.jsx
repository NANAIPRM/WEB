import * as React from "react";
import CreateModal from "./features/create/createModal";
import FormConnection from "./features/connection/FormConnection";
import TableHouseList from "./features/table/tableHouseList";
import SelectPostCode from "./features/selectPostCode/selectPostCode";

function App() {
  return (
    <>
      <div className="bg-[#f4f7fc] h-[15vh]  mx-auto flex justify-center items-end">
        <FormConnection />
      </div>
      <div className="w-[90vw] mx-auto flex justify-between items-center mt-5">
        <p className="text-xl font-bold p-1">HOUSE LIST</p>
        <CreateModal />
      </div>
      <div className="w-[90vw] mx-auto">
        <TableHouseList />
      </div>
      <div className="bg-[#f4f7fc] h-[15vh] p-20 mx-auto flex justify-center ">
        <SelectPostCode />
      </div>
    </>
  );
}

export default App;
