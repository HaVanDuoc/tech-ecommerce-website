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
import {
    endFetchCardProduct,
    endProductByCategory,
    endSetProduct,
    setCardProduct,
    setCounterCartProduct,
    setLatestProduct,
    setProduct,
    setProductByCategory,
    startFetchCardProduct,
    startProductByCategory,
    startSetProduct,
    isPendingSearch as isPendingSearchProduct,
    setSearch as setSearchProduct,
    reFetchProduct,
    refetchCounterCartProduct,
} from "~/redux/productSlice"
import { isPendingUpdateBrand, resetBrand, setBrand, setBrands } from "~/redux/brandSlice"
import {
    isPending,
    isPendingCreateOrder,
    isPendingOrder,
    refetch,
    resetOrder,
    setCreateOrder,
    setOrder,
    setOrders,
    setTabs,
} from "~/redux/orderSlice"
import {
    isPendingGetUsers,
    isPendingSearch,
    isPendingUpdateInfoUser,
    setGender,
    setRoles,
    setSearch,
    setStatus,
    setUser,
    setUsers,
} from "~/redux/userSlice"
import { isPendingUpdateCategory, responseUpdateCategory, setCategories, setCategory } from "~/redux/categorySlice"
import { exportResponse, setResponse } from "~/redux/alertSlice"
import { setPendingSuggestToday, setSuggestToday } from "~/redux/pageHomeSlice"
import { setPendingUpdateAvatar } from "~/redux/pageProfileSlice"

const token = localStorage.getItem("access_token")

const axiosInstance = async (method, url, data) => {
    return await axios({
        baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
        timeout: 0,
        headers: {
            Authorization: token,
        },
        method,
        url,
        data,
    })
}

export default axiosInstance

// USER
export const requestUpdateAvatar = (dispatch, { userId, avatar }) => {
    dispatch(setPendingUpdateAvatar(true))
    setTimeout(async () => {
        const response = await axiosInstance("put", "/user/client/updateAvatar", { userId, avatar })
        dispatch(setResponse(response))
        dispatch(exportResponse())
        dispatch(setPendingUpdateAvatar(false))
    }, 2000)
}

export const requestUpdateInfoUser = (dispatch, { data }) => {
    setTimeout(async () => {
        dispatch(isPendingUpdateInfoUser())
        const response = await axiosInstance("put", `/user/client/updateUser/${data.userId}`, data)
        dispatch(setResponse(response))
        dispatch(exportResponse())
    }, 2000)
    dispatch(isPendingUpdateInfoUser())
}

export const requestSearchUser = async (dispatch, key, limit) => {
    dispatch(isPendingSearch())
    const response = await axiosInstance("post", "/user/search", { key, limit })
    dispatch(setSearch(response.data.data))
    dispatch(isPendingSearch())
}

export const requestGenderUser = async (dispatch) => {
    const response = await axiosInstance("get", "/user/getGender")
    dispatch(setGender(response.data.data))
}

export const requestRolesUser = async (dispatch) => {
    const response = await axiosInstance("get", "/user/getRoles")
    dispatch(setRoles(response.data.data))
}

export const requestStatusUser = async (dispatch) => {
    const response = await axiosInstance("get", "/user/getStatus")
    dispatch(setStatus(response.data.data))
}

export const requestUser = async (dispatch, { user_id, userId }) => {
    const response = await axiosInstance("post", `/user/getUser`, { user_id, userId })
    dispatch(setUser(response.data.data))
}

export const requestUsers = async (dispatch, page) => {
    const response = await axiosInstance("post", "/user/getUsers", { page })
    dispatch(isPendingGetUsers())
    dispatch(setUsers({ data: response.data.data }))
    dispatch(isPendingGetUsers())
}

// ORDER
export const requestOrder = (dispatch, { codeOrder }) => {
    dispatch(resetOrder())
    dispatch(isPendingOrder())
    setTimeout(async () => {
        const response = await axiosInstance("post", "/order/getOrderDetails", { codeOrder })
        dispatch(setOrder(response.data.data))
        dispatch(isPendingOrder())
    }, 1000)
}

export const requestCreateOrder = (dispatch, { user_id, orders, status_id }) => {
    dispatch(isPendingCreateOrder())
    setTimeout(async () => {
        const response = await axiosInstance("post", "/order/createOrder", { user_id, orders, status_id })
        dispatch(setCreateOrder(response))
        dispatch(isPendingCreateOrder())
    }, 1000)
}

export const requestCreateOrderAdmin = (dispatch, { user_id, orders, status_id }) => {
    dispatch(isPendingCreateOrder())
    setTimeout(async () => {
        const response = await axiosInstance("post", "/order/admin/createOrder", { user_id, orders, status_id })
        dispatch(setCreateOrder(response))
        dispatch(isPendingCreateOrder())
    }, 2000)
}

export const requestOrders = async (dispatch, type, page, user_id) => {
    try {
        dispatch(isPending())
        const response = await axiosInstance("post", "/order/getOrders", { type, page, user_id })
        dispatch(setOrders({ type, page, payload: response.data.data }))
        dispatch(isPending())
    } catch (error) {
        console.log(error)
    }
}

