import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideLayout from "../../../components/sideLayout";
import Spinner from "../../../components/spinner";
import useUsers from "../../../hooks/useUsers";
import "./userProfile.css";

const UserProfile: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const usersController = useUsers();
	const user = usersController.getUser(id);

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
							{user.canEdit() && (
								<button
									onClick={callbacks.onEdit}
									className="edit-button"
								>
									Редактировать
								</button>
							)}
						</SideLayout>
						<SideLayout side="start">
							<img src={user.avatar} alt={user.name} />

							<div className="profile-title">
								{user.name.trim() ? user.name : user.regName}
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
				<Spinner />
			)}
		</div>
	);
};

export default React.memo(UserProfile);
