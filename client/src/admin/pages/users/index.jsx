import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material"
import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { DataGrid } from "@mui/x-data-grid"
import { FormatFullName, formatVND } from "~/helper/format"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"
import { refetch, selectorUsers } from "~/redux/userSlice"
import axiosInstance, { requestUsers } from "~/api"
import PaginationCustomize from "~/components/Pagination"
import LineOption from "~/admin/components/LineOption/LineOption"
import ButtonRefresh from "~/admin/components/LineOption/components/ButtonRefresh"
import CallMadeIcon from "@mui/icons-material/CallMade"
import { AdminTitle, ButtonCreate } from "~/admin/Styled"

export default function UserList() {
    const [data, setData] = useState([])
    const [open, setOpen] = React.useState(false)
    const [userDelete, setUserDelete] = useState(null)

    const page = new URLSearchParams(window.location.search).get("page") || 1
    const users = useSelector(selectorUsers)
    const currentPage = users && users?.data[`page-${page}`]
    const dispatch = useDispatch()

    useEffect(() => {
        if (!users.data[`page-${page}`]) requestUsers(dispatch, page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users.refetch])

    const { enqueueSnackbar } = useSnackbar()

    const handleSnackBar = (res) => {
        if (res.data.err === 0) {
            enqueueSnackbar(res.data.msg, {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "center" },
                autoHideDuration: 4000,
            })
        } else {
            enqueueSnackbar(res.data.msg, {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" },
                autoHideDuration: 4000,
            })
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = (userId, firstName, middleName, lastName) => {
        setOpen(true)
        setUserDelete({
            userId,
            fullName: FormatFullName(firstName, middleName, lastName),
        }) // Transmission userId and fullName for Alert
    }

    const handleAgreeDelete = (userId) => {
        setTimeout(async () => {
            const response = await axiosInstance("delete", `/user/${userId}`)

            if (response.data.err === 0) {
                setData(data.filter((item) => item.userId !== userId))
                handleClose() // Close Delete Box
                handleSnackBar(response)
            }

            if (response.data.err === 1) {
                handleClose()
                handleSnackBar(response)
            }
        }, 1500)
    }

    const columns = [
        { field: "userId", headerName: "ID", width: 110 },
        {
            field: "user",
            headerName: "Họ tên",
            width: 250,
            renderCell: (params) => {
                const firstName = params.row.firstName ? params.row.firstName : ""
                const middleName = params.row.middleName ? params.row.middleName : ""
                const lastName = params.row.lastName ? params.row.lastName : ""
                return (
                    <Stack alignItems="center" flexDirection="row">
                        <Avatar
                            alt="avatar"
                            src={params.row.avatar}
                            sx={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: "10px",
                            }}
                        />
                        {FormatFullName(firstName, middleName, lastName)}
                    </Stack>
                )
            },
        },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 150,
        },
        {
            field: "transactionVolume",
            headerName: "Tổng thanh toán",
            width: 200,
            renderCell: (params) => {
                return formatVND(params.row.sumPayment)
            },
        },
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/admin/user/update/" + params.row.userId}>
                            <button
                                style={{
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "5px 10px",
                                    backgroundColor: "#3bb077",
                                    color: "white",
                                    cursor: "pointer",
                                    marginRight: "20px",
                                }}
                            >
                                Chỉnh sửa
                            </button>
                        </Link>
                        <DeleteOutlineIcon
                            sx={{ color: "red", cursor: "pointer" }}
                            onClick={() =>
                                handleDelete(
                                    params.row.userId,
                                    params.row.firstName,
                                    params.row.middleName,
                                    params.row.lastName
                                )
                            }
                        />
                    </>
                )
            },
        },
    ]

    return (
        <Box sx={{ flex: 4 }}>
            <AdminTitle>Danh sách khách hàng</AdminTitle>

            <LineOption>
                <Stack flexDirection="row" alignItems="center" justifyContent="center">
                    <SortBy />
                    <ButtonRefresh />
                </Stack>

                <Stack>
                    <ButtonCreate to="/admin/user/newUser">Tạo mới</ButtonCreate>
                </Stack>
            </LineOption>

            {users.isPending ? (
                <Stack flexDirection="row" justifyContent="center" alignItems="center" height="70vh">
                    <CircularProgress />
                </Stack>
            ) : (
                <DataGrid
                    rows={currentPage ? currentPage : []}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    autoHeight
                    hideFooter
                />
            )}

            {/* Dialog Delete Box */}
            {open && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Bạn chắc chắn muốn xóa?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Người dùng{" "}
                            <Typography variant="span" fontWeight={600}>
                                {userDelete.fullName}
                            </Typography>{" "}
                            có ID{" "}
                            <Typography variant="span" fontWeight={600}>
                                {userDelete.userId}
                            </Typography>{" "}
                            sẽ được loại bỏ..!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button onClick={() => handleAgreeDelete(userDelete.userId)} autoFocus>
                            Xóa
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            <PaginationCustomize counterPage={users?.data?.sumPages} refetch={refetch()} />
        </Box>
    )
}

const SortBy = () => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(refetch())
    }

    const styles = {
        "& button": {
            textTransform: "none",
            ml: 1,
            fontSize: 16,
            fontWeight: 400,
        },

        "& svg": {
            fontSize: 16,
            ml: 1,
        },
    }

    return (
        <Stack flexDirection="row" alignItems="center" justifyContent="center" sx={styles}>
            <Typography fontWeight={500} fontSize={15}>
                Xếp theo:
            </Typography>

            <Button onClick={handleClick}>Mới nhất</Button>

            <Button>
                <Typography>Tổng thanh toán</Typography>
                <CallMadeIcon />
            </Button>
        </Stack>
    )
}
