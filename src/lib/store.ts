import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/users/usersSlice";

import taskReducer from "./features/tasks/taskSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            tasks: taskReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
