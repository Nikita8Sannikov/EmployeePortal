import AuthController from "./AuthController";
import UsersController from "./UsersController";
import { AppDispatch } from '../store';

export default class MainCore {
    private readonly _usersController: UsersController
    private readonly _authController: AuthController

    constructor(private readonly _dispatch: AppDispatch) {
        this._usersController = new UsersController(this._dispatch)
        this._authController = new AuthController(this._usersController, this._dispatch)
    }

    get usersController() {
        return this._usersController
    }
    get authController() {
        return this._authController
    }

}