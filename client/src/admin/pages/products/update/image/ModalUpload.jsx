import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined"
import DeleteIcon from "@mui/icons-material/Delete"
import React, { Fragment, useEffect, useState } from "react"
import {
    Box,
    Button,
    Dialog,
    Divider,
    IconButton,
    ImageList,
    ImageListItem,
    Slide,
    styled,
    Typography,
} from "@mui/material"
import { useParams } from "react-router-dom"
import CircularProgressCustomize from "~/components/progress/CircularProgressCustomize"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"
import { reFetchProduct, selectorProduct } from "~/redux/productSlice"
import axiosInstance from "~/api"

const ModalUpload = ({ reset, setReset }) => {
    const [open, setOpen] = React.useState(false)
    const [isPending, setPending] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()

    const productId = useParams().productId
    const fetch = useSelector(selectorProduct)?.data?.images
    const [current, setImages] = useState([]) // current images
    const [deleted, setDeleted] = useState([]) // images are deleted
    const [added, setAdded] = useState([]) // images are added new
    const [preview, setPreview] = useState([]) // images are preview

    useEffect(() => {
        setImages(fetch)
    }, [fetch])

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

    const handleClick = () => {
        setOpen(true) // Open form
    }

    const handleChange = (e) => {
        const files = e.target.files

        setAdded(files)

        const addPreview = () => {
            for (let i = 0; i < files.length; i++) preview.push({ url: URL.createObjectURL(files[i]), files: files[i] })
            setPreview(preview)
        }

        addPreview()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("productId", productId)
        if (deleted && deleted !== []) formData.append("deleted", JSON.stringify(deleted))

        if (added && added !== []) {
            for (let i = 0; i < added.length; i++) {
                formData.append("image", added[i])
            }
        }

        setPending(true)

        const response = await axiosInstance("put", "/product/updateImage", formData)

        setPending(false)

        handleSnackBar(response)

        if (response.data.err === 0) {
            setPreview([])
            handleClose()
            dispatch(reFetchProduct())
        }
    }

    // handleDelete
    const handleDelete = (image) => {
        setImages(() => current.filter((item) => item !== image))
        setDeleted([...deleted, image])
    }

    // handleDeletePreview
    const handleDeletePreview = (objectUrl) => {
        setPreview(() => preview.filter((item) => item !== objectUrl)) // delete image in preview
        URL.revokeObjectURL(objectUrl.url) // delete image in memory
        setAdded(() => added.filter((item) => item !== objectUrl.files)) // delete file in Added
    }

    return (
        <Fragment>
            <Styled>
                <Box onClick={handleClick} sx={stylesButtonOpenFormUpload}>
                    <FileUploadOutlinedIcon />
                    <Typography sx={{ marginLeft: 1 }}>Tải hình ảnh</Typography>
                </Box>

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <Wrapper>
                        <Header>Cập nhật hình ảnh</Header>

                        <Input>
                            <input
                                name="images"
                                className="file-input"
                                type="file"
                                accept="image/*"
                                hidden
                                multiple
                                onChange={handleChange}
                            />
                            <CloudUploadOutlinedIcon fontSize="large" />
                            <Typography>Chọn ảnh để tải lên</Typography>
                        </Input>

                        {preview.length > 0 && (
                            <NewImages>
                                <Typography>Ảnh mới</Typography>
                                <ImageList sx={{ width: "100%", height: "auto" }} cols={3} rowHeight={164}>
                                    {preview.map((item, index) => {
                                        return (
                                            <ImageListItem key={index} sx={style1}>
                                                <IconButton className="delete" sx={style2}>
                                                    <DeleteIcon onClick={() => handleDeletePreview(item)} />
                                                </IconButton>
                                                <img className="image" src={item.url} alt="" loading="lazy" />
                                            </ImageListItem>
                                        )
                                    })}
                                </ImageList>
                                <Divider />
                            </NewImages>
                        )}

                        <CurrentImages>
                            <ImageList sx={{ width: "100%", height: "auto" }} cols={3} rowHeight={164}>
                                {current &&
                                    current.map((item, index) => {
                                        return (
                                            <ImageListItem key={index} sx={style1}>
                                                <IconButton className="delete" sx={style2}>
                                                    <DeleteIcon onClick={() => handleDelete(item)} />
                                                </IconButton>
                                                <img className="image" src={item.path} alt="" loading="lazy" />
                                            </ImageListItem>
                                        )
                                    })}
                            </ImageList>
                        </CurrentImages>

                        <ButtonUpdate onClick={handleSubmit}>
                            {isPending ? <CircularProgressCustomize /> : "Cập nhật"}
                        </ButtonUpdate>
                    </Wrapper>
                </Dialog>
            </Styled>
        </Fragment>
    )
}

export default ModalUpload

const style2 = {
    position: "absolute",
    top: "5px",
    right: "5px",
    cursor: "pointer",
    opacity: 0,
}

const style1 = {
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
}

const NewImages = ({ children }) => {
    return children
}

const CurrentImages = ({ children }) => {
    return children
}

const ButtonUpdate = ({ children, ...props }) => {
    return (
        <Button {...props} fullWidth variant="contained" size="large" sx={{ margin: "20px 0" }}>
            {children}
        </Button>
    )
}

const Styled = styled(Box)(() => ({
    overflow: "hidden",
}))

const stylesButtonOpenFormUpload = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "50px",
    backgroundColor: "#6990F2",
    color: "#fff",
    cursor: "pointer",
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />
})

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
                margin: "30px 0",
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

const Wrapper = ({ children }) => {
    return (
        <Box
            sx={{
                width: "500px",
                background: "#fff",
                borderRadius: "5px",
                padding: "30px",
                boxShadow: "7px 7px 12px rgba(0,0,0,0.05)",
            }}
        >
            {children}
        </Box>
    )
}

const Header = ({ children }) => {
    return (
        <Box
            sx={{
                color: "#6990F2",
                fontSize: "27px",
                fontWeight: "600",
                textAlign: "center",
            }}
        >
            {children}
        </Box>
    )
}
