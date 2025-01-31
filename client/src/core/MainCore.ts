import AuthController from "./AuthController";
import UsersController from "./UsersController";
import { AppDispatch } from '../store';
import CatchErrors from "./CatchErrors";

export default class MainCore {
    private readonly _usersController: UsersController
    private readonly _authController: AuthController
    private readonly _catchErrors: CatchErrors;

    constructor(private readonly _dispatch: AppDispatch) {
        this._usersController = new UsersController(this._dispatch)
        this._authController = new AuthController(this._usersController, this._dispatch)
        this._catchErrors = new CatchErrors(this._dispatch);
    }

    get usersController() {
        return this._usersController
    }
    get authController() {
        return this._authController
    }
    catchErrors(error: string, fetchPromise: Promise<Response>) {  
        return this._catchErrors.catchError(error, fetchPromise)
     }
}