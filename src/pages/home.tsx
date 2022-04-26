import { NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { Layout } from '../components/layouts/DefaultLayout';
import { CreateChirpModal } from '../components/modals/CreateChirpModal';
import { toggleModal } from '../features/auth/authSlice';
import { useGetUserQuery } from '../features/users/usersApi';

const HomePage: NextPage = () => {
	const { data } = useGetUserQuery({ username: "brice" });

	const dispatch = useAppDispatch();

	const handleToggleModal = () => dispatch(toggleModal());
	
	return <Layout><div>
			{data && <div>{data.joinDate}</div>}
			<button onClick={handleToggleModal} className="btn btn-primary">Modal</button>
			<CreateChirpModal>
				<div>hi</div>
			</CreateChirpModal>
		</div></Layout>;
};

export default HomePage;
