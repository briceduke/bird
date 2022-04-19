import { Field, Form, Formik, FormikHelpers } from 'formik';
import moment from 'moment';
import { NextPage } from 'next';
import Router from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';

import { useAppDispatch } from '../app/hooks';
import { useLoginMutation } from '../features/auth/authApi';
import { setAuth } from '../features/auth/authSlice';
import { RegisterPayload } from '../features/users/dto/register-payload.dto';
import { useRegisterMutation } from '../features/users/usersApi';
import { User } from '../models/User';

const RegisterSchema = Yup.object().shape({
	username: Yup.string()
		.min(3, "3 character minimum length")
		.max(15, "15 character maximum length")
		.required("required"),
	password: Yup.string()
		.min(8, "8 character minimum length")
		.required("required"),
	displayName: Yup.string()
		.min(4, "4 character minimum length")
		.max(50, "50 character maximum length")
		.required(),
	bio: Yup.string()
		.min(3, "3 character minimum length")
		.max(160, "160 character maximum length")
		.optional()
		.nullable(),
	website: Yup.string().url().optional().nullable(),
	birth: Yup.string()
		.matches(
			/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]((?:19|20)\d\d)$/,
			{
				message: "must be mm/dd/yyyy",
			}
		)
		.optional()
		.nullable(),
	location: Yup.string()
		.min(3, "3 character minimum length")
		.max(30, "30 character maximum length")
		.optional()
		.nullable(),
	avatarUri: Yup.string().url().optional().nullable(),
});

const RegisterPage: NextPage = () => {
	const [register] = useRegisterMutation();
	const [login] = useLoginMutation();

	const dispatch = useAppDispatch();

	const [serverError, setServerError] = useState("");

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

						const res = (await register({
							...values,
							birth: values.birth ? new Date(moment(fmtDate).toDate()) : null,
						})) as {
							data?: User;
							error: {
								data: { error: string; message: string; statusCode: number };
							};
						};

						if (res.error && res.error.data.statusCode !== 500)
							setServerError(res.error.data.message);
						if (res.error && res.error.data.statusCode === 500)
							setServerError("something went wrong, please try again later!");

						if (res.data) {
							const loginRes = (await login({
								username: values.username,
								password: values.password,
							})) as {
								data?: User;
								error: {
									originalStatus: number;
									message: string;
									error: string;
								};
							};

							if (loginRes.error && loginRes.error.originalStatus !== 500)
								setServerError("invalid credentials!");
							if (loginRes.error && loginRes.error.originalStatus === 500)
								setServerError("something went wrong, please try again later!");

							if (loginRes.data) {
								dispatch(setAuth({ user: loginRes.data }));

								Router.push("/");
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
							{errors.username && touched.username ? (
								<div className="text-error">{errors.username}</div>
							) : null}
						</div>

						<div className="w-full">
							<Field
								type="password"
								name="password"
								className="input input-bordered w-full"
								placeholder="password"
							/>
							{errors.password && touched.password ? (
								<div className="text-error">{errors.password}</div>
							) : null}
						</div>

						<div className="w-full">
							<Field
								type="text"
								name="displayName"
								className="input input-bordered w-full"
								placeholder="display name"
							/>
							{errors.displayName && touched.displayName ? (
								<div className="text-error">{errors.displayName}</div>
							) : null}
						</div>

						<div className="w-full">
							<Field
								type="text"
								name="bio"
								className="input input-bordered w-full"
								placeholder="bio (optional)"
							/>
							{errors.bio && touched.bio ? (
								<div className="text-error">{errors.bio}</div>
							) : null}
						</div>

						<div className="w-full">
							<Field
								type="text"
								name="website"
								className="input input-bordered w-full"
								placeholder="website (optional)"
							/>
							{errors.website && touched.website ? (
								<div className="text-error">{errors.website}</div>
							) : null}
						</div>

						<div className="w-full">
							<Field
								type="text"
								name="location"
								className="input input-bordered w-full"
								placeholder="location (optional)"
							/>
							{errors.location && touched.location ? (
								<div className="text-error">{errors.location}</div>
							) : null}
						</div>

						<div className="w-full">
							<Field
								type="text"
								name="avatarUri"
								className="input input-bordered w-full"
								placeholder="avatar url (optional)"
							/>
							{errors.avatarUri && touched.avatarUri ? (
								<div className="text-error">{errors.avatarUri}</div>
							) : null}
						</div>

						<div className="w-full">
							<Field
								type="text"
								name="birth"
								className="input input-bordered w-full"
								placeholder="birth (mm/dd/yyyy) (optional)"
							/>
							{errors.birth && touched.birth ? (
								<div className="text-error">{errors.birth}</div>
							) : null}
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className={`btn ${isSubmitting ? "loading" : ""} mt-10`}
						>
							Register
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

export default RegisterPage;
