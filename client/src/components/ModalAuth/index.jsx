import { Box, Modal, styled } from "@mui/material";
import React from "react";
import FormLogin from "./FormLogin";

const ModalAuthWrapper = styled(Box)(() => ({}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid transparent",
  borderRadius: "var(--border-radius)",
  boxShadow: 24,
  p: 4,
};

const ModalAuth = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ModalAuthWrapper>
      {/* Button use Modal */}
      <Box onClick={handleOpen}>{children}</Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormLogin />
        </Box>
      </Modal>
    </ModalAuthWrapper>
  );
};

export default ModalAuth;
