import React, { useEffect, useState } from "react"
import axiosInstance from "~/utils/axiosInstance"

// Fetch List Tables
export const FetchListTables = () => {
    const [list, setList] = React.useState({})

    useEffect(() => {
        const fetch = async () => {
            const response = await axiosInstance("/db")
            setList(response.data.data)
        }

        fetch()
    }, [])

    return list
}

// Fetch List Brand
export const FetchBrand = (categoryId) => {
    const [brand, setBrand] = useState([])

    React.useEffect(() => {
        const fetch = async () => {
            const response = await axiosInstance({
                method: "post",
                url: "/admin/product/newProduct/listSelectBrand",
                data: { categoryId },
            })

            setBrand(response.data.data)
        }

        fetch()
    }, [categoryId])

    return brand
}
