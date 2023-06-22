import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            isPending: false,
            refetch: false,
            data: {},
        },
        user: {
            isPending: false,
            refetch: false,
            status: {},
            roles: {},
            gender: {},
            data: {},
        },
        search: {
            isPending: false,
            refetch: false,
            payload: {},
        },
        updateInfoUser: {
            isPending: false,
        },
    },
    reducers: {
        isPendingUpdateInfoUser: (state) => {
            state.updateInfoUser.isPending = !state.updateInfoUser.isPending
        },

        isPendingGetUsers: (state) => {
            state.users.isPending = !state.users.isPending
        },
        setUsers: (state, action) => {
            state.users.data["limit"] = action.payload.data.limit
            state.users.data["sumProducts"] = action.payload.data.sumProducts
            state.users.data["currentPage"] = action.payload.data.currentPage
            state.users.data["sumPages"] = action.payload.data.sumPages
            state.users.data[`page-${action.payload.data.currentPage}`] = action.payload.data.list
        },
        refetch: (state) => {
            state.users.refetch = !state.users.refetch
        },

        isPendingGetUser: (state) => {
            state.user.isPending = !state.user.isPending
        },
        setUser: (state, action) => {
            state.user.data = action.payload
        },
        refetchGetUser: (state) => {
            state.user.refetch = !state.user.refetch
        },

        setStatus: (state, action) => {
            state.user.status = action.payload
        },

        setRoles: (state, action) => {
            state.user.roles = action.payload
        },

        setGender: (state, action) => {
            state.user.gender = action.payload
        },

        setSearch: (state, action) => {
            state.search.payload = action.payload
        },
        isPendingSearch: (state) => {
            state.search.isPending = !state.search.isPending
        },
        resetSearch: (state) => {
            state.search = {
                isPending: false,
                refetch: false,
                payload: {},
            }
        },
    },
})

export const selectorUsers = (state) => state.user.users
export const selectorUser = (state) => state.user.user
export const selectorSearchUser = (state) => state.user.search
export const selectorGenders = (state) => state.user.user.gender
export const selectorUpdateInfoUser = (state) => state.user.updateInfoUser

export const {
    isPendingGetUsers,
    setUsers,
    refetch,
    isPendingGetUser,
    setUser,
    refetchGetUser,
    setStatus,
    setRoles,
    setGender,
    setSearch,
    isPendingSearch,
    resetSearch,
    isPendingUpdateInfoUser
} = userSlice.actions

export default userSlice.reducer
