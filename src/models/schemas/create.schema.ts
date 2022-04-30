import * as Yup from 'yup';

export const CreateChirpSchema = Yup.object().shape({
	content: Yup.string()
		.min(1, "1 character minimum length")
		.max(280, "280 character maximum length")
		.required("write something!"),
});
