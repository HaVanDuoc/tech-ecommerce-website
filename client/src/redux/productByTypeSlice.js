import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    dienthoai: {
        isFetch: false,
        category: null,
        countPage: null,
        currentPage: null,
        countProducts: null,
        products: {},
    },
    tablet: {
        isFetch: false,
        category: null,
        countPage: null,
        currentPage: null,
        countProducts: null,
        products: {},
    },
    laptop: {
        isFetch: false,
        category: null,
        countPage: null,
        currentPage: null,
        countProducts: null,
        products: {},
    },
    tainghe: {
        isFetch: false,
        category: null,
        countPage: null,
        currentPage: null,
        countProducts: null,
        products: {},
    },
    dongho: {
        isFetch: false,
        category: null,
        countPage: null,
        currentPage: null,
        countProducts: null,
        products: {},
    },
    pc: {
        isFetch: false,
        category: null,
        countPage: null,
        currentPage: null,
        countProducts: null,
        products: {},
    },
    sim: {
        isFetch: false,
        category: null,
        countPage: null,
        currentPage: null,
        countProducts: null,
        products: {},
    },
    maygiat: {
        isFetch: false,
        category: null,
        countPage: null,
        currentPage: null,
        countProducts: null,
        products: {},
    },
    tivi: {
        isFetch: false,
        category: null,
        countPage: null,
        currentPage: null,
        countProducts: null,
        products: {},
    },
    tulanh: {
        isFetch: false,
        category: null,
        countPage: null,
        currentPage: null,
        countProducts: null,
        products: {},
    },
    loa: {
        isFetch: false,
        category: null,
        countPage: null,
        currentPage: null,
        countProducts: null,
        products: {},
    },
    quatdieuhoa: {
        isFetch: false,
        category: null,
        countPage: null,
        currentPage: null,
        countProducts: null,
        products: {},
    },
}

export const productByTypeSlice = createSlice({
    name: "productByType",
    initialState: initialState,
    reducers: {
        getProductByType: (state, action) => {
            switch (action.payload.category) {
                case "Điện thoại":
                    state.dienthoai.isFetch = true
                    state.dienthoai.limit = action.payload.limit
                    state.dienthoai.category = action.payload.category
                    state.dienthoai.countPage = action.payload.countPage
                    state.dienthoai.currentPage = action.payload.currentPage
                    state.dienthoai.countProducts = action.payload.countProducts
                    state.dienthoai.products[`page-${action.payload.currentPage}`] = action.payload.products
                    return state

                case "Tablet":
                    state.tablet.isFetch = true
                    state.tablet.limit = action.payload.limit
                    state.tablet.category = action.payload.category
                    state.tablet.countPage = action.payload.countPage
                    state.tablet.currentPage = action.payload.currentPage
                    state.tablet.countProducts = action.payload.countProducts
                    state.tablet.products[`page-${action.payload.currentPage}`] = action.payload.products
                    return state

                case "Laptop":
                    state.laptop.isFetch = true
                    state.laptop.limit = action.payload.limit
                    state.laptop.category = action.payload.category
                    state.laptop.countPage = action.payload.countPage
                    state.laptop.currentPage = action.payload.currentPage
                    state.laptop.countProducts = action.payload.countProducts
                    state.laptop.products[`page-${action.payload.currentPage}`] = action.payload.products
                    return state

                case "Tai nghe":
                    state.tainghe.isFetch = true
                    state.tainghe.limit = action.payload.limit
                    state.tainghe.category = action.payload.category
                    state.tainghe.countPage = action.payload.countPage
                    state.tainghe.currentPage = action.payload.currentPage
                    state.tainghe.countProducts = action.payload.countProducts
                    state.tainghe.products[`page-${action.payload.currentPage}`] = action.payload.products
                    return state

                case "Đồng hồ":
                    state.dongho.isFetch = true
                    state.dongho.limit = action.payload.limit
                    state.dongho.category = action.payload.category
                    state.dongho.countPage = action.payload.countPage
                    state.dongho.currentPage = action.payload.currentPage
                    state.dongho.countProducts = action.payload.countProducts
                    state.dongho.products[`page-${action.payload.currentPage}`] = action.payload.products
                    return state

                case "Pc":
                    state.pc.isFetch = true
                    state.pc.limit = action.payload.limit
                    state.pc.category = action.payload.category
                    state.pc.countPage = action.payload.countPage
                    state.pc.currentPage = action.payload.currentPage
                    state.pc.countProducts = action.payload.countProducts
                    state.pc.products[`page-${action.payload.currentPage}`] = action.payload.products
                    return state

                case "Sim":
                    state.sim.isFetch = true
                    state.sim.limit = action.payload.limit
                    state.sim.category = action.payload.category
                    state.sim.countPage = action.payload.countPage
                    state.sim.currentPage = action.payload.currentPage
                    state.sim.countProducts = action.payload.countProducts
                    state.sim.products[`page-${action.payload.currentPage}`] = action.payload.products
                    return state

                case "Máy giặt":
                    state.maygiat.isFetch = true
                    state.maygiat.limit = action.payload.limit
                    state.maygiat.category = action.payload.category
                    state.maygiat.countPage = action.payload.countPage
                    state.maygiat.currentPage = action.payload.currentPage
                    state.maygiat.countProducts = action.payload.countProducts
                    state.maygiat.products[`page-${action.payload.currentPage}`] = action.payload.products
                    return state

                case "Tivi":
                    state.tivi.isFetch = true
                    state.tivi.limit = action.payload.limit
                    state.tivi.category = action.payload.category
                    state.tivi.countPage = action.payload.countPage
                    state.tivi.currentPage = action.payload.currentPage
                    state.tivi.countProducts = action.payload.countProducts
                    state.tivi.products[`page-${action.payload.currentPage}`] = action.payload.products
                    return state

                case "Tủ lạnh":
                    state.tulanh.isFetch = true
                    state.tulanh.limit = action.payload.limit
                    state.tulanh.category = action.payload.category
                    state.tulanh.countPage = action.payload.countPage
                    state.tulanh.currentPage = action.payload.currentPage
                    state.tulanh.countProducts = action.payload.countProducts
                    state.tulanh.products[`page-${action.payload.currentPage}`] = action.payload.products
                    return state

                case "Loa":
                    state.loa.isFetch = true
                    state.loa.limit = action.payload.limit
                    state.loa.category = action.payload.category
                    state.loa.countPage = action.payload.countPage
                    state.loa.currentPage = action.payload.currentPage
                    state.loa.countProducts = action.payload.countProducts
                    state.loa.products[`page-${action.payload.currentPage}`] = action.payload.products
                    return state

                case "Quạt điều hòa":
                    state.quatdieuhoa.isFetch = true
                    state.quatdieuhoa.limit = action.payload.limit
                    state.quatdieuhoa.category = action.payload.category
                    state.quatdieuhoa.countPage = action.payload.countPage
                    state.quatdieuhoa.currentPage = action.payload.currentPage
                    state.dienthoai.limit = action.payload.limit
                    state.quatdieuhoa.countProducts = action.payload.countProducts
                    state.quatdieuhoa.products[`page-${action.payload.currentPage}`] = action.payload.products
                    return state

                default:
                    return state
            }
        },
    },
})

export const { getProductByType } = productByTypeSlice.actions

export const selectorProductByType = (state) => state.productByType

export default productByTypeSlice.reducer
