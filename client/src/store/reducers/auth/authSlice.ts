import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

interface LoginState {
    error: string | null,
    isAuth: boolean,
    status: "idle" | "loading" | "succeeded" | "failed"
}
const initialState: LoginState = {
    error: null,
    isAuth: false,
    status: "loading",
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state) {
            state.isAuth = true;
            state.status = "succeeded";
        },
        clearAuth(state) {
            state.isAuth = false;
            state.status = "idle";
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        }
    },
    
})


export const { setAuth, clearAuth, setError } = authSlice.actions

export default authSlice.reducer