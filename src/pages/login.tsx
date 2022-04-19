import { Field, Form, Formik, FormikHelpers } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
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
		<div className='w-screen h-screen flex items-center justify-center'>
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
					<Form className="w-1/5 h-1/2 flex justify-evenly items-center flex-col">
						<h1 className="text-4xl">Login</h1>

						<div className="w-full">
							<Field
								type="text"
								name="username"
								className="input input-bordered w-full"
								placeholder="username"
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
								placeholder="password"
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

						<div>
							<p>need an account? <Link href={'/register'}><span className='link text-primary'>register.</span></Link></p>
						</div>

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
