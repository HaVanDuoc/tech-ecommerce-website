import refreshPage from "~/utils/refreshPage"
import axios from "axios"
import {
    currentUser,
    endLogin,
    endRegister,
    loginFail,
    registerFail,
    startLogin,
    startRegister,
} from "~/redux/authSlice"

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

export const requestGetCurrentUser = async (dispatch) => {
    try {
        const response = await axiosInstance("get", "/auth/getCurrentUser")

        if (response?.data?.err === 0) {
            dispatch(currentUser(response.data))
        }
    } catch (error) {
        console.log(error)
    }
}

export const requestLogin = (dispatch, values) => {
    dispatch(startLogin())

    setTimeout(async () => {
        const response = await axiosInstance("post", "/auth/login", values)

        if (response.data.err === 1) {
            dispatch(loginFail(response.data.msg)) // Login fail
        } else {
            // login success, save token in LocalStorage
            localStorage.setItem("access_token", response.data.access_token)
            refreshPage()
        }

        dispatch(endLogin())
    }, 2000)
}

export const requestRegister = (dispatch, values) => {
    dispatch(startRegister())
    
    const { firstName, middleName, lastName, email, password } = values

    // return console.log('values', values)

    setTimeout(async () => {
        // get data from DB
        const response = await axiosInstance("post", "/auth/register", {
            firstName,
            middleName,
            lastName,
            email,
            password,
        })

        dispatch(endRegister())

        if (response.data.err !== 0) {
            dispatch(registerFail(response.data.msg))
        } else {
            localStorage.setItem("access_token", response.data.access_token)
            refreshPage()
        }
    }, 2000)
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
