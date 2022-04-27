import { NextPage } from 'next';

import { useAppDispatch } from '../app/hooks';
import { Layout } from '../components/layouts/DefaultLayout';
import { CreateChirpModal } from '../components/modals/CreateChirpModal';
import { toggleModal } from '../features/auth/authSlice';
import { useGetUserQuery } from '../features/users/usersApi';

const HomePage: NextPage = () => {
	const { data } = useGetUserQuery({ username: "brice" });

	const dispatch = useAppDispatch();

	const handleToggleModal = () => dispatch(toggleModal());

	return (
		<Layout title="Latest Chirps | Chirper">
			<div className="p-4">
				<div className="h-screen"></div>
				<div className="h-screen">
					{data && <div>{data.joinDate}</div>}
					<button onClick={handleToggleModal} className="btn btn-primary">
						Modal
					</button>
					<CreateChirpModal>
						<div className="w-1/2 h-1/2 bg-base-100 z-50">hi</div>
					</CreateChirpModal>
				</div>
			</div>
		</Layout>
	);
};

export default HomePage;
