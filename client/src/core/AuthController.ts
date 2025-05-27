import { AppDispatch } from "../store";
import { setAuth, clearAuth } from "../store/reducers/auth/authSlice";
import UsersController from "./UsersController";
import { ApiClient } from "./ApiClient";

export default class AuthController {
    constructor(
        private readonly _usersController: UsersController,
        private readonly _dispatch: AppDispatch,
        private readonly _apiClient: ApiClient
    ) {
    }

    async signIn(email: string, password: string) {
        try {
            const user = await this._apiClient.post('/api/auth/login', { email, password });
            this._usersController.setUser(user, true)
            // this._usersController.getUser()

            this._dispatch(setAuth(user));
            return user;
        } catch (e) {
            console.error(e);
        }
    }


    async signOut() {
        await this._apiClient.post('/api/auth/logout', {});
        this._dispatch(clearAuth());
    }

    async register(data: { email: string; password: string; name: string }) {
        try {
            return await this._apiClient.post('/api/auth/register', data);
        } catch (e) {
            console.error(e);
        }
    }


    async remind() {
        try {
            const user = await this._apiClient.get('/api/auth/me');
            this._usersController.setUser(user, true)
            this._dispatch(setAuth(user));
            return user;
        } catch (e) {
            console.error(e);
        }
    }
}