import { MouseEvent, ReactEventHandler, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleModal } from '../../../features/auth/authSlice';
import { CreateChirpModalProps } from './create-chirp-modal.props';

export const CreateChirpModal = ({ children }: CreateChirpModalProps) => {
	const [isBrowser, setIsBrowser] = useState(false);

	const { showModal } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const handleToggleModal = () => dispatch(toggleModal());

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	const content = showModal && (
		<div className="absolute top-0 left-0 w-full h-full">
			<div
				className="absolute cursor-pointer bg-opacity-50 bg-base-300 z-40 overflow-clip w-full h-full"
				onClick={handleToggleModal}
			/>
			<div className="w-full h-full flex items-center justify-center">
				{children}
			</div>
		</div>
	);

	if (isBrowser) {
		return ReactDOM.createPortal(
			content,
			document.getElementById("modal-root")
		);
	} else {
		return null;
	}
};
