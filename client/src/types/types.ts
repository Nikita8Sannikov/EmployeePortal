export type UserId = string;
export interface IUser {
    _id: UserId
    email: string
    name: string
    first_name: string
    last_name: string
    avatar: string
    isAdmin: boolean
    description: string
    role: string
    // token?: string
}

export type UserState = {
    data: IUser[]
    status: "idle" | "loading" | "fulfilled" | "failed"
    error: string | null
    page: number
    total_pages: number
    // user: IUser | null
    loading: boolean
}