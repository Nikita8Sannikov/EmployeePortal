import { AppDispatch } from '../store';
import { clearAuth, setError } from '../store/reducers/auth/authSlice';
import { HttpError } from './HttpError';

const ERROR_MESSAGE = "Ошибка";
const ERROR_TIMEOUT = "Превышено время ожидания ответа от сервера";
const ERROR_NETWORK = "Ошибка соединения с сервером";

export default class CatchErrors{
    private _errorText: string = ''

    constructor(private readonly _dispatch: AppDispatch) {
    }

    async catchError(error: Error): Promise<void | null> {
        try {
            if (error instanceof HttpError) {
                this.handleHttpError(error);
            } else {
                this.handleNetworkError(error);
            }
        } catch (error) {
            console.error(error);
            return this._timeoutError();
        }
    }

    private handleHttpError(error: HttpError) {
        const { status, data } = error;
        this._errorText = data.message

        switch (status) {
            case 400: return this._badRequest();
            case 401: return this._unauthorized();
            case 403: return this._forbidden();
            case 404: return this._notFound();
            case 500: return this._serverError();
            default: return this._serverError();
        };
    }

    private handleNetworkError(error: Error) {
        const message = error.message?.includes('timeout')
            ? ERROR_TIMEOUT
            : ERROR_NETWORK;

        this._dispatch(setError(message));
    }

    // Статус 400
    private _badRequest(): string {
    return this._errorText || ERROR_MESSAGE;
};

    // Статус 401
    private _unauthorized(): null {
    this._dispatch(clearAuth());
    return null;
};

    // Статус 403
    private _forbidden(): null {
    this._dispatch(clearAuth());
    return null;
};

    // Статус 404
    private _notFound(): null {
    this._dispatch(setError(this._errorText));
    return null;
};

    // Статус 500
    private _serverError(): null {
    this._dispatch(setError(this._errorText));
    return null;
};

    // Время ожидания ответа от сервера
    private _timeoutError(): null {
    this._dispatch(setError(ERROR_TIMEOUT));
    return null;
};
}