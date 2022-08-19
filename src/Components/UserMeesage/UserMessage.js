import React from "react";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

const displayMeesageAlert = ({ type, message, openAlert, setOpenAlert }) => {
  const handleClose = () => {
    setOpenAlert(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={3000}
      onClose={handleClose}
      action={action}
    >
      <Alert
        multiple
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default displayMeesageAlert;
