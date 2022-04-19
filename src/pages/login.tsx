import { Field, Form, Formik, FormikHelpers } from 'formik';
import { NextPage } from 'next';
import Router from 'next/router';

import { useAppDispatch } from '../app/hooks';
import { useLoginMutation } from '../features/auth/authApi';
import { setAuth } from '../features/auth/authSlice';
import { LoginPayload } from '../features/auth/dto/login-payload.dto';
import { LoginSchema } from '../models/schemas/login.schema';

const LoginPage: NextPage = () => {
	const [login, { data, error, isError, isSuccess }] = useLoginMutation();

	const dispatch = useAppDispatch();

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
						await login(values)

						if (isSuccess) {
							dispatch(setAuth({ user: data }));

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
							{errors.username && touched.username && (
								<div className="text-error">{errors.username}</div>
							)}
						</div>

						<div className="w-full">
							<Field
								type="password"
								name="password"
								className="input input-bordered w-full"
							/>
							{errors.password && touched.password && (
								<div className="text-error">{errors.password}</div>
							)}
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className={`btn ${isSubmitting ? "loading" : ""}`}
						>
							Login
						</button>

						{isError && (
							<div className="text-error">
								<p>{error}</p>
							</div>
						)}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default LoginPage;
