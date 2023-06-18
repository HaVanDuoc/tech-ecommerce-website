import {
    Box,
    FormHelperText,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useSnackbar } from "notistack"
import React, { Fragment, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import * as Yup from "yup"
import ButtonSubmit from "~/admin/components/ButtonSubmit"
import { FieldForm } from "~/admin/Styled"
import ListBrand from "./ListBrand"
import { requestCategory, requestUpdateCategory } from "~/api"
import { useDispatch, useSelector } from "react-redux"
import { resetUpdateCategory, selectorCategory, selectorUpdateCategory } from "~/redux/categorySlice"
import removeEmpty from "~/helper/removeEmpty"

const UpdateCategory = () => {
    const dispatch = useDispatch()
    const categoryId = useParams().categoryId
    const category = useSelector(selectorCategory)?.payload

    console.log("category", category)

    const name = category?.name
    const image = category?.image && category?.image[0].path
    const link = `/${category?.alias}`
    const view = category?.view || 0
    const alias = category?.alias

    useEffect(() => {
        if (!category) requestCategory(dispatch, { categoryId })
    }, [dispatch, category, categoryId])

    return (
        <Fragment>
            <Box>
                <Typography sx={style1}>Danh mục {name}</Typography>

                <Box sx={style2}>
                    <TableContainer component={Paper}>
                        <Table sx={style3} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ảnh minh họa</TableCell>
                                    <TableCell align="right">Danh mục</TableCell>
                                    <TableCell align="right">Tên truy cập</TableCell>
                                    <TableCell align="right">Lượt truy cập</TableCell>
                                    <TableCell align="right">Liên kết tới</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={style4}>
                                    <TableCell component="th" scope="row">
                                        <img src={image} alt="" width="100px" />
                                    </TableCell>
                                    <TableCell align="right">{name}</TableCell>
                                    <TableCell align="right">{alias}</TableCell>
                                    <TableCell align="right">{view}</TableCell>
                                    <TableCell align="right">
                                        <Link to={link || "Trống"}>
                                            {link ? process.env.REACT_APP_PUBLIC_FOLDER + link : "Trống"}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>

            <Box>
                <UpdateForm />
            </Box>
        </Fragment>
    )
}

export default UpdateCategory

const UpdateForm = () => {
    const [image, setImage] = useState(null)
    const [files, setFiles] = useState(null)
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const responseUpdate = useSelector(selectorUpdateCategory)
    const categoryId = useParams().categoryId

    const isPending = responseUpdate?.isPending
    const response = responseUpdate?.response

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

    useEffect(() => {
        if (response) {
            handleSnackBar(response)
            dispatch(resetUpdateCategory())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])

    const initialValues = {
        name: "",
        alias: "",
        image: "",
    }

    const validationSchema = Yup.object({
        name: Yup.string(),
        alias: Yup.string(),
        image: Yup.mixed(),
    })

    const categories = [
        {
            as: TextField,
            label: "Tên danh mục",
            type: "text",
            name: "name",
        },
        {
            as: TextField,
            label: "Tên truy cập",
            type: "text",
            name: "alias",
        },
    ]

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, props) => {
                values = removeEmpty(values)

                const formData = new FormData()

                if (files) {
                    for (let i = 0; i < files.length; i++) {
                        formData.append("files", files[i])
                    }
                }

                formData.append("categoryId", categoryId)
                if (values.name) formData.append("name", values.name)
                if (values.alias) formData.append("alias", values.alias)

                requestUpdateCategory(dispatch, formData)
            }}
        >
            {(props) => (
                <Form method="post" encType="multipart/form-data">
                    <Box sx={{ flex: 4, paddingLeft: 4, paddingRight: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                {Array.isArray(categories) &&
                                    categories.map((item, index) => (
                                        <FieldForm key={index}>
                                            <Field as={item.as} label={item.label} name={item.name} type={item.type} />
                                            <FormHelperText>
                                                <ErrorMessage name={item.name} />
                                            </FormHelperText>
                                        </FieldForm>
                                    ))}

                                <FieldForm>
                                    <TextField
                                        name="image"
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={(e) => {
                                            setFiles(e.target.files)
                                            let reader = new FileReader()
                                            let file = e.target.files[0]
                                            reader.readAsDataURL(file)

                                            if (file) {
                                                reader.onload = (e) => {
                                                    setImage({
                                                        file: e.target.result,
                                                        imagePreviewUrl: e.target.result,
                                                    })
                                                    // props.setFieldValue("image", e.target.result) // return file name
                                                }
                                            }
                                        }}
                                    />
                                    {image && <img src={image.imagePreviewUrl} alt="" />}
                                    <FormHelperText>
                                        <ErrorMessage name="image" />
                                    </FormHelperText>
                                </FieldForm>

                                <FieldForm>
                                    <ButtonSubmit disabled={isPending}>Update</ButtonSubmit>
                                </FieldForm>
                            </Grid>
                            <Grid item xs={7}>
                                <ListBrand props={props} />
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

const style1 = {
    fontSize: 22,
    fontWeight: 500,
    textTransform: "uppercase",
    paddingLeft: "40px",
}

const style2 = {
    padding: "30px 40px 40px 40px",
}

const style3 = {
    minWidth: 650,
}

const style4 = { "&:last-child td, &:last-child th": { border: 0 } }
