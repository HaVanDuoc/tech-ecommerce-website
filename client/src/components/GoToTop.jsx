import { Stack } from "@mui/material"
import React, { Fragment, useState } from "react"
import { PF } from "~/utils/__variables"

const GoToTop = () => {
    const [open, setOpen] = useState(false)

    window.onscroll = () => {
        let getScroll = window.scrollY

        if (getScroll > 1700) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <Fragment>
            {open && (
                <Stack
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        position: "fixed",
                        right: 50,
                        bottom: 50,
                        zIndex: 99,
                        cursor: "pointer",

                        "& img": {
                            width: 70,
                        },
                    }}
                    onClick={handleClick}
                >
                    <img src={PF + "/assets/gototop.png"} alt="go-to-top" />
                </Stack>
            )}
        </Fragment>
    )
}

export default GoToTop