export const requestTabs = async (dispatch) => {
    try {
        const response = await axiosInstance("get", "/order/getTabs")

        dispatch(setTabs(response.data.data))
    } catch (error) {
        return error
    }
}

export const requestDestroyOrder = async (dispatch, order_details_id) => {
    try {
        const response = await axiosInstance("post", "/order/destroyOrder", { order_details_id })
        dispatch(refetch())
        dispatch(setResponse(response))
        dispatch(exportResponse())
    } catch (error) {
        return error
    }
}

// PRODUCT
export const requestSuggestToday = (dispatch, { limit }) => {
    dispatch(setPendingSuggestToday(true))
    setTimeout(async () => {
        const response = await axiosInstance("post", "/product/getProducts", { limit })
        dispatch(setSuggestToday(response.data.data))
        dispatch(setPendingSuggestToday(false))
    })
}

export const requestSearchProduct = async (dispatch, key, limit) => {
    dispatch(isPendingSearchProduct())
    const response = await axiosInstance("post", "/product/search", { key, limit })
    dispatch(setSearchProduct(response.data.data))
    dispatch(isPendingSearchProduct())
}

export const requestCheckNewNameProduct = async (key) => {
    return await axiosInstance("post", "/product/checkNameProduct", { key })
}

export const requestUpdateViewProduct = async (product_id) => {
    await axiosInstance("put", "/product/updateView", { product_id })
}

export const requestLatestProducts = async (dispatch, config) => {
    try {
        const response = await axiosInstance("post", "/product/getProducts", config)
        dispatch(setLatestProduct(response.data.data))
    } catch (error) {
        console.log(error)
    }
}

export const requestGetProducts = async (dispatch, config) => {
    try {
        dispatch(startProductByCategory())

        const response = await axiosInstance("post", "/product/getProducts", config)

        const payload = {
            category: config.category,
            page: config.page,
            products: response.data.data,
        }

        dispatch(setProductByCategory(payload))

        dispatch(endProductByCategory())
    } catch (error) {
        console.log(error)
    }
}

export const requestGetProduct = async (dispatch, config) => {
    try {
        dispatch(startSetProduct())

        const response = await axiosInstance("post", "/product/getProduct", config)

        dispatch(setProduct(response.data.data))

        dispatch(endSetProduct())
    } catch (error) {
        console.log(error)
    }
}

// AUTH
export const requestGetCurrentUser = async (dispatch) => {
    try {
        const response = await axiosInstance("get", "/auth/getCurrentUser")

        if (response?.data?.err === 0) {
            dispatch(currentUser(response.data.data))
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
    }, 1000)
}

export const requestRegister = (dispatch, values) => {
    dispatch(startRegister())

    const { firstName, middleName, lastName, email, password } = values

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
export const requestAddCart = async (dispatch, { product_id }) => {
    const response = await axiosInstance("post", "/product/addCart", { product_id })
    if (response.data.err === 0) {
        dispatch(setResponse(response))
        dispatch(exportResponse())
    }
    dispatch(reFetchProduct())
    dispatch(refetchCounterCartProduct())
}

export const requestCounterCart = async (dispatch) => {
    const response = await axiosInstance("get", "/cart/counter")
    dispatch(setCounterCartProduct(response.data.data))
}

export const requestCartProduct = async (dispatch) => {
    dispatch(startFetchCardProduct())
    const response = await axiosInstance("post", "/cart/getCartProduct")
    dispatch(setCardProduct(response.data.data))
    dispatch(endFetchCardProduct())
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
export const requestUpdateCategory = (dispatch, formData) => {
    dispatch(isPendingUpdateCategory())
    setTimeout(async () => {
        const response = await axiosInstance("put", "/category/updateCategory", formData)
        dispatch(responseUpdateCategory(response))
        dispatch(isPendingUpdateCategory())
    }, 1500)
}

export const requestCategory = async (dispatch, { category_id, categoryId }) => {
    const response = await axiosInstance("post", "/category/getCategory", { category_id, categoryId })
    dispatch(setCategory(response.data.data))
}

export const requestCategories = async (dispatch) => {
    const response = await axiosInstance("get", "/category/getCategories")
    dispatch(setCategories(response.data.data))
}

// BRAND
export const requestBrands = async (dispatch, { category, alias }) => {
    const response = await axiosInstance("post", "/brand/getBrands", { category, alias })
    dispatch(
        setBrands({
            type: category || alias || null,
            payload: response.data.data,
        })
    )
}

export const requestBrand = async (dispatch, { brand_id, brandId }) => {
    dispatch(resetBrand())
    const response = await axiosInstance("post", "/brand/getBrand", { brand_id, brandId })
    dispatch(setBrand(response.data.data))
}

export const requestUpdateBrand = (dispatch, formData) => {
    dispatch(isPendingUpdateBrand())
    setTimeout(async () => {
        const response = await axiosInstance("put", "/brand/updateBrand", formData)
        dispatch(isPendingUpdateBrand())
        dispatch(setResponse(response))
        dispatch(exportResponse())
    })
}
