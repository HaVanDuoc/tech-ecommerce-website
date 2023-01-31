import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React from "react";

const FormLoginWrapper = styled("form")(() => ({}));

const Title = styled(Box)(() => ({
  fontSize: "1.3rem",
  fontWeight: "500",
  textAlign: "center",
  marginBottom: "20px",
}));

const FieldInput = ({ label }) => {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      fullWidth
      sx={{ marginBottom: "15px" }}
    />
  );
};

const FieldPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      sx={{ width: "100%", marginBottom: "10px" }}
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
};

const FieldForgotPasswordLink = styled(Link)(() => ({}));

const ButtonSubmit = ({ children }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        margin: "15px 0",
        height: "50px",
        borderRadius: "var(--border-radius)",
      }}
    >
      {children}
    </Button>
  );
};

const MethodOther = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Divider textAlign="center">
          <Chip
            label="Hoặc đăng nhập với"
            sx={{
              fontSize: "0.9rem",
              fontStyle: "italic",
              color: "var(--color-text)",
              margin: "10px 0",
            }}
          />
        </Divider>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Button
          size="large"
          variant="outlined"
          fullWidth
          sx={{ height: "50px", margin: "10px 0" }}
        >
          <GoogleIcon color="red" />
          <Typography
            sx={{
              textTransform: "none",
              marginLeft: "10px",
              color: "var(--color-text)",
            }}
          >
            Đăng nhập với Google
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

const FormLogin = () => {
  return (
    <FormLoginWrapper>
      <Title>Đăng nhập</Title>
      <FieldInput label="Tên đăng nhập" />
      <FieldPassword />
      <FieldForgotPasswordLink>Quên mật khẩu?</FieldForgotPasswordLink>
      <ButtonSubmit>Đăng nhập</ButtonSubmit>
      <MethodOther />
    </FormLoginWrapper>
  );
};

export default FormLogin;
