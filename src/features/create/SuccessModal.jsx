import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function SuccessModal({ open, handleClose }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col items-center justify-center gap-5">
          <FontAwesomeIcon
            icon={faCheckCircle}
            style={{ color: "#36f780", width: "50px", height: "50px" }}
          />
          <div className="text-xl font-semibold">Success</div>
          <div>Create a Successfull!</div>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{
              backgroundColor: "white",
              border: "1px solid grey",
              width: "50%",
            }}
          >
            <p className="text-black">CONTINUE</p>
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
