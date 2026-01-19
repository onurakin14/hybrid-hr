import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/users/usersSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];