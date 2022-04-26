import { Field, Form, Formik, FormikHelpers } from 'formik';
import moment from 'moment';
import Router from 'next/router';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useLoginMutation } from '../../../features/auth/authApi';
import { setAuth } from '../../../features/auth/authSlice';
import { RegisterPayload } from '../../../features/users/dto/register-payload.dto';
import { decrementPage, setForm } from '../../../features/users/registerFormSlice';
import { useRegisterMutation } from '../../../features/users/usersApi';
import { RegisterSchema } from '../../../models/schemas/register.schema';

export const ProfileStep = () => {
	const [register, { error, isError }] = useRegisterMutation();
	const [login, { error: loginError, isError: isLoginError }] =
		useLoginMutation();

	const { data } = useAppSelector((state) => state.registerForm);
	const dispatch = useAppDispatch();

	const handlePrevPage = (newData: RegisterPayload) => {
		dispatch(setForm({ ...data, ...newData }));
		dispatch(decrementPage());
	};

	return (
		<div className="w-1/5 h-1/2 text-center">
			<Formik
				initialValues={data}
				onSubmit={(
					values: RegisterPayload,
					{ setSubmitting }: FormikHelpers<RegisterPayload>
				) => {
					const handleSubmit = async () => {
						let fmtDate: string;

						if (values.birth) {
							const splitDate = (values.birth as unknown as string).split("/");
							fmtDate = splitDate[2] + "-" + splitDate[0] + "-" + splitDate[1];
						}

						Object.keys(values).forEach(
							(v) => (values[v] = values[v] === "" ? null : values[v])
						);

						const user = await register({
							...values,
							birth: values.birth ? new Date(moment(fmtDate).toDate()) : null,
						})
							.unwrap()
							.catch(() => {});

						if (user) {
							const user = await login({
								username: values.username,
								password: values.password,
							})
								.unwrap()
								.catch(() => {});

							if (user) {
								dispatch(setAuth({ user }));

								Router.push("/home");
							}
						}

						setSubmitting(false);
					};

					handleSubmit();
				}}
				validationSchema={RegisterSchema}
			>
				{({ isSubmitting, errors, touched, values, isValid }) => (
					<Form className="w-full h-full flex justify-evenly items-center flex-col">
						<h1 className="text-4xl">great! now create your profile</h1>

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
							{errors.avatarUri && touched.avatarUri && (
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

						<div className="w-full flex items-center justify-evenly">
							<button
								type="button"
								disabled={isSubmitting}
								className={`btn w-36`}
								onClick={() => handlePrevPage(values)}
							>
								Back
							</button>

							<button
								type="submit"
								disabled={!isValid}
								className={`btn btn-primary w-36 ${
									isSubmitting ? "loading" : ""
								}`}
							>
								Register
							</button>
						</div>
					</Form>
				)}
			</Formik>
			{(isError || isLoginError) && (
				<div className="text-error">
					<p>{(error as any).data.message}</p>
					<p>{loginError}</p>
				</div>
			)}
		</div>
	);
};
