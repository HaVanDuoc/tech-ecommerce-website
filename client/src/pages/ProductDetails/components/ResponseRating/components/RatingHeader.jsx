import { useDispatch } from "react-redux"
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import { setOpenFormRating } from "~/redux/pageProductDetailSlice"
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material"

const RatingHeader = () => {
    const dispatch = useDispatch()

    const btn = [
        {
            icon: <TextsmsOutlinedIcon />,
            color: "purple",
            count: 1134,
            tooltip: "Đánh giá",
            handle: () => {
                dispatch(setOpenFormRating(true))
            },
        },
        {
            icon: <ThumbUpOutlinedIcon />,
            color: "dodgerblue",
            count: 345,
            tooltip: "Like",
        },
        {
            icon: <BookmarkBorderOutlinedIcon />,
            color: "#4fdf22",
            count: 342,
            tooltip: "Lưu",
        },
        {
            icon: <ShareOutlinedIcon />,
            color: "#085fb4",
            count: 89,
            tooltip: "Chia sẻ",
        },
    ]

    return (
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography sx={{ color: "var(--color-text)", fontSize: "27px" }}>Đánh giá sản phẩm</Typography>

            <Stack flexDirection="row" alignItems="center" justifyContent="center">
                {btn.map((item, index) => {
                    return (
                        <Box sx={{ mx: 3 }} key={index}>
                            <Tooltip title={item.tooltip} placement="top">
                                <Stack alignItems="center" justifyContent="center" onClick={item.handle}>
                                    <IconButton sx={{ color: item.color }}>{item.icon}</IconButton>
                                    <Typography>{item.count}</Typography>
                                </Stack>
                            </Tooltip>
                        </Box>
                    )
                })}
            </Stack>
        </Stack>
    )
}

export default RatingHeader
