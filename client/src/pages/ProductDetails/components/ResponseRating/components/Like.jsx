import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import { Box, Typography } from "@mui/material"
import { useState } from "react"

const Like = () => {
    const [isLike, setLike] = useState(false)
    const [count, setCount] = useState(34)

    const handleLike = () => {
        setLike(!isLike)
        isLike ? setCount(count - 1) : setCount(count + 1)
    }

    return (
        <Box className="likeRating" onClick={handleLike}>
            {isLike ? (
                <ThumbUpIcon className="icon" sx={{ color: "dodgerblue" }} />
            ) : (
                <ThumbUpAltOutlinedIcon className="icon" />
            )}

            <Typography className="timesLike">{count}</Typography>
        </Box>
    )
}

export default Like
