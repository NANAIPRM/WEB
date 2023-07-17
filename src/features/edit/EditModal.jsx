import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import SuccessModal from "../create/SuccessModal";
import FailureModal from "../create/FailureModal";
import { faL } from "@fortawesome/free-solid-svg-icons";

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

export default function EditModal({ open, house, setOpen, setHouseData }) {
  const [formData, setFormData] = React.useState({
    name: house.name || "",
    price: house.price || "",
    post_code: house.post_code || "",
    desc: house.desc || "",
  });

  const handleClose = () => setOpen(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = React.useState(false);
  console.log(isSuccessModalOpen);

  const handleSuccessModalClose = () => setIsSuccessModalOpen(false);
  const handleFailureModalClose = () => setIsFailureModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name &&
      formData.price &&
      !isNaN(formData.price) &&
      formData.post_code &&
      formData.desc
    ) {
      const updatedHouse = {
        ...house,
        name: formData.name,
        price: formData.price,
        post_code: formData.post_code,
        desc: formData.desc,
      };

      setHouseData((prevData) =>
        prevData.map((item) => (item.id === house.id ? updatedHouse : item))
      );
      setIsSuccessModalOpen(true);
    } else {
      setIsFailureModalOpen(true);
    }

    // setOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  React.useEffect(() => {
    if (!open) {
      // Clear form data when modal is closed
      setFormData({
        name: house.name || "",
        price: house.price || "",
        post_code: house.post_code || "",
        desc: house.desc || "",
      });
    }
  }, [open]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit}>
          <div className="text-xl font-semibold">Edit House Details</div>
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
              UPDATE
            </Button>
          </div>
        </Box>
      </Modal>
      <SuccessModal
        open={isSuccessModalOpen}
        handleClose={handleSuccessModalClose}
      />
      <FailureModal
        open={isFailureModalOpen}
        handleClose={handleFailureModalClose}
      />
    </div>
  );
}
