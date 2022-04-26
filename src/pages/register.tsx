import { NextPage } from 'next';

import { useAppSelector } from '../app/hooks';
import { AccountStep } from '../components/register/AccountStep';
import { ProfileStep } from '../components/register/ProfileStep';

const RegisterPage: NextPage = () => {
	const { currentPage } = useAppSelector((state) => state.registerForm);

	const steps = [<AccountStep />, <ProfileStep />];

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			{steps[currentPage]}
		</div>
	);
};

export default RegisterPage;
