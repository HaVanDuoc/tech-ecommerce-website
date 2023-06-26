import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    InputLabel,
    NativeSelect,
    Stack,
    TextField,
    Typography,
    styled,
} from "@mui/material"
import React, { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PF } from "~/utils/__variables"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { selectorCurrentUser } from "~/redux/authSlice"
import HeaderProfile from "../components/HeaderProfile"
import Background from "../components/Background"
import { selectorGenders, selectorUpdateInfoUser } from "~/redux/userSlice"
import { requestGenderUser, requestUpdateInfoUser } from "~/api"
import removeEmpty from "~/helper/removeEmpty"
import ModalEditAvatar from "../components/ModalEditAvatar"
import { setOpenModalEditAvatar } from "~/redux/pageProfileSlice"

const Edit = () => {
    return (
        <Box>
            <Background />
            <HeaderProfile />
            <SectionEdit />
        </Box>
    )
}

export default Edit

const SectionEdit = () => {
    const currentUser = useSelector(selectorCurrentUser)
    const dispatch = useDispatch()

    return (
        <Box sx={{ position: "relative", top: -100 }}>
            <Container maxWidth="lg" disableGutters>
                <Stack sx={style1}>
                    <Box sx={style3}>
                        <Typography fontWeight={500}>Hoàn thiện thông tin cá nhân</Typography>
                    </Box>

                    <Divider />

                    <Box sx={style2}>
                        <Box sx={style4}>
                            <Avatar src={currentUser.isLogged && currentUser?.user?.avatar} sx={style5} />
                            <Avatar src={PF + "/assets/profile/cover-avatar.png"} sx={style6} />
                        </Box>

                        <Stack flexDirection="row" justifyContent="center" alignItems="center">
                            <Box sx={style7}>
                                <Typography
                                    fontSize={14}
                                    color="#555"
                                    onClick={() => dispatch(setOpenModalEditAvatar(true))}
                                >
                                    Đổi ảnh đại diện
                                </Typography>

                                <ModalEditAvatar />
                            </Box>
                            <Box sx={style8}>
                                <Typography fontSize={14} color="#555">
                                    Thay đổi hình nền
                                </Typography>
                            </Box>
                            <Box sx={style9}>
                                <Typography fontSize={14} color="#555">
                                    Sửa khung đại diện
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Container maxWidth="md">
                        <Box sx={style10}>
                            <FormEdit />
                        </Box>
                    </Container>
                </Stack>
            </Container>
        </Box>
    )
}

const FormEdit = () => {
    const [value, setValue] = React.useState()
    const dispatch = useDispatch()

    const currentUser = useSelector(selectorCurrentUser)
    const userId = currentUser?.user?.userId
    const firstName = currentUser?.user?.firstName
    const middleName = currentUser?.user?.middleName
    const lastName = currentUser?.user?.lastName
    const sex = currentUser?.user?.gender
    const birthday = currentUser?.user?.dateOfBirth
    const address = currentUser?.user?.address

    const genderList = useSelector(selectorGenders)
    const updateInfoUser = useSelector(selectorUpdateInfoUser)
    const isPending = updateInfoUser?.isPending

    useEffect(() => {
        requestGenderUser(dispatch)
    }, [dispatch])

    const getGenderCode = (x) => {
        if (genderList.length > 0) {
            const obj = genderList.filter((item) => item.name === x)
            return obj[0]?.code
        }
    }

    const initialValues = {
        firstName: firstName || "",
        middleName: middleName || "",
        lastName: lastName || "",
        dateOfBirth: birthday || "",
        genderCode: getGenderCode(sex) || "",
        phoneNumber: "",
        address: address || "",
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().max(15, "*Tối đa 15 ký tự"),
        middleName: Yup.string().max(15, "*Tối đa 15 ký tự"),
        lastName: Yup.string().max(20, "Tối đa 20 ký tự"),
        dateOfBirth: Yup.string(),
        genderCode: Yup.string(),
        phoneNumber: Yup.string().max(10, "Tối đa 10 ký tự"),
        address: Yup.string().max(100, "Tối đa 100 ký tự"),
    })

    const onSubmit = (values, props) => {
        values = removeEmpty(values)
        values["userId"] = userId
        requestUpdateInfoUser(dispatch, { data: values })
    }

    const fullNameArray = [
        { label: "Họ", variant: "standard", name: "firstName", type: "text", value: firstName || "" },
        { label: "Tên lót", variant: "standard", name: "middleName", type: "text", value: middleName || "" },
        { label: "Tên", variant: "standard", name: "lastName", type: "text", value: lastName || "" },
    ]

    return (
        <Fragment>
            {currentUser.isLogged && (
                <Styled>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {(props) => (
                            <Form>
                                <Stack flexDirection="row">
                                    {fullNameArray.map((item, index) => (
                                        <Field
                                            as={TextField}
                                            label={item.label}
                                            variant={item.variant}
                                            name={item.name}
                                            type={item.type}
                                            fullWidth
                                            helperText={<ErrorMessage name={item.name} />}
                                            style={{ margin: "10px" }}
                                            key={index}
                                        />
                                    ))}
                                </Stack>

                                <Stack sx={style11}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Giới tính
                                        </InputLabel>
                                        {genderList.length && (
                                            <NativeSelect
                                                defaultValue={getGenderCode(sex)}
                                                onChange={(e) => {
                                                    props.setFieldValue("genderCode", e.target.value)
                                                }}
                                            >
                                                {genderList.map((item) => (
                                                    <option name="genderCode" value={item.code} key={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </NativeSelect>
                                        )}
                                    </FormControl>
                                </Stack>

                                <FieldBirthday sx={style12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Ngày sinh"
                                            inputFormat="DD/MM/YYYY"
                                            value={value || birthday}
                                            onChange={(newValue) => {
                                                setValue(newValue)
                                                props.setFieldValue("dateOfBirth", newValue)
                                            }}
                                            renderInput={(params) => {
                                                return <Field as={TextField} name="dateOfBirth" {...params} />
                                            }}
                                        />
                                    </LocalizationProvider>
                                </FieldBirthday>

                                {address && (
                                    <Stack sx={style13}>
                                        <TextField
                                            label="Địa chỉ"
                                            multiline
                                            rows={4}
                                            placeholder="Hãy nhập địa chỉ của bạn..."
                                            defaultValue={address}
                                        />
                                    </Stack>
                                )}

                                <Stack justifyContent="center" alignItems="center">
                                    <Button type="submit">
                                        <Stack sx={style14}>
                                            {isPending ? <CircularProgress sx={{ color: "#fff" }} /> : "Lưu"}
                                        </Stack>
                                    </Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Styled>
            )}
        </Fragment>
    )
}

const FieldBirthday = styled(Stack)(() => {})

const style1 = {
    backgroundColor: "#fff",
    flexDirection: "column",
    boxShadow: "0 0 1px 1px rgba(0,0,0,0.25)",
    borderRadius: "15px",
}

const style2 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
}

const style3 = { padding: "15px 24px" }

const style4 = { position: "relative", margin: 4 }

const style5 = { width: 120, height: 120 }

const style6 = {
    width: 140,
    height: 140,
    position: "absolute",
    top: -10,
    left: -10,
}

const style7 = {
    backgroundColor: "#f1f4f9",
    padding: "3px 20px",
    margin: "0 10px",
    cursor: "pointer",
    borderRadius: "15px",
    boxShadow: "0 0 1px 1px rgba(0,0,0,0.08)",
}

const style8 = {
    backgroundColor: "#f1f4f9",
    padding: "3px 20px",
    margin: "0 10px",
    cursor: "pointer",
    borderRadius: "15px",
    boxShadow: "0 0 1px 1px rgba(0,0,0,0.08)",
}

const style9 = {
    backgroundColor: "#f1f4f9",
    padding: "3px 20px",
    margin: "0 10px",
    cursor: "pointer",
    borderRadius: "15px",
    boxShadow: "0 0 1px 1px rgba(0,0,0,0.08)",
}

const style10 = { padding: "30px 0" }

const Styled = styled(Box)(() => ({
    paddingBottom: 50,

    ".field": {
        margin: 1,
    },
}))

const style11 = {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 1,
    marginRight: 1,
}

const style12 = {
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 1,
    marginRight: 1,
}

const style13 = {
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 1,
    marginRight: 1,
}

const style14 = {
    width: 250,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--color-main)",
    borderColor: "var(--color-main)",
    borderRadius: 2,
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
    boxShadow: "0 0 3px 1px rgba(0,0,0,0.25)",
    cursor: "pointer",

    ":hover": {
        backgroundColor: "#096bd4",
        transition: "all .3s ease",
    },
}
