import { AppDispatch } from "../store";
// import { signIn, signOut, remind, register } from "../store/reducers/auth/authSlice";
import { setAuth, clearAuth } from "../store/reducers/auth/authSlice";
// import { IUser } from "../types/types";
import UsersController from "./UsersController";

export default class AuthController {
    // private _authUser: IUser | null = null;
    // private _isAuth: boolean = false
    constructor(
        private readonly _usersController: UsersController,
        private readonly _dispatch: AppDispatch
    ) {
        // console.log('_usersController:', _usersController);
    }

    // get authUser() {
    //     return this._authUser
    // }

    // get isAuth() {
    //     console.log('isAuth', this._isAuth);

    //     return this._isAuth
    // }

    async signIn(email: string, password: string) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const user = await response.json();
            // console.log(user);

            // this._authUser = user;
            this._usersController.setAuthUser(user)
            // this._usersController.getUser()

            this._dispatch(setAuth(user));

            // this._dispatch(setAuth(user));
            // this._isAuth = true
            // console.log(this._authUser);
            // console.log(this._isAuth);



        } catch (e) {
            console.error(e);
        }
    }


    async signOut() {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const json = await response.json()
            console.log(json);
            // this._usersController.setAuthUser(null) ????
            // this._authUser = null;
            this._dispatch(clearAuth());
            return json
        } catch (e) {
            console.error(e);
        }
    }

    async register(data: { email: string; password: string; name: string }) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const user = await response.json();
            return user
        } catch (e) {
            console.error(e);
        }
    }


    async remind() {
        try {
            const response = await fetch('/api/auth/me', {
                method: "GET",

            });
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const user = await response.json();
            this._usersController.setAuthUser(user)
            this._dispatch(setAuth(user));
            return user
        } catch (e) {
            console.error(e);
        }
    }

    // async login(email: string, password: string): Promise<void> {
    //     try {
    //         const user = await this._dispatch(signIn({ email, password })).unwrap();
    //         this._authUser = user;
    //     } catch (e) {
    //         console.error("Ошибка при логине:", e);
    //     }
    // }

    // async logout(): Promise<void> {
    //     try {
    //         await this._dispatch(signOut());
    //         this._authUser = null;
    //     } catch (e) {
    //         console.error("Ошибка при выходе:", e);
    //     }
    // }

    // async fetchAuthUser(): Promise<void> {
    //     try {
    //         const user = await this._dispatch(remind()).unwrap();
    //         this._authUser = user;
    //     } catch (e) {
    //         console.error("Ошибка при получении авторизованного пользователя:", e);
    //     }
    // }

    // async registerUser(email: string, password: string, name: string): Promise<void> {
    //     try {
    //         await this._dispatch(register({ email, password, name })).unwrap();
    //     } catch (e) {
    //         console.error("Ошибка при регистрации:", e);
    //     }
    // }


}