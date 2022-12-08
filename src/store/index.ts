import { configureStore } from "@reduxjs/toolkit";
// Reducers
import rootReducer from "./reducer";

// const store = configureStore({ reducer });

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export default setupStore();