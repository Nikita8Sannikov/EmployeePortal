import AuthController from "./AuthController";
import UsersController from "./UsersController";
import { AppDispatch } from '../store';
import CatchErrors from "./CatchErrors";
import { ApiClient } from "./ApiClient";

export default class MainCore {
    private readonly _usersController: UsersController
    private readonly _authController: AuthController
    private readonly _catchErrors: CatchErrors
    private readonly _apiClient: ApiClient

    constructor(private readonly _dispatch: AppDispatch) {
        this._catchErrors = new CatchErrors(this._dispatch);
        this._apiClient = new ApiClient('', this._catchErrors)
        this._usersController = new UsersController(this._dispatch, this._apiClient)
        this._authController = new AuthController(this._usersController, this._dispatch, this._apiClient)
    }

    get usersController() {
        return this._usersController
    }
    get authController() {
        return this._authController
    }
    catchErrors() {  
        return this._catchErrors
     }
}