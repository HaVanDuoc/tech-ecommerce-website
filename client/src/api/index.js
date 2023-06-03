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
import {
    endSearchHeaderRecent,
    endSearchHeaderSuggest,
    setSearchHeaderRecent,
    setSearchHeaderSuggest,
    startSearchHeaderRecent,
    startSearchHeaderSuggest,
} from "~/redux/searchSlice"
import { endFetchCardProduct, setCardProduct, setCategories, startFetchCardProduct } from "~/redux/productSlice"
import { setBrandByCategory } from "~/redux/brandSlice"

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

// AUTH
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

// SEARCH
export const requestSearchHeaderSuggest = async (dispatch, e) => {
    const data = {
        key: e.target.value,
        limit: 6,
    }

    dispatch(startSearchHeaderSuggest())
    const result = await axiosInstance("post", "/search/header/getSuggest", data)
    dispatch(setSearchHeaderSuggest(result.data.data))
    dispatch(endSearchHeaderSuggest())
}

export const requestSearchHeaderRecent = async (dispatch, user_id) => {
    const data = { user_id, limit: 6 }

    dispatch(startSearchHeaderRecent())
    const response = await axiosInstance("post", "/search/header/getRecent", data)
    dispatch(setSearchHeaderRecent(response.data.data))
    dispatch(endSearchHeaderRecent())
}

export const requestSearchHeaderSaveRecent = async (product_id, user_id) => {
    const data = { product_id, user_id }
    await axiosInstance("post", "/search/header/saveRecent", data)
}

// CART
export const requestCartProduct = async (dispatch, user_id) => {
    if (user_id) {
        dispatch(startFetchCardProduct())
        const response = await axiosInstance("post", "/cart/getCartProduct", { user_id })
        dispatch(setCardProduct(response.data.data))
        dispatch(endFetchCardProduct())
    }
}

export const requestIncreaseProductCart = async (product_id, cart_session_id) => {
    const data = { product_id, cart_session_id }
    await axiosInstance("post", "/cart/increase", data)
}

export const requestDecreaseProductCart = async (product_id, cart_session_id) => {
    const data = { product_id, cart_session_id }
    await axiosInstance("post", "/cart/decrease", data)
}

export const requestDeleteProductCart = async (product_id, cart_session_id) => {
    const data = { product_id, cart_session_id }
    await axiosInstance("delete", "/cart/delete", data)
}

// CATEGORY
export const requestGetCategories = async (dispatch) => {
    const response = await axiosInstance("get", "/category/getCategories")
    dispatch(setCategories(response.data.data))
}

// BRAND
export const requestGetBrandsByCategory = async (dispatch, link) => {
    let response = await axiosInstance("post", "/brand/getBrandsByCategory", { link })

    const config = {
        link: response.data.data[0].categoryLink,
        brands: response.data.data,
    }

    dispatch(setBrandByCategory(config))
}

// path: client\src\admin\pages\display\brand\index.jsx
export const getListBrand = () => {
    return axiosInstance("get", "/admin/display/brand")
}

// path: client\src\admin\pages\display\brand\index.jsx
export const deleteBrand = (brandId) => {
    return axiosInstance("delete", `/admin/product/${brandId}`)
}
