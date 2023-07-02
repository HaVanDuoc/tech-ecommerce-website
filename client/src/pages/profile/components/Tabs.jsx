import { Box, styled } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { requestTabs } from "~/api"
import { refetch, selectorOrders, selectorTabs } from "~/redux/orderSlice"
import addOrUpdateURLParams from "~/utils/addURLParams"

const Tabs = () => {
    const dispatch = useDispatch()
    const fetchTabs = useSelector(selectorTabs)
    const tabs = fetchTabs?.data
    const orders = useSelector(selectorOrders)
    const currentTab = new URLSearchParams(window.location.search).get("tab") || "Tất cả"
    const [positionLine, setPositionLine] = useState(0)

    const defineTab = () => {
        const tabs = document.querySelectorAll(".tab_child")

        tabs.forEach((tab, index) => {
            if (tab.innerHTML === currentTab) {
                setPositionLine(document.querySelector(".active").offsetLeft)
            }
        })
    }

    useEffect(() => {
        requestTabs(dispatch)
        defineTab()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders.refetch])

    const clickTab = (e, tab) => {
        addOrUpdateURLParams("tab", tab)
        addOrUpdateURLParams("page", 1)
        dispatch(refetch())
    }

    return (
        <Styles>
            <Box className="tabs_box">
                {tabs.length &&
                    tabs.map((item) => {
                        return (
                            <Box
                                className={`tab_child ${item.status === currentTab ? "active" : ""}`}
                                onClick={(e) => clickTab(e, item.status)}
                                key={item.id}
                                id={item.id}
                            >
                                {item.status}
                            </Box>
                        )
                    })}

                <Box
                    // className="line"
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: positionLine,
                        width: "171px",
                        height: "5px",
                        borderRadius: "5px",
                        backgroundColor: "dodgerblue",
                        transition: "all .3s ease-in-out",
                    }}
                ></Box>
            </Box>
        </Styles>
    )
}

export default Tabs

const Styles = styled(Box)(() => ({
    ".tabs_box": {
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 600,
        backgroundColor: "#fff",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.25)",

        ".tab_child": {
            flex: 1,
            fontSize: "16px",
            fontWeight: 500,
            color: "#666",
            background: "none",
            border: "none",
            padding: "18px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            "&.active": {
                fontWeight: 600,
                color: "dodgerblue",
            },
        },

        ".line": {
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "171px",
            height: "5px",
            borderRadius: "5px",
            backgroundColor: "dodgerblue",
            transition: "all .3s ease-in-out",
        },
    },
}))
