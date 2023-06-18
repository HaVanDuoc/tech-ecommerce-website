import {
    Box,
    FormHelperText,
    Grid,
    Link,
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
import React, { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import * as Yup from "yup"
import ButtonSubmit from "~/admin/components/ButtonSubmit"
import { FieldForm } from "~/admin/Styled"
import { requestBrand, requestUpdateBrand } from "~/api"
import removeEmpty from "~/helper/removeEmpty"
import { selectorBrand, selectorUpdateBrand } from "~/redux/brandSlice"

const UpdateBrand = () => {
    const brandId = useParams().brandId
    const dispatch = useDispatch()

    const brand = useSelector(selectorBrand)

    const name = brand?.payload?.name
    const logo = brand?.payload?.image && brand?.payload?.image[0].path
    const link = brand?.payload?.link
    const view = brand?.payload?.view

    useEffect(() => {
        requestBrand(dispatch, { brandId })
    }, [brandId, brand.refetch, dispatch])

    return (
        <Fragment>
            <Box>
                <Typography sx={style1}>Thương hiệu {name}</Typography>

                <Box sx={style2}>
                    <TableContainer component={Paper}>
                        <Table sx={style3} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Logo</TableCell>
                                    <TableCell align="right">Thương hiệu</TableCell>
                                    <TableCell align="right">Liên kết tới</TableCell>
                                    <TableCell align="right">Lượt truy cập</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={style4}>
                                    <TableCell component="th" scope="row">
                                        <img src={logo} alt="" width="100px" />
                                    </TableCell>
                                    <TableCell align="right">{name}</TableCell>
                                    <TableCell align="right">
                                        <Link href={process.env.REACT_APP_PUBLIC_FOLDER + link || "Trống"}>
                                            {link ? process.env.REACT_APP_PUBLIC_FOLDER + link : "Trống"}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{view}</TableCell>
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

export default UpdateBrand

const UpdateForm = () => {
    const [image, setImage] = useState(null)
    const [files, setFiles] = useState(null)
    const dispatch = useDispatch()

    const updateBrand = useSelector(selectorUpdateBrand)

    const isPending = updateBrand?.isPending
    const brandId = useParams().brandId

    const initialValues = {
        name: "",
        link: "",
        logo: "",
    }

    const validationSchema = Yup.object({
        name: Yup.string(),
        link: Yup.string(),
        logo: Yup.mixed(),
    })

    const categories = [
        {
            as: TextField,
            label: "Tên thương hiệu",
            type: "text",
            name: "name",
        },
        {
            as: TextField,
            label: "Link truy cập tới",
            type: "text",
            name: "link",
        },
    ]

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, props) => {
                values = removeEmpty(values)

                let formData = new FormData()

                if (files) {
                    for (let i = 0; i < files.length; i++) {
                        formData.append("files", files[i])
                    }
                }

                formData.append("brandId", brandId)
                if (values.name) formData.append("name", values.name)
                if (values.alias) formData.append("alias", values.alias)

                requestUpdateBrand(dispatch, formData)
            }}
        >
            {(props) => (
                <Form method="post" encType="multipart/form-data">
                    <Box sx={style5}>
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
                                        name="logo"
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
                                                }
                                            }
                                        }}
                                    />
                                    {image && <img src={image.imagePreviewUrl} alt="" />}
                                    <FormHelperText>
                                        <ErrorMessage name="logo" />
                                    </FormHelperText>
                                </FieldForm>

                                <FieldForm>
                                    <ButtonSubmit disabled={isPending}>Update</ButtonSubmit>
                                </FieldForm>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

const style1 = {
    fontSize: "18px",
    fontWeight: 500,
    textTransform: "uppercase",
    paddingLeft: "40px",
}

const style2 = {
    padding: "30px 40px 40px 40px",
}

const style3 = { minWidth: 650 }

const style4 = { "&:last-child td, &:last-child th": { border: 0 } }

const style5 = { flex: 4, paddingLeft: 4, paddingRight: 4 }
