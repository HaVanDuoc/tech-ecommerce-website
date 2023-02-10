import { Box, Modal, styled } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectorShow } from "~/redux/ModalContainer/ModalContainerReducer";

const Styled = styled(Box)(() => ({}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid transparent",
  borderRadius: "var(--border-radius)",
  boxShadow: 24,
  p: 4,
};

const ModalContainer = ({ children }) => {
  // State for open Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const show = useSelector(selectorShow);

  return (
    <Styled>
      {/* Button use Modal */}
      <Box onClick={handleOpen}>{children}</Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{show}</Box>
      </Modal>
    </Styled>
  );
};

export default ModalContainer;
