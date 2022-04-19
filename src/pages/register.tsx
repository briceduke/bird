import { Field, Form, Formik, FormikHelpers } from 'formik';
import moment from 'moment';
import { NextPage } from 'next';
import Router from 'next/router';

import { useAppDispatch } from '../app/hooks';
import { useLoginMutation } from '../features/auth/authApi';
import { setAuth } from '../features/auth/authSlice';
import { RegisterPayload } from '../features/users/dto/register-payload.dto';
import { useRegisterMutation } from '../features/users/usersApi';
import { RegisterSchema } from '../models/schemas/register.schema';

const RegisterPage: NextPage = () => {
	const [register, { error, isError, isSuccess }] = useRegisterMutation();
	const [login, { data: loginData, error: loginError, isError: isLoginError }] = useLoginMutation();

	const dispatch = useAppDispatch();

	return (
		<div>
			<Formik
				initialValues={{
					username: "",
					password: "",
					displayName: "",
					avatarUri: null,
					bio: null,
					birth: null,
					location: null,
					website: null,
				}}
				validationSchema={RegisterSchema}
				validateOnChange={false}
				onSubmit={(
					values: RegisterPayload,
					{ setSubmitting }: FormikHelpers<RegisterPayload>
				) => {
					setTimeout(async () => {
						let fmtDate: string;

						if (values.birth) {
							const splitDate = (values.birth as unknown as string).split("/");
							fmtDate = splitDate[2] + "-" + splitDate[0] + "-" + splitDate[1];
						}

						Object.keys(values).forEach(
							(v) => (values[v] = values[v] === "" ? null : values[v])
						);

						await register({
							...values,
							birth: values.birth ? new Date(moment(fmtDate).toDate()) : null,
						});

						if (isSuccess) {
							await login({
								username: values.username,
								password: values.password,
							});

							if (loginData) {
								dispatch(setAuth({ user: loginData }));

								Router.push("/home");
							}
						}

						setSubmitting(false);
					}, 2000);
				}}
			>
				{({ isSubmitting, errors, touched }) => (
					<Form className="w-1/6 h-1/3 flex justify-evenly items-center flex-col">
						<h1 className="text-4xl">Register</h1>

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

						<div className="w-full">
							<Field
								type="text"
								name="displayName"
								className="input input-bordered w-full"
								placeholder="display name"
							/>
							{errors.displayName && touched.displayName && (
								<div className="text-error">{errors.displayName}</div>
							)}
						</div>

						<div className="w-full">
							<Field
								type="text"
								name="bio"
								className="input input-bordered w-full"
								placeholder="bio (optional)"
							/>
							{errors.bio && touched.bio && (
								<div className="text-error">{errors.bio}</div>
							)}
						</div>

						<div className="w-full">
							<Field
								type="text"
								name="website"
								className="input input-bordered w-full"
								placeholder="website (optional)"
							/>
							{errors.website && touched.website && (
								<div className="text-error">{errors.website}</div>
							)}
						</div>

						<div className="w-full">
							<Field
								type="text"
								name="location"
								className="input input-bordered w-full"
								placeholder="location (optional)"
							/>
							{errors.location && touched.location && (
								<div className="text-error">{errors.location}</div>
							)}
						</div>

						<div className="w-full">
							<Field
								type="text"
								name="avatarUri"
								className="input input-bordered w-full"
								placeholder="avatar url (optional)"
							/>
							{errors.avatarUri && touched.avatarUri &&(
								<div className="text-error">{errors.avatarUri}</div>
							)}
						</div>

						<div className="w-full">
							<Field
								type="text"
								name="birth"
								className="input input-bordered w-full"
								placeholder="birth (mm/dd/yyyy) (optional)"
							/>
							{errors.birth && touched.birth && (
								<div className="text-error">{errors.birth}</div>
							)}
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className={`btn ${isSubmitting ? "loading" : ""} mt-10`}
						>
							Register
						</button>

						{isError || isLoginError && (
							<div className="text-error">
								<p>{error}</p>
								<p>{loginError}</p>
							</div>
						)}
						{isError && alert(JSON.stringify(error))}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RegisterPage;
