import { AppDispatch } from '../store';
import { EventEmitter } from 'eventemitter3';
import { setError } from '../store/reducers/auth/authSlice';

type BadRequestType = { success: boolean; message: string; field?: string; };
type CatchType = BadRequestType | string | null;

const ERROR_MESSAGE = "Ошибка";
const ERROR_TIMEOUT = "Превышено время ожидания ответа от сервера";

export default class CatchErrors extends EventEmitter {
    private _errorText: string = ''
    private _fetchError: string = ''

    constructor(private readonly _dispatch: AppDispatch) {
        super()
    }

    get error() {
        return this._fetchError? this._fetchError : this._errorText || ERROR_MESSAGE;
    }

    async catchError(errorText: string, fetchPromise: Promise<Response>): Promise<CatchType> {
        this._errorText = errorText;
        
        try{
            const response = await fetchPromise

            if (!response.ok) {
                 try{
                    const errorBody: BadRequestType = await response.json();
                    this._fetchError = typeof errorBody === 'object' && errorBody.message ? errorBody.message :  JSON.stringify(errorBody)
                 } catch {
                    this._fetchError = response.statusText || ERROR_MESSAGE;
                 }
    
           
    
            console.error(`Ошибка ${response.status}:`, this.error);
    
    
            switch (response.status) {
                            case 308: return this._permanentRedirect();
                            case 400: return this._badRequest();
                            case 401: return this._unauthorized();
                            case 403: return this._forbidden();
                            case 404: return this._notFound();
                            case 500: return this._serverError();
                            default: return this._serverError();
                        };
                        
                    }       
            return null
        } catch (error) {
            console.error(error);
                return this._timeoutError();
        }
       
        // console.error('errtext',this._errorText);
        // try {
        //     const response = await fetchPromise

        //     if (!response.ok) {
        //         const status = response.status

        //         switch (status) {
        //             case 308: return this._permanentRedirect();
        //             case 400: return this._badRequest();
        //             case 401: return this._unauthorized();
        //             case 403: return this._forbidden();
        //             case 404: return this._notFound();
        //             case 500: return this._serverError();
        //             default: return this._serverError();
        //         };
        //     }
        //     return null;
        // } catch (error) {
        //     console.error(error);
        //     return this._timeoutError();
        // }


    }

    // Статус 308
    private _permanentRedirect(): null {
        this.emit('redirect', '/list');
        return null;
    };

    // Статус 400
    private _badRequest(): BadRequestType | string {
        return this._errorText || ERROR_MESSAGE;
    };

    // Статус 401
    private _unauthorized(): null {
        this.emit('redirect', '/');
        return null;
    };

    // Статус 403
    private _forbidden(): null {
        this.emit('redirect', '/');
        return null;
    };

    // Статус 404
    private _notFound(): null {
        this._dispatch(setError(this.error));
        return null;
    };

    // Статус 500
    private _serverError(): null {
        this._dispatch(setError(this.error));
        return null;
    };

    // Время ожидания ответа от сервера
    private _timeoutError(): null {
        this._dispatch(setError(ERROR_TIMEOUT));
        return null;
    };
}