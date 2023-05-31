import axios from "axios"

const token = localStorage.getItem("access_token")

export const axiosInstance = async (method, url, data) => {
    return await axios({
        baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
        timeout: 10000,
        headers: {
            Authorization: token,
        },
        method,
        url,
        data,
    })
}

// path: client\src\App.js
export const getCurrentUser = () => {
    return axiosInstance("get", "/client/auth")
}

// path: client\src\components\Search\index.jsx
export const RecentAPI = (data) => {
    return axiosInstance("post", "client/search/recent", data)
}

// path: client\src\admin\pages\display\brand\index.jsx
export const getListBrand = () => {
    return axiosInstance("get", "/admin/display/brand")
}

// path: client\src\admin\pages\display\brand\index.jsx
export const deleteBrand = (brandId) => {
    return axiosInstance("delete", `/admin/product/${brandId}`)
}
