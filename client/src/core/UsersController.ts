import { AppDispatch } from '../store';
import { setLoading, setTotalPage } from '../store/reducers/users/usersSlice';
import { IUser } from './../types/types';
// import AuthController from './AuthController';
import Admin from './users/Admin';
import User from './users/User';

export default class UsersController {
    private _users: Map<string, User | Admin> = new Map()
    private _authUserId: string = ''
    constructor(
        // private readonly _authController: AuthController,
        // private readonly _isAuth: boolean,
        // private readonly _authUser: IUser,
        private readonly _dispatch: AppDispatch) {
        // this.fetchUsers(1)
        // this._authUser = _authController.authUser;
        // console.log('_authUser', this._authUser);

    }

    get users() {
        // console.log('this._users.values()', this._users.values());
        // console.log('Array.from(this._users.values()', Array.from(this._users.values()));

        // console.log('_authUser', this._authUser);

        return Array.from(this._users.values()).filter((user) => user.id !== this._authUserId)
    }

    setAuthUser(user: IUser) {
        this._authUserId = user._id;
        // console.log('SET AUTH USER -> this._authUserId', this._authUserId);

        this._users.set(user._id, (user.isAdmin ? new Admin(user) : new User(user)))
        // console.log(this._users);

    }

    setUser(user: IUser) {
        // this._authUserId = user._id;
        // console.log('SET AUTH USER -> this._authUserId', this._authUserId);

        this._users.set(user._id, (user.isAdmin ? new Admin(user) : new User(user)))
        // console.log(this._users);

    }


    //возвращает мой объект пользователя(любого)
    getUser(userId = this._authUserId) {
        // console.log('getUser -> this._authUserId', this._authUserId);
        // console.log('getUser -> userId', userId);
        // console.log('ВСЕ ЮЗЕРЫ', this._users);

        if (this._users.has(userId)) {
            return this._users.get(userId)!
        }
        console.warn('User does not exist in UsersController');
        return null;
        // throw new Error('User not exist')

    }

    // get authUser() {
    //     console.log('this._authUserId from get authUser', this._authUserId);

    //     return this._authUserId
    // }

    // async fetchUserById(id: string) {
    //     try {
    //         const response = await fetch(`/api/users/${id}`);
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch user");
    //         }
    //         const user = await response.json();
    //         return user
    //         // if (user) {
    //         //     this._authUser = user;
    //         // }
    //     } catch (e) {
    //         console.error('Ошибка при загрузке пользователя:', e);
    //     }
    // }

    async fetchUsers(page: number) {
        try {
            this._dispatch(setLoading(true))
            const response = await fetch(`/api/users/userlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ page, authUserId: this._authUserId }),
            })
            const result = await response.json()
            // console.log('РЕЗУЛЬТАТ ПОЛУЧЕНИЯ ПОЛЬЗОВАТЕЛЕЙ', result);
            // if (page === 1) {
            //     this._users.clear()
            // }

            if (result.data.length) {
                result.data.forEach((user: IUser) => {
                    if (this._users.has(user._id)) {
                        this._users.delete(user._id)
                    }
                    this._users.set(user._id, (user.isAdmin ? new Admin(user) : new User(user)))
                    // console.log('ДОБАВИЛИ ЮЗЕРА', this._users);
                })


            } else {
                this._users.clear()
            }
            this._dispatch(setTotalPage(result.total_pages))
            this._dispatch(setLoading(false))
        } catch (e) {
            if (e instanceof Error)
                console.log(e.message)
        }

    }


}