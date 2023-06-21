import React, { Fragment, useEffect, useState } from "react"
import { AdminTitle, FieldForm } from "~/admin/Styled"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import ButtonSubmit from "~/admin/components/ButtonSubmit"
import { useSnackbar } from "notistack"
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined"
import DeleteIcon from "@mui/icons-material/Delete"
import { formatCapitalization } from "~/helper/format"
import CheckIcon from "@mui/icons-material/Check"
import refreshPage from "~/utils/refreshPage"
import {
    Box,
    Chip,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import axiosInstance, { requestBrands, requestCategories, requestCheckNewNameProduct } from "~/api"
import addOrUpdateURLParams from "~/utils/addURLParams"
import { selectorCategories } from "~/redux/categorySlice"
import { refetchBrands, selectorBrands } from "~/redux/brandSlice"
import { exportResponse, setResponse } from "~/redux/alertSlice"

export default function CreateNewProduct() {
    const [isSubmitting, setSubmitting] = React.useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()

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

    const checkName = async () => {
        const input = document.querySelector("input#name").value

        if (input) {
            const response = await requestCheckNewNameProduct(input)
            handleSnackBar(response)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, props) => {
                const formData = new FormData()

                // add files to FormData
                if (values.image) {
                    for (let i = 0; i < values.image.length; i++) {
                        formData.append("files", values.image[i])
                    }
                }

                // next, other info
                if (values.name) formData.append("name", values.name)
                if (values.brand) formData.append("brand", values.brand)
                if (values.category) formData.append("category", values.category)
                if (values.price) formData.append("price", values.price)
                if (values.stock) formData.append("stock", values.stock)
                if (values.discount) formData.append("discount", values.stock)

                setTimeout(async () => {
                    setSubmitting(true)
                    const response = await axiosInstance("post", "/product/createProduct", formData)
                    setSubmitting(false)
                    dispatch(setResponse(response))
                    dispatch(exportResponse())

                    if (response.data.err === 0) refreshPage()
                })
            }}
        >
            {(props) => (
                <Form method="post" encType="multipart/form-data">
                    <Box sx={{ flex: 4, paddingLeft: 4, paddingRight: 4 }}>
                        <AdminTitle>Sản phẩm mới</AdminTitle>
                        <Grid container spacing={2}>
                            <Grid item xs={4.5} position="relative">
                                <Stack position="absolute" right={30} top={33} zIndex={2}>
                                    <IconButton onClick={checkName}>
                                        <CheckIcon />
                                    </IconButton>
                                </Stack>

                                {Array.isArray(dummyProducts) &&
                                    dummyProducts.map((item, index) => (
                                        <FieldForm key={index}>
                                            <Field
                                                as={item.as}
                                                label={item.label}
                                                id={item.name}
                                                name={item.name}
                                                type={item.type}
                                            />
                                            <FormHelperText>
                                                <ErrorMessage name={item.name} />
                                            </FormHelperText>
                                        </FieldForm>
                                    ))}

                                <FieldForm>
                                    <Categories props={props} name="category" />
                                </FieldForm>

                                <FieldForm>
                                    <Brands name="brand" props={props} />
                                </FieldForm>

                                <FieldForm>
                                    <ButtonSubmit disabled={isSubmitting}>Tạo</ButtonSubmit>
                                </FieldForm>
                            </Grid>

                            <Grid item xs={7.5}>
                                <UploadImage props={props} name="image" />
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

const Categories = ({ props, name }) => {
    const categories = useSelector(selectorCategories)?.payload
    const dispatch = useDispatch()

    useEffect(() => {
        if (!categories) requestCategories(dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [value, setValue] = React.useState("")

    const handleChange = (event) => {
        addOrUpdateURLParams("category", event.target.name)
        setValue(event.target.value)
        props.setFieldValue(name, event.target.value)
        dispatch(refetchBrands())
    }

    return (
        <Fragment>
            <Box>
                <FormControl>
                    <FormLabel sx={{ marginBottom: 1 }}>Phân loại</FormLabel>
                    <Field
                        as={RadioGroup}
                        row
                        name={name}
                        value={value}
                        onChange={handleChange}
                        sx={{ "& .MuiRadio-root ": { display: "none" } }}
                    >
                        {categories &&
                            categories.map((item) => (
                                <FormControlLabel
                                    key={item.id}
                                    name={item.name}
                                    value={item.categoryId}
                                    control={<Radio />}
                                    label={
                                        <Chip
                                            label={item.name && formatCapitalization(item.name)}
                                            variant={value === item.categoryId ? "contained" : "outlined"}
                                            color={value === item.categoryId ? "primary" : "default"}
                                            sx={{ marginLeft: 1, marginBottom: 1 }}
                                        />
                                    }
                                />
                            ))}
                    </Field>
                </FormControl>

                <FormHelperText>
                    <ErrorMessage name={name} />
                </FormHelperText>
            </Box>
        </Fragment>
    )
}

const Brands = ({ props, name }) => {
    const category = new URLSearchParams(window.location.search).get("category")
    const dispatch = useDispatch()

    const fetch = useSelector(selectorBrands)
    const brands = category && fetch?.payload && fetch?.payload[`${category}`]

    useEffect(() => {
        if (!brands) requestBrands(dispatch, { category })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetch.refetch])

    const [value, setValue] = useState("")

    const handleChange = (event) => {
        setValue(event.target.value)
        props.setFieldValue(name, event.target.value)
    }

    return (
        <Fragment>
            {brands ? (
                <Box>
                    <FormControl>
                        <FormLabel sx={{ marginBottom: 1 }}>Chọn thương hiệu</FormLabel>
                        <Field
                            as={RadioGroup}
                            row
                            name={name}
                            value={value}
                            onChange={handleChange}
                            sx={{ "& .MuiRadio-root ": { display: "none" } }}
                        >
                            {brands.map((item) => {
                                return (
                                    <FormControlLabel
                                        key={item.id}
                                        name={item.name}
                                        value={item.brandId}
                                        control={<Radio />}
                                        label={
                                            <Chip
                                                label={formatCapitalization(item?.name)}
                                                variant={value === item.brandId ? "contained" : "outlined"}
                                                color={value === item.brandId ? "primary" : "default"}
                                                sx={{ marginLeft: 1, marginBottom: 1 }}
                                            />
                                        }
                                    />
                                )
                            })}
                        </Field>
                    </FormControl>

                    <FormHelperText>
                        <ErrorMessage name={name} />
                    </FormHelperText>
                </Box>
            ) : (
                <Fragment />
            )}
        </Fragment>
    )
}

const UploadImage = ({ props, name }) => {
    const [selected, setSelected] = useState([])
    const [files, setFiles] = useState(null)

    useEffect(() => {
        props.setFieldValue(name, files)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files])

    const handleChange = (e) => {
        setFiles(e.target.files)

        const images = e.target.files

        // `images` là 1 object array
        for (let i = 0; i < images.length; i++) {
            let file = images.item(i) // Lấy từng item trong images

            let fileReader = new FileReader()
            fileReader.readAsDataURL(file) // encode về base64

            fileReader.onload = (e) => {
                // Tạo 1 chuỗi duới dạng object lưu fileName, fileSize, fileType và code base64 của image
                let data = {
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.type,
                    base64: e.target.result,
                }
                selected.push(data)

                setSelected([...selected]) // set vào list
            }
        }
    }

    const Input = ({ children }) => {
        const handleClick = () => {
            document.querySelector(".file-input").click()
        }

        return (
            <Box
                sx={{
                    height: "167px",
                    display: "flex",
                    cursor: "pointer",
                    margin: "10px 0",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    borderRadius: "5px",
                    border: "2px dashed #6990F2",
                    color: "#6990F2",
                }}
                onClick={handleClick}
            >
                {children}
            </Box>
        )
    }

    const Preview = () => {
        const handleDeleteItem = (image) => {
            setSelected(() => selected.filter((item) => item !== image))
        }

        return (
            <ImageList sx={{ width: "100%", height: "auto" }} cols={3} rowHeight={164}>
                {Array.isArray(selected) &&
                    selected.map((item, index) => {
                        return (
                            <ImageListItem
                                key={index}
                                sx={{
                                    position: "relative",

                                    "&:hover": {
                                        ".delete": {
                                            color: "red",
                                            opacity: 10,
                                            cursor: "pointer",
                                            zIndex: "99",
                                        },

                                        ".image": {
                                            opacity: 0.5,
                                        },
                                    },
                                }}
                            >
                                <IconButton
                                    className="delete"
                                    sx={{
                                        position: "absolute",
                                        top: "5px",
                                        right: "5px",
                                        cursor: "pointer",
                                        opacity: 0,
                                    }}
                                    onClick={() => handleDeleteItem(item)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <img className="image" src={item?.base64} alt="" loading="lazy" />
                            </ImageListItem>
                        )
                    })}
            </ImageList>
        )
    }

    return (
        <Box position="relative">
            <Box
                sx={{
                    width: "500px",
                    background: "#fff",
                    borderRadius: "5px",
                }}
            >
                <Input>
                    <input
                        name="images"
                        class="file-input"
                        type="file"
                        accept="image/*"
                        hidden
                        multiple
                        onChange={handleChange}
                    />
                    <CloudUploadOutlinedIcon fontSize="large" />
                    <Typography>Chọn ảnh để tải lên</Typography>
                </Input>

                <Preview />
            </Box>

            <FormHelperText>
                <ErrorMessage name={name} />
            </FormHelperText>
        </Box>
    )
}

const initialValues = {
    name: "",
    image: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
}

const validationSchema = Yup.object({
    name: Yup.string().required("*Bắt buộc"),
    image: Yup.mixed().required("*Bắt buộc"),
    price: Yup.string().required("*Bắt buộc"),
    stock: Yup.string().required("*Bắt buộc"),
    category: Yup.string().required("*Bắt buộc"),
    brand: Yup.string().required("*Bắt buộc"),
})

const dummyProducts = [
    {
        as: TextField,
        label: "Tên sản phẩm",
        type: "text",
        name: "name",
    },
    {
        as: TextField,
        label: "Giá",
        type: "number",
        name: "price",
    },
    {
        as: TextField,
        label: "Số lượng nhập kho",
        type: "number",
        name: "stock",
    },
    {
        as: TextField,
        label: "Khuyến mãi giảm giá",
        type: "number",
        name: "discount",
    },
]
