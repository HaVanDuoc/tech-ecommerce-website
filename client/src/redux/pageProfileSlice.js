import { createSlice } from "@reduxjs/toolkit"

export const pageProfileSlice = createSlice({
    name: "pageProfile",
    initialState: {
        modalEditAvatar: {
            open: false,
        },

        updateAvatar: {
            isPending: false,
        },
    },
    reducers: {
        setOpenModalEditAvatar: (state, action) => {
            state.modalEditAvatar.open = action.payload
        },

        setPendingUpdateAvatar: (state, action) => {
            state.updateAvatar.isPending = action.payload
        },
    },
})

export const selectorOpenModalEditAvatar = (state) => state.profile.modalEditAvatar
export const selectorPendingUpdateAvatar = (state) => state.profile.updateAvatar

export const { setOpenModalEditAvatar, setPendingUpdateAvatar } = pageProfileSlice.actions

export default pageProfileSlice.reducer
