import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/shared/reducer/apiSlice.reducer";
import authReducer from "@/features/auth/reducer/authSlice.reducer";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
