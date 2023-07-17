import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export default function FormConnection() {
  const [url, setUrl] = useState("localhost");
  const [port, setPort] = useState("8080");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ทำสิ่งที่คุณต้องการเมื่อกด Submit
    // เช่นเรียกใช้งาน API หรือดำเนินการอื่นๆ
    try {
      const response = await axios.get(`${url}:${port}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handlePortChange = (e) => {
    setPort(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        marginBottom: 2,
        width: "90vw",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        id="url"
        label="URL"
        value={url}
        onChange={handleUrlChange}
        className="w-1/2"
      />
      <TextField
        required
        id="port"
        label="PORT"
        value={port}
        onChange={handlePortChange}
        className="w-1/2"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="w-1/6 h-[56px]"
      >
        CONNECT
      </Button>
    </Box>
  );
}
