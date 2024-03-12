import { Rating, Stack, Typography } from "@mui/material"
import { useState } from "react"

const Statistic = () => {
    const [star, setStar] = useState(0)

    const dummy = [
        { id: 1, alias: "Tất cả", count: 1000 },
        { id: 2, alias: "5 sao", count: 1000 },
        { id: 3, alias: "4 sao", count: 1000 },
        { id: 4, alias: "3 sao", count: 1000 },
        { id: 5, alias: "2 sao", count: 1000 },
        { id: 6, alias: "1 sao", count: 1000 },
    ]

    const handleClick = () => {}

    return (
        <Stack
            flexDirection="row"
            sx={{
                backgroundColor: "#1e90ff0f",
                border: "1px solid dodgerblue",
                borderRadius: 1,
                padding: 1,
                my: 3,
            }}
        >
            <Stack justifyContent="center" alignItems="center" width={180} padding={5}>
                <Typography color="crimson" fontWeight={500} fontSize={28}>
                    4.9
                </Typography>
                <Rating value={4} readOnly />
            </Stack>

            <Stack
                sx={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {dummy.map((item) => {
                    return (
                        <Stack
                            onClick={handleClick}
                            sx={{
                                border: "1px solid #555",
                                borderRadius: 1,
                                padding: "5px 20px",
                                margin: 1,
                                cursor: "pointer",
                                backgroundColor: "#fff",
                                transition: "all .3s ease",

                                ":hover": {
                                    color: "crimson",

                                    "& p": {
                                        fontWeight: 500,
                                    },
                                },
                            }}
                        >
                            <Typography fontSize={14}>{`${item.alias} (${item.count})`}</Typography>
                        </Stack>
                    )
                })}
            </Stack>
        </Stack>
    )
}

export default Statistic
