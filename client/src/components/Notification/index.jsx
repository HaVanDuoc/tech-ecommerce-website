import React from "react";
import { Alert, Box, styled } from "@mui/material";

const Success = ({ msg }) => <Alert severity="success">{msg}</Alert>;

const Error = ({ msg }) => <Alert severity="error">{msg}</Alert>;

const StyledNotification = styled(Box)(() => ({
  position: "relative",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
}));

const Notification = (data) => {
  return (
    <StyledNotification>
      {data.data.msg !== "" &&
        (data.data.err === 0 ? (
          <Success msg={data.data.msg} />
        ) : (
          <Error msg={data.data.msg} />
        ))}
    </StyledNotification>
  );
};

export default Notification;
