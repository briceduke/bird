import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
	username: Yup.string()
		.min(3, "3 character minimum length")
		.max(15, "15 character maximum length")
		.required("username is required"),
	password: Yup.string()
		.min(8, "8 character minimum length")
		.required("password is required"),
});