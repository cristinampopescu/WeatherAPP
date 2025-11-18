import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData:  null,
    isLogin: false,
}
const authSlice = createSlice({
    name: "userData",
    initialState: initialState,
    reducers: {
        saveUserData: (state, action) => {
            state.userData = action.payload.userData;
            state.isLogin = action.payload.isLogin;
        },
        logoutUserData: (state, action) => {
            state.userData = null;
            state.isLogin = false;
        }
    },
})

export const {saveUserData, logoutUserData} = authSlice.actions;
export default authSlice.reducer;