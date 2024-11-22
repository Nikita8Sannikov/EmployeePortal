import { configureStore, Middleware } from '@reduxjs/toolkit'
import usersReducer from './modules/users/usersSlice'
import authSlice from './modules/auth/authSlice'

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action: unknown) => {
    const actionType = (action as { type?: string }).type ?? 'unknown action';

    console.group(
        `%c${'Action'} %c${actionType}`,
        'color: #777; font-weight: normal',
        'color: #333; font-weight: bold'
    );
    console.log('%cPrevious State:', 'color: #d77332', storeAPI.getState());
    console.log('%cAction:', 'color: #2fa827', action);
    const result = next(action);
    console.log('%cNext State:', 'color: #2fa827', storeAPI.getState());
    console.groupEnd();
    return result;
};

export const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: authSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(loggerMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch