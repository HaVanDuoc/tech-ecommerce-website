const { TextField } = require("@mui/material");

export const fields = [
    {
      label: "Họ",
      as: TextField,
      name: "firstName",
      type: "text",
    },
    {
      label: "Tên đệm",
      as: TextField,
      name: "middleName",
      type: "text",
    },
    {
      label: "Tên",
      as: TextField,
      name: "lastName",
      type: "text",
    },
    {
      label: "Email",
      as: TextField,
      name: "email",
      type: "text",
    },
    {
      label: "Mật khẩu",
      as: TextField,
      name: "password",
      type: "text",
    },
    {
      label: "Số điện thoại",
      as: TextField,
      name: "phoneNumber",
      type: "text",
    },
    {
      label: "Địa chỉ",
      as: TextField,
      name: "address",
      type: "text",
    },
  ];