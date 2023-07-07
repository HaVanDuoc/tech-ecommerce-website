import { Avatar, Box, Button, IconButton, Modal, Stack, Tooltip, Typography, styled } from "@mui/material"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import { resetSearch, selectorSearchUser } from "~/redux/userSlice"
import { useDispatch, useSelector } from "react-redux"
import SearchIcon from "@mui/icons-material/Search"
import { formatPhoneNumber } from "~/helper/format"
import React, { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom"
import { requestSearchUser } from "~/api"
import { PF } from "~/utils/__variables"
import dayjs from "dayjs"

const ButtonCreateOrder = () => {
    const [open, setOpen] = useState(false)
    const [key, setKey] = useState()

    const search = useSelector(selectorSearchUser)
    const dispatch = useDispatch()

    const handleOpen = () => {
        if (search?.payload?.length) resetSearch()
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

    const onChange = (e) => {
        setKey(e.target.value)
        requestSearchUser(dispatch, e.target.value)
    }

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
                        <input id="input-search" placeholder="Tìm kiếm khách hàng..." autoFocus onChange={onChange} />
                    </Input>

                    <AutoComplete>
                        {key ? (
                            search?.payload?.length ? (
                                search?.payload?.map((item, index) => {
                                    return <Item index={index} />
                                })
                            ) : (
                                <NoResult value={key} />
                            )
                        ) : (
                            <StartSearch />
                        )}
                    </AutoComplete>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default ButtonCreateOrder

const Item = ({ index }) => {
    const searches = useSelector(selectorSearchUser)?.payload

    const user_id = searches[index].user_id
    const avatar = searches[index].avatar
    const fullName = searches[index].fullName
    const birthday = searches[index].birthday
    const phoneNumber = searches[index].phoneNumber
    const address = searches[index].address

    return (
        <Stack
            key={index}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            height={150}
            padding="12px 54px"
            width="100%"
            sx={{ ":hover": { backgroundColor: "#1e90ff12" } }}
        >
            <Stack flexDirection="row" height="100%" width="70%" alignItems="center" justifyContent="start">
                <Stack width="30%" height="80%" justifyContent="center" alignItems="center">
                    <Avatar src={avatar} alt="avatar" sx={{ height: "100%", width: "auto", aspectRatio: "1" }} />
                </Stack>

                <Stack ml={2}>
                    <Typography sx={style3}>
                        {fullName} {birthday && "(" + dayjs(birthday).format("YYYY") + ")"}
                    </Typography>

                    {phoneNumber ? (
                        <FieldPhoneNumber>{formatPhoneNumber(phoneNumber)}</FieldPhoneNumber>
                    ) : (
                        <FieldPhoneNumber>Số điện thoại: Không rõ</FieldPhoneNumber>
                    )}

                    {address ? <FieldAddress>{address}</FieldAddress> : <FieldAddress>Địa chỉ: Không rõ</FieldAddress>}
                </Stack>
            </Stack>

            <ButtonSelectUser href={`/admin/orders/createOrder/${user_id}`}>
                <CheckCircleOutlinedIcon />
            </ButtonSelectUser>
        </Stack>
    )
}

const NoResult = ({ value }) => {
    return (
        <Stack justifyContent="center" alignItems="center" minHeight={400}>
            <img
                src={PF + "/assets/admin-order-detail/5436450020c1e39a6d6626c8c2349dfb_8449394452872526297.gif"}
                alt=""
            />
            <Typography color="666" fontSize={18}>
                {`Không tìm thấy khách hàng nào phù hợp với "${value}"`}
            </Typography>
        </Stack>
    )
}

const StartSearch = () => {
    return (
        <Stack justifyContent="center" alignItems="center" minHeight={400}>
            <img src={PF + "/assets/admin-order-detail/hoyo.gif"} alt="" width={120} />
            <Typography color="666" fontSize={18}>
                Hãy nhập số điện thoại hoặc họ tên khách hàng!
            </Typography>
        </Stack>
    )
}

const ButtonSelectUser = ({ children, href }) => {
    const navigate = useNavigate()
    const handleClick = () => navigate(href)

    return (
        <Stack sx={{ "& svg": { ":hover": { cursor: "pointer", color: "dodgerblue" } } }}>
            <Tooltip title="Chọn">
                <IconButton onClick={handleClick}>{children}</IconButton>
            </Tooltip>
        </Stack>
    )
}

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
    )
}

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
)

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
}

const style1 = {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "right",
    borderTop: "1px solid rgba(224, 224, 224, 1)",
    padding: 2,
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    backgroundColor: "#fff",
    boxShadow: 24,
    borderRadius: 5,
}

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
}))

const AutoComplete = styled(Stack)(() => ({
    position: "relative",
    justifyContent: "start",
    alignItems: "center",
    maxHeight: 460,
    overflowY: "scroll",
}))

const style3 = {
    color: "#d51919",
    fontWeight: 500,
    textTransform: "uppercase",
    fontFamily: "'Chakra Petch', sans-serif",
    paddingBottom: 1,
}
