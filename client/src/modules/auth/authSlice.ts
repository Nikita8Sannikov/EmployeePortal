import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    _id: string,
    email: string,
    name: string,
    first_name?: string,
    last_name?: string,
    password?: string,
    token?: string
}
interface LoginState {
    user: User | null,
    token: string | null,
    error: string | null,
    exists: boolean,
    status: "idle" | "loading" | "succeeded" | "failed"
}
const initialState: LoginState = {
    user: null,
    token: null,
    error: null,
    exists: false,
    status: "idle",
}

export const signIn = createAsyncThunk<User, {
    email: string; password: string,
    //  onSuccess?: () => void
}>(
    "auth/signIn",
    async (data: {
        email: string; password: string,
        //  onSuccess?: () => void
    }) => {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json()

        // if (data.onSuccess) data.onSuccess();

        return json
    }
)

export const signOut = createAsyncThunk<User, void>(
    "auth/signOut",
    async () => {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
            // headers: {
            //     "Content-Type": "application/json",
            // },
            //body возможно понадобится в будущем
        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json()
        console.log(json);
        return json
    }
)

export const register = createAsyncThunk<User, { email: string; password: string, name: string }>(
    "auth/register",
    async (data: { email: string; password: string, name: string }) => {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)

        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json()
        console.log(json);
        return json
    }
)

export const remind = createAsyncThunk<User, void>(
    "auth/remind",
    async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            throw new Error("No token found");
        }


        const response = await fetch("/api/auth/me", {
            method: "GET",
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json()
        console.log(json);
        return json
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                state.status = "succeeded"
                state.exists = true
                state.token = action.payload.token || ''
                localStorage.setItem("token", action.payload.token || '')
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || "failed"
            })
            .addCase(signOut.fulfilled, (state) => {
                state.user = null
                state.exists = false
                state.token = null
                state.error = null
                localStorage.removeItem("token")
            })
            .addCase(signOut.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || "failed"
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                state.status = "succeeded"
                state.exists = false

            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || "failed"
            })
            .addCase(remind.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(remind.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                state.status = "succeeded"
                state.exists = true
            })
            .addCase(remind.rejected, (state, action) => {
                state.status = 'failed'
                state.exists = false
                localStorage.removeItem('token')
                state.error = action.error.message || "failed"
            })
    }
})

// export const {  } = authSlice.actions
export default authSlice.reducer