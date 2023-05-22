import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { Fragment } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { PF } from "~/__variables";
import { useSnackbar } from "notistack";
import { formatPhoneNumber } from "~/helper/format";
import dayjs from "dayjs";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import axiosInstance from "~/utils/axiosInstance";

const ButtonCreateOrder = () => {
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [reset, setReset] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onChange = (e) => {
    const search = async () => {
      const response = await axiosInstance({
        method: "post",
        url: "/admin/orders/findCustomer",
        data: { key: e.target.value },
      });

      setResult(response.data.data);
    };

    search();
  };

  console.log("result", result);

  return (
    <Fragment>
      <Stack sx={style1}>
        <Button variant="contained" sx={style2} onClick={handleOpen}>
          Tạo hóa đơn
        </Button>
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Input>
            <SearchIcon />
            <input
              id="input-search"
              placeholder="Tìm kiếm khách hàng..."
              autoFocus
              onChange={onChange}
            />
          </Input>
          <AutoComplete>
            {Array.isArray(result) ? (
              result.length ? (
                result.map((item, index) => {
                  return (
                    <Item
                      index={index}
                      user_id={item.user_id}
                      avatar={item.avatar}
                      fullName={item.fullName}
                      sex={item.gender}
                      phoneNumber={item.phoneNumber}
                      address={item.address}
                      birthday={item.dateOfBirth}
                      reset={reset}
                      setReset={setReset}
                    />
                  );
                })
              ) : (
                <NoResult
                  value={document.querySelector("#input-search").value}
                />
              )
            ) : (
              <StartSearch />
            )}
          </AutoComplete>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default ButtonCreateOrder;

const style2 = {
  backgroundColor: "teal",
  paddingLeft: 4,
  paddingRight: 4,
  borderRadius: 2,
  textTransform: "capitalize",
  maxHeight: "42px",

  "&:hover": {
    backgroundColor: "#036363",
  },
};

const style1 = {
  flex: 1,
  display: "flex",
  flexDirection: "row",
  justifyContent: "right",
  borderTop: "1px solid rgba(224, 224, 224, 1)",
  padding: 2,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundColor: "#fff",
  boxShadow: 24,
  borderRadius: 5,
};

const Input = styled(Stack)(() => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
  flexDirection: "row",
  padding: 10,
  overflow: "hidden",
  borderBottom: "1px solid #ccc",

  "& svg, input": {
    height: 50,
  },

  "& svg": {
    fontSize: "30px",
    color: "dodgerblue",
    marginRight: 10,
    marginLeft: 10,
  },

  "& input": {
    flex: 1,
    border: "none",
    fontSize: 18,
    lineHeight: 5,
  },
}));

const AutoComplete = styled(Stack)(() => ({
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
}));

const NoResult = ({ value }) => {
  return (
    <Stack justifyContent="center" alignItems="center" minHeight={400}>
      <img
        src={
          PF +
          "/assets/admin-order-detail/5436450020c1e39a6d6626c8c2349dfb_8449394452872526297.gif"
        }
        alt=""
      />
      <Typography color="666" fontSize={18}>
        {`Không tìm thấy khách hàng nào phù hợp với "${value}"`}
      </Typography>
    </Stack>
  );
};

const StartSearch = () => {
  return (
    <Stack justifyContent="center" alignItems="center" minHeight={400}>
      <img
        src={PF + "/assets/admin-order-detail/hoyo.gif"}
        alt=""
        width={120}
      />
      <Typography color="666" fontSize={18}>
        Hãy nhập số điện thoại hoặc họ tên khách hàng!
      </Typography>
    </Stack>
  );
};

const Item = ({
  index,
  user_id,
  avatar,
  fullName,
  sex,
  phoneNumber,
  address,
  birthday,
  reset,
  setReset,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSnackBar = (res) => {
    if (res.data.err === 0) {
      enqueueSnackbar(res.data.msg, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 4000,
      });
    } else {
      enqueueSnackbar(res.data.msg, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 4000,
      });
    }
  };

  const handleAddProduct = () => {
    const addProduct = async () => {
      const response = await axiosInstance({
        method: "post",
        url: "/admin/orders/orderDetails/addProduct",
        // data: { order_detail_id, product_id: id, quantity },
      });

      handleSnackBar(response);

      //   handleClose();

      setReset(!reset);
    };

    addProduct();
  };

  return (
    <Stack
      key={index}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      height={150}
      padding="12px 54px"
      width="100%"
      sx={{
        ":hover": {
          backgroundColor: "#1e90ff12",
        },
      }}
    >
      <Stack
        flexDirection="row"
        height="100%"
        width="70%"
        alignItems="center"
        justifyContent="start"
      >
        <Stack
          width="30%"
          height="80%"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            src={avatar}
            alt="avatar"
            sx={{ height: "100%", width: "auto", aspectRatio: "1" }}
          />
        </Stack>

        <Stack ml={2}>
          <Typography
            sx={{
              color: "#d51919",
              fontWeight: 500,
              textTransform: "uppercase",
              fontFamily: "'Chakra Petch', sans-serif",
              paddingBottom: 1,
            }}
          >
            {fullName} {birthday && "(" + dayjs(birthday).format("YYYY") + ")"}
          </Typography>

          {phoneNumber ? (
            <FieldPhoneNumber>
              {formatPhoneNumber(phoneNumber)}
            </FieldPhoneNumber>
          ) : (
            <FieldPhoneNumber>Số điện thoại: Không rõ</FieldPhoneNumber>
          )}

          {address ? (
            <FieldAddress>{address}</FieldAddress>
          ) : (
            <FieldAddress>Địa chỉ: Không rõ</FieldAddress>
          )}
        </Stack>
      </Stack>

      <ButtonSelectUser href={`/admin/orders/createOrder/${user_id}`}>
        <CheckCircleOutlinedIcon />
      </ButtonSelectUser>
    </Stack>
  );
};

const ButtonSelectUser = ({ children, href }) => {
  return (
    <Stack
      sx={{
        "& svg": {
          ":hover": {
            cursor: "pointer",
            color: "dodgerblue",
          },
        },
      }}
    >
      <Tooltip title="Chọn">
        <IconButton href={href}>{children}</IconButton>
      </Tooltip>
    </Stack>
  );
};

const FieldPhoneNumber = ({ children }) => {
  return (
    <Typography
      className="name-product"
      sx={{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 500,
        paddingBottom: 1,
        fontSize: "17px",
        color: "var(--color-text)",
        overflowWrap: "break-word",
      }}
    >
      {children}
    </Typography>
  );
};

const FieldAddress = ({ children }) => (
  <Typography
    className="name-product"
    sx={{
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
      paddingBottom: 1,
      fontSize: "17px",
      color: "var(--color-text)",
      overflowWrap: "break-word",
    }}
  >
    {children}
  </Typography>
);
