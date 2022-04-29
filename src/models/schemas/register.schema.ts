import * as Yup from 'yup';
import { usersApi } from '../../features/users/usersApi';

export const RegisterSchema = Yup.object().shape({
	username: Yup.string()
		.min(3, "3 character minimum length")
		.max(15, "15 character maximum length")
		.required("username is required").test("username is unique", "username exists!", 
			async (value) => {
				
				return true;
		}),
	password: Yup.string()
		.min(8, "8 character minimum length")
		.required("password is required"),
	displayName: Yup.string()
		.min(4, "4 character minimum length")
		.max(50, "50 character maximum length")
		.required("display name is required"),
	inviteCode: Yup.string()
		.min(8, "8 character length")
		.max(8, "8 character length")
		.required("invite code is required"),
	bio: Yup.string()
		.min(3, "3 character minimum length")
		.max(160, "160 character maximum length")
		.optional()
		.nullable(),
	website: Yup.string().url("website must be a valid url").optional().nullable(),
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
	avatarUri: Yup.string().url("avatar url must be valid").optional().nullable(),
});