import {configureStore} from '@reduxjs/toolkit';
import userSliceReducer from "./slices/user.slice"

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}) /* .concat(logger), */,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export default store;