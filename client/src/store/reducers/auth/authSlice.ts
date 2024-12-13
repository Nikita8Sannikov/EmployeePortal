import {
    // createAsyncThunk,
    createSlice,
    //   PayloadAction 
} from '@reduxjs/toolkit';

// import { IUser } from '../../../types/types';


// interface User {
//     _id: string,
//     email: string,
//     name: string,
//     first_name?: string,
//     last_name?: string,
//     token?: string
//     avatar: string
//     isAdmin: boolean
//     description: string
//     role: string
// }
interface LoginState {
    // user: IUser | null,
    // token: string | null,
    error: string | null,
    isAuth: boolean, //переимнновать в изАус
    status: "idle" | "loading" | "succeeded" | "failed"
}
const initialState: LoginState = {
    // user: null,
    // token: null,
    error: null,
    isAuth: false,
    status: "idle",
}

// export const signIn = createAsyncThunk<IUser, {
//     email: string; password: string,
//     //  onSuccess?: () => void
// }>(
//     "auth/signIn",
//     async (data: {
//         email: string; password: string,
//         //  onSuccess?: () => void
//     }) => {
//         const response = await fetch("/api/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data)
//         })
//         if (!response.ok) {
//             throw new Error(`Ошибка: ${response.status}`);
//         }
//         const json = await response.json()

//         // if (data.onSuccess) data.onSuccess();
//         console.log(json);


//         return json
//     }
// )

// export const signOut = createAsyncThunk<IUser, void>(
//     "auth/signOut",
//     async () => {
//         const response = await fetch("/api/auth/logout", {
//             method: "POST",
//             // headers: {
//             //     "Content-Type": "application/json",
//             // },
//             //body возможно понадобится в будущем
//         })
//         if (!response.ok) {
//             throw new Error(`Ошибка: ${response.status}`);
//         }
//         const json = await response.json()
//         console.log(json);
//         return json
//     }
// )

// export const register = createAsyncThunk<IUser, { email: string; password: string, name: string }>(
//     "auth/register",
//     async (data: { email: string; password: string, name: string }) => {
//         const response = await fetch("/api/auth/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data)

//         })
//         if (!response.ok) {
//             throw new Error(`Ошибка: ${response.status}`);
//         }
//         const json = await response.json()
//         console.log(json);
//         return json
//     }
// )

// export const remind = createAsyncThunk<IUser, void>(
//     "auth/remind",
//     async () => {
//         // const token = localStorage.getItem("token")
//         // if (!token) {
//         //     throw new Error("No token found");
//         // }


//         const response = await fetch("/api/auth/me", {
//             method: "GET",
//             // headers: {
//             //     // "Content-Type": "application/json",
//             //     Authorization: `Bearer ${token}`,
//             // },

//         })
//         if (!response.ok) {
//             throw new Error(`Ошибка: ${response.status}`);
//         }
//         const json = await response.json()
//         // console.log(json);
//         return json
//     }
// )

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state) {
            state.isAuth = true;

        },
        clearAuth(state) {
            state.isAuth = false;

        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(signIn.pending, (state) => {
    //             state.status = "loading"
    //             state.error = null
    //         })
    //         .addCase(signIn.fulfilled, (state, action: PayloadAction<IUser>) => {
    //             // state.user = action.payload
    //             state.status = "succeeded"
    //             state.isAuth = true
    //             // state.token = action.payload.token || ''
    //             // localStorage.setItem("token", action.payload.token || '')
    //         })
    //         .addCase(signIn.rejected, (state, action) => {
    //             state.status = 'failed'
    //             state.error = action.error.message || "failed"
    //         })
    //         .addCase(signOut.fulfilled, (state) => {
    //             // state.user = null
    //             state.isAuth = false
    //             state.error = null
    //             // state.token = null
    //             // localStorage.removeItem("token")
    //         })
    //         .addCase(signOut.rejected, (state, action) => {
    //             state.status = 'failed'
    //             state.error = action.error.message || "failed"
    //         })
    //         .addCase(register.fulfilled, (state, action: PayloadAction<IUser>) => {
    //             // state.user = action.payload
    //             state.status = "succeeded"
    //             state.isAuth = false

    //         })
    //         .addCase(register.rejected, (state, action) => {
    //             state.status = 'failed'
    //             state.error = action.error.message || "failed"
    //         })
    //         .addCase(remind.pending, (state) => {
    //             state.status = "loading"
    //             state.error = null
    //         })
    //         .addCase(remind.fulfilled, (state, action: PayloadAction<IUser>) => {
    //             // state.user = action.payload
    //             state.status = "succeeded"
    //             state.isAuth = true
    //         })
    //         .addCase(remind.rejected, (state, action) => {
    //             state.status = 'failed'
    //             state.isAuth = false
    //             // localStorage.removeItem('token')
    //             state.error = action.error.message || "failed"
    //         })
    // }
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer