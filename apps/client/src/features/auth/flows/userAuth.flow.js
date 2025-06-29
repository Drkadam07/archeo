import { authApi } from "@/features/auth/actions/authApi.action.js";
import { setCredentials } from "@/features/auth/reducer/authSlice.reducer.js";
import { ROUTES } from "@/shared/routing/routes.constant.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useLoginMutation } from "@/features/auth/actions/authApi.action.js";

// custom hook
export const useUserAuthFlow = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [login, { isSuccess, isError, data, error }] = useLoginMutation();

	const apiCalls = {
		login: authApi.endpoints.login.initiate,
		register: authApi.endpoints.register.initiate,
	};

	const flow = async (type, formData) => {
		try {
			if (!Object.keys(apiCalls).includes(type))
				throw new Error(`No type ${type} flow available for role user.`);
			const result = await login(formData).unwrap();
			// validate result.user
			if (isSuccess) {
				dispatch(setCredentials({ ...result.user }));
				navigate(ROUTES.DASHBOARD);
			}
		} catch (error) {
			console.error(`[${type.toUpperCase()} ERROR]:`, error);
			return { error: error.message || "Something went wrong" };
		}
	};

	return { flow };
};
