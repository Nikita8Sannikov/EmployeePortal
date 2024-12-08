import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserById } from "../../../store/reducers/users/usersSlice";
import SideLayout from "../../../components/sideLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import "./userProfile.css";

const UserProfile: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const { user } = useSelector((state: RootState) => state.users);
	const loggedInUser = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		if (id) {
			dispatch(fetchUserById(id));
		}
	}, [dispatch, id]);

	const callbacks = {
		onEdit: useCallback(() => {
			navigate(`/edit/${id}`);
		}, [navigate, id]),
		onBack: useCallback(() => {
			navigate("/");
		}, [navigate]),
	};

	return (
		<div className="profile-container">
			{user ? (
				<>
					<header className="profile-header">
						<SideLayout side="between">
							<button
								onClick={callbacks.onBack}
								className="back-button"
							>
								Назад
							</button>
							{(loggedInUser?.isAdmin ||
								loggedInUser?._id === user?._id) && (
								<button
									onClick={callbacks.onEdit}
									className="edit-button"
								>
									Редактировать
								</button>
							)}
						</SideLayout>
						<SideLayout side="start">
							<img src={user.avatar} alt={user.first_name} />

							<div className="profile-title">
								{user.first_name ? user.first_name : user.name}{" "}
								{user.last_name && user.last_name}
								<h4>{user.role}</h4>
							</div>
						</SideLayout>
					</header>

					<section className="profile-content">
						<div className="partner-section">
							<div className="partner-info">
								<p>
									{user.description
										? user.description
										: "Описание скоро будет добавлено "}
								</p>
							</div>
						</div>

						<div className="user-details-contacts">
							<p>Email: {user.email}</p>
						</div>
					</section>
				</>
			) : (
				<p>Загрузка...</p>
			)}
		</div>
	);
};

export default React.memo(UserProfile);
