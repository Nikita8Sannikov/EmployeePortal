import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User, UserState } from "../../types"

export const fetchUsers = createAsyncThunk<UserState, number>(
    "users/fetchUsers",
    async (page) => {
        const response = await fetch(`/api/users/userlist?page=${page}`)
        const data = await response.json()
        return data

    }
)

export const fetchUserById = createAsyncThunk<User, string>(
    "users/fetchUserById",
    async (id) => {
        const response = await fetch(`/api/users/${id}`)
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }
        const data = await response.json()
        return data
    }
)

// export const fetchUsers = createAsyncThunk<UserState, number>(
//     "users/fetchUsers",
//     async (page) => {
//         const response = await fetch(`https://reqres.in/api/users?page=${page}`)
//         const data = await response.json()
//         return data

//     }
// )

// export const fetchUserById = createAsyncThunk<User, number>(
//     "users/fetchUserById",
//     async (id) => {
//         const response = await fetch(`https://reqres.in/api/users/${id}`)
//         const data = await response.json()
//         return data.data
//     }
// )

const initialStateUsers: UserState = {
    data: [],
    status: "idle",
    error: null,
    page: 1,
    total_pages: 1,
    user: null
}


const usersSlice = createSlice({
    name: "users",
    initialState: initialStateUsers,
    reducers: {
        increment: (state) => {
            if (state.page < state.total_pages)
                state.page += 1
        },

        decrement: (state) => {
            if (state.page > 1)
                state.page -= 1
        },

        updateUsers: (state, action: PayloadAction<User[]>) => {
            state.data = action.payload
        },

    },
    extraReducers: (builder) => {

        builder.addCase(fetchUsers.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserState>) => {
            const { data, total_pages } = action.payload

            if (state.page === 1) {
                state.data = data
            } else {
                const uniqueData = data.filter(user => !state.data.some(existingUser => existingUser._id === user._id)); // Фильтруем дубликаты
                state.data = [...state.data, ...uniqueData]; // Добавляем только уникальных пользователей
            }
            state.total_pages = total_pages
            // state.data = action.payload //из монго
            state.status = "fulfilled"
        })

        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message || "Error"

        })

        builder.addCase(fetchUserById.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
            state.status = "fulfilled"
            state.user = action.payload
        })

        builder.addCase(fetchUserById.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message || "Error"
        })

    }

})

export const { increment, decrement, updateUsers } = usersSlice.actions

export default usersSlice.reducer