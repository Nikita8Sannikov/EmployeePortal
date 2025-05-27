import { NavigateFunction } from 'react-router-dom';
import { AppDispatch } from '../store';
import { setLoading, setTotalPage } from '../store/reducers/users/usersSlice';
import { IUser } from './../types/types';
import { ApiClient } from './ApiClient';
import Admin from './users/Admin';
import User from './users/User';

export default class UsersController {
    private _users: Map<string, User | Admin> = new Map()
    private _authUserId: string = ''
    constructor(
        private readonly _dispatch: AppDispatch,
        private readonly _apiClient: ApiClient) {
    }

    get users() {
        return Array.from(this._users.values()).filter((user) => user.id !== this._authUserId)
    }

    setUser(user: IUser, setAuthUser: boolean = false) {
        if (setAuthUser) {
            this._authUserId = user._id;
        }
        this._users.set(user._id, (user.isAdmin ? new Admin(user) : new User(user)))
    }


    //возвращает мой объект пользователя(любого)
    getUser(userId = this._authUserId) {
        if (this._users.has(userId)) {
            return this._users.get(userId)!
        }
        console.warn('User does not exist in UsersController');
        return null;
    }

    async fetchUsers(page: number) {
        try {
            this._dispatch(setLoading(true))
            const result = await this._apiClient.post('/api/users/userlist', { page, authUserId: this._authUserId });
            if (page === 1) {
                const me = this._users.get(this._authUserId);
                this._users.clear();
                if (me) {
                    this._users.set(this._authUserId, me);
                }
            }

            if (result.data.length) {
                result.data.forEach((user: IUser) => {
                    if (this._users.has(user._id)) {
                        this._users.delete(user._id)
                    }
                    this._users.set(user._id, (user.isAdmin ? new Admin(user) : new User(user)))
                })
            }else {
                this._users.clear()
            }
            this._dispatch(setTotalPage(result.total_pages))
            this._dispatch(setLoading(false))
        } catch (e) {
            if (e instanceof Error)
                console.log(e.message)
        }

    }

    async updateUser(form: { [key: string]: string }, id: string, navigate: NavigateFunction) {
        const response = await this._apiClient.patch(`/api/users/${id}`, form);
        const data = await response.json();
        // return response
        if (response.ok) {
            this.setUser(data);
            navigate(`/profile/${id}`);
        } else {
            alert("Ошибка при сохранении данных");
        }
    }
}