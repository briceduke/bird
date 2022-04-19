import { Field, Form, Formik, FormikHelpers } from 'formik';
import { NextPage } from 'next';
import Router from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';

import { useAppDispatch } from '../app/hooks';
import { useLoginMutation } from '../features/auth/authApi';
import { setAuth } from '../features/auth/authSlice';
import { LoginPayload } from '../features/auth/dto/login-payload.dto';
import { User } from '../models/User';

const LoginSchema = Yup.object().shape({
	username: Yup.string()
		.min(3, "3 character minimum length")
		.max(16, "16 character maximum length")
		.required("required"),
	password: Yup.string()
		.min(8, "8 character minimum length")
		.required("required"),
});

const LoginPage: NextPage = () => {
	const [login] = useLoginMutation();

	const dispatch = useAppDispatch();

	const [serverError, setServerError] = useState("");

	return (
		<div>
			<Formik
				initialValues={{ username: "", password: "" }}
				validationSchema={LoginSchema}
				onSubmit={(
					values: LoginPayload,
					{ setSubmitting }: FormikHelpers<LoginPayload>
				) => {
					setTimeout(async () => {
						const res = (await login(values)) as {
							data?: User;
							error: { originalStatus: number; message: string; error: string };
						};

						if (res.error && res.error.originalStatus !== 500)
							setServerError("invalid credentials!");
						if (res.error && res.error.originalStatus === 500)
							setServerError("something went wrong, please try again later!");

						if (res.data) {
							dispatch(setAuth({ user: res.data }));

							Router.push("/home");
						}

						setSubmitting(false);
					}, 1000);
				}}
			>
				{({ isSubmitting, errors, touched }) => (
					<Form className="w-1/6 h-1/3 flex justify-evenly items-center flex-col">
						<h1 className="text-4xl">Login</h1>

						<div className="w-full">
							<Field
								type="text"
								name="username"
								className="input input-bordered w-full"
							/>
							{errors.username && touched.username ? (
								<div className="text-error">{errors.username}</div>
							) : null}
						</div>

						<div className="w-full">
							<Field
								type="password"
								name="password"
								className="input input-bordered w-full"
							/>
							{errors.password && touched.password ? (
								<div className="text-error">{errors.password}</div>
							) : null}
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className={`btn ${isSubmitting ? "loading" : ""}`}
						>
							Login
						</button>

						{serverError && (
							<div className="text-error">
								<p>{serverError}</p>
							</div>
						)}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default LoginPage;
