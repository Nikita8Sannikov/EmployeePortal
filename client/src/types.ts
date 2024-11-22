export type UserId = string;
export interface User {
    _id: UserId
    email: string
    first_name: string
    last_name: string
    avatar: string
}

export type UserState = {
    data: User[]
    status: "idle" | "loading" | "fulfilled" | "failed"
    error: string | null
    page: number
    total_pages: number
    user: User | null
}