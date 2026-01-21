import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/users/authSlice";
import userReducer from "./features/users/usersSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            user: userReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
