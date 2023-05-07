import { Box, InputBase, Stack, Typography, styled } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminTitle } from "~/admin/Styled";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import axios from "axios";
import {
  FormatFullName,
  formatCost,
  formatDiscount,
  formatPhoneNumber,
  formatPrice,
} from "~/helper/format";
import dayjs from "dayjs";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const codeOrder = useParams().codeOrder;

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios({
        method: "post",
        url: "/admin/orders/getOrderDetails",
        data: { codeOrder },
      });

      setOrders(response.data.data);
    };

    getOrders();
  }, [codeOrder]);

  console.log("orders", orders);

  const Wrapper = styled(Box)(() => ({
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  }));

  const Title = ({ children }) => {
    return (
      <Stack>
        <Typography
          color="#666"
          fontWeight={500}
          marginTop={1}
          marginBottom={1}
        >
          {children}
        </Typography>
      </Stack>
    );
  };

  const personal = [
    {
      field: "Khách hàng:",
      value: FormatFullName(
        orders.firstName,
        orders.middleName,
        orders.lastName
      ),
    },
    {
      field: "Sinh ngày:",
      value: dayjs(orders.dateOfBirth).format("DD/MM/YYYY"),
    },
    { field: "Giới tính:", value: orders.gender },
    { field: "Địa chỉ:", value: orders.address },
  ];

  const contact = [
    {
      field: "Số điện thoại:",
      value: formatPhoneNumber(orders.phoneNumber),
    },
    {
      field: "Email:",
      value: orders.email,
    },
  ];

  const FieldInfo = ({ index, name, value }) => {
    return (
      <Stack
        flexDirection="row"
        justifyContent="start"
        alignItems="center"
        key={index}
      >
        <Stack mr={2}>{name}</Stack>
        <Stack fontWeight={500}>{value}</Stack>
      </Stack>
    );
  };

  const OrderItem = ({ index, image, name, price, discount, category }) => {
    return (
      <Stack
        flexDirection="row"
        justifyContent="start"
        alignItems="center"
        key={index}
        sx={{ borderBottom: "1px solid #ccc" }}
      >
        <Stack justifyContent="center" alignItems="center" width={120}>
          <img src={image && JSON.parse(image)[0].base64} alt="" width="100%" />
        </Stack>

        <Stack justifyContent="center" alignItems="start" marginLeft={1}>
          <Box>
            <Typography className="name">{`${category} ${name}`}</Typography>
          </Box>
          <Stack
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              "& p": {
                marginRight: 1,
              },
            }}
          >
            <Typography color="crimson" fontWeight={500}>
              {formatPrice(price, discount)}
            </Typography>
            {discount && (
              <Fragment>
                <Typography>{formatCost(price)}</Typography>
                <Typography fontSize={14}>
                  {formatDiscount(discount)}
                </Typography>
              </Fragment>
            )}
          </Stack>
        </Stack>
      </Stack>
    );
  };

  const Left = styled(Stack)(() => ({}));
  const Right = styled(Stack)(() => ({}));
  const InfoCustomer = styled(Stack)(() => ({}));
  const InfoPersonal = styled(Stack)(() => ({}));
  const InfoContact = styled(Stack)(() => ({ marginTop: 15 }));
  const ProductOrder = styled(Stack)(() => ({}));
  const ListOrder = styled(Stack)(() => ({}));
  const Row = styled(Stack)(() => ({
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }));

  return (
    <Wrapper>
      <AdminTitle>Chi tiết hóa đơn</AdminTitle>

      <Stack flexDirection="row">
        <Left width={350}>
          <InfoCustomer>
            <InfoPersonal>
              <Title>Thông tin khách hàng</Title>

              {personal.map((item, index) => {
                return (
                  <FieldInfo
                    index={index}
                    name={item.field}
                    value={item.value}
                  />
                );
              })}
            </InfoPersonal>

            <InfoContact>
              <Title>Thông tin liên lạc</Title>

              {contact.map((item, index) => {
                return (
                  <FieldInfo
                    index={index}
                    name={item.field}
                    value={item.value}
                  />
                );
              })}
            </InfoContact>
          </InfoCustomer>
        </Left>

        <Right flex={1}>
          <ProductOrder>
            <Row>
              <Typography variant="span" fontWeight={500}>
                Đơn hàng{" "}
              </Typography>
              <Typography variant="span" color="dodgerblue">
                {orders.order_code}
              </Typography>
            </Row>

            <ListOrder>
              {orders &&
                orders.order_list &&
                orders.order_list.map((item, index) => {
                  return (
                    <OrderItem
                      index={index}
                      image={item.image}
                      name={item.name_product}
                      price={item.price}
                      discount={item.discount}
                      category={item.category}
                    />
                  );
                })}
              <OrderItem />
            </ListOrder>
          </ProductOrder>
        </Right>
      </Stack>
    </Wrapper>
  );
};

export default OrderDetails;
