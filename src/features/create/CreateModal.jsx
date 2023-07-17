import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { HouseDataContext } from "../../contexts/HouseDataContext";
import SuccessModal from "./SuccessModal";
import FailureModal from "./FailureModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateModal() {
  const { houseData, setHouseData } = useContext(HouseDataContext);
  const [open, setOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failureModalOpen, setFailureModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    post_code: "",
    desc: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSuccessModalClose = () => setSuccessModalOpen(false);
  const handleFailureModalClose = () => setFailureModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name &&
      formData.price &&
      !isNaN(formData.price) &&
      formData.post_code &&
      formData.desc
    ) {
      try {
        const newHouse = {
          id: houseData.length + 1,
          name: formData.name,
          price: formData.price,
          post_code: formData.post_code,
          desc: formData.desc,
        };

        setHouseData([...houseData, newHouse]);

        setOpen(false);
        setSuccessModalOpen(true);
      } catch (err) {
        setOpen(false);
        setFailureModalOpen(true);
      }
    } else {
      setOpen(false);
      setFailureModalOpen(true);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Button
        type="submit"
        variant="contained"
        color="success"
        className="w-[190px] h-[56px]"
        onClick={handleOpen}
      >
        CREATE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit}>
          <div className="text-xl font-semibold">Create</div>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {/* TextFields */}
            <TextField
              id="filled-basic"
              label="Name"
              variant="filled"
              sx={{ bgcolor: "#FFFFFF" }}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              id="filled-basic"
              label="Price"
              variant="filled"
              sx={{ bgcolor: "#FFFFFF" }}
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
            <TextField
              id="filled-basic"
              label="Post Code"
              variant="filled"
              sx={{ bgcolor: "#FFFFFF" }}
              name="post_code"
              value={formData.post_code}
              onChange={handleInputChange}
            />

            {/* TextareaAutosize */}
          </div>
          <TextareaAutosize
            color="neutral"
            disabled={false}
            minRows={5}
            placeholder="Description"
            variant="outlined"
            size="lg"
            className="mb-5"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            style={{
              width: "100%",
              resize: "none",
              border: "1px solid grey",
              borderRadius: "5px",
              padding: 5,
              marginTop: 15,
            }}
          />
          <div className="w-full flex items-center justify-center gap-5">
            {/* Cancel Button */}
            <Button
              type="button"
              variant="outlined"
              className="w-2/6 h-[56px] bg-white"
              onClick={handleClose}
            >
              <div className="text-black">CANCEL</div>
            </Button>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="success"
              className="w-2/6 h-[56px]"
            >
              CREATE
            </Button>
          </div>
        </Box>
      </Modal>

      <SuccessModal
        open={successModalOpen}
        handleClose={handleSuccessModalClose}
      />
      <FailureModal
        open={failureModalOpen}
        handleClose={handleFailureModalClose}
      />
    </div>
  );
}
