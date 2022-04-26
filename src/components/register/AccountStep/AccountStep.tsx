import { Field, Form, Formik } from 'formik';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RegisterPayload } from '../../../features/users/dto/register-payload.dto';
import { incrementPage, setForm } from '../../../features/users/registerFormSlice';
import { LoginSchema } from '../../../models/schemas/login.schema';

export const AccountStep = () => {
	const { data } = useAppSelector((state) => state.registerForm);
	const dispatch = useAppDispatch();

	const handleNextPage = (newData: RegisterPayload) => {
		dispatch(setForm({ ...data, ...newData }));
		dispatch(incrementPage());
	};

	return (
		<div className="w-1/5 h-1/3">
			<Formik
				initialValues={data}
				onSubmit={handleNextPage}
				validationSchema={LoginSchema}
			>
				{({ isSubmitting, errors, touched }) => (
					<Form className="w-full h-full flex justify-evenly items-center flex-col">
						<h1 className="text-4xl">let's create your account</h1>
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
							className={`btn w-36 ${isSubmitting ? "loading" : ""}`}
						>
							Next
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};
