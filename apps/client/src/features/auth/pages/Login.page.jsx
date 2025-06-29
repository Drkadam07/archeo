import { ROLES } from "@/shared/constants/roles.constant";
import React, { useState } from "react";
import { useUserAuthFlow } from "@/features/auth/flows/userAuth.flow.js";
import { useParams } from "react-router";
import { getLoginFieldsForRole } from "@/features/auth/constants/getFieldsForRole.constant.js";
import ErrorPage from "@/shared/routing/Error.page.jsx";
import { FolderLock } from "lucide-react";
import { LoginForm } from "@/components/login-form.jsx";

function LoginPage() {
	let { role } = useParams();
	if (!Object.values(ROLES).includes(role)) {
		role = ROLES.USER; // if role invalid or missing, default to "user"
	}

	const { flow } = useUserAuthFlow();
	const fields = getLoginFieldsForRole[role];

	const [formData, setFormData] = useState(
		// maps field[] => formData object with (name, initialValue) pairs
		fields.reduce((accum, curr) => {
			accum[curr.name] = curr.initialValue;
			return accum;
		}, {})
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await flow("login", formData);

		if (result?.error) {
			return (
				<ErrorPage
					message="Login Page Error"
					error={result.error}
					fallbackRoute={ROUTES.LOGIN}
				/>
			);
		}
	};
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="relative hidden bg-muted lg:block">
				<img
					src="/assets/login.jpg"
					alt="Image"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<a href="/" className="flex items-center gap-2 font-medium">
						<div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<FolderLock className="size-4" />
						</div>
						Archeo
					</a>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
