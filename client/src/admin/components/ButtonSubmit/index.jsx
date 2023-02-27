import { Button, CircularProgress } from "@mui/material";
import React from "react";

const ButtonSubmit = ({ children, disabled }) => {
  return (
    <Button
      type="submit"
      disabled={disabled}
      sx={{
        width: 200,
        border: "2px solid transparent",
        borderRadius: 3,
        backgroundColor: "darkblue",
        color: "white",
        padding: "7px 10px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all .4s ease",

        "&:hover": {
          border: "2px solid darkblue",
          color: "darkblue !important",
        },
      }}
    >
      {disabled ? (
        <CircularProgress
          sx={{
            "&.MuiCircularProgress-root": {
              width: "25px !important",
              height: "25px !important",
            },
          }}
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonSubmit;
