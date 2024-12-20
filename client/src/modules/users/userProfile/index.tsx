import { useNavigate, useParams } from "react-router-dom";
import SideLayout from "../../../components/sideLayout";
import Spinner from "../../../components/spinner";
import useUsers from "../../../hooks/useUsers";
import "./userProfile.css";

const UserProfile = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const usersController = useUsers();
	const user = usersController.getUser(id);


	// const callbacks = {
	// 	onEdit: useCallback(() => {
	// 		navigate(`/edit/${id}`);
	// 	}, [navigate, id]),
	// 	onBack: useCallback(() => {
	// 		navigate("/");
	// 	}, [navigate]),
	// };

	// Функции простые, не зависят от сложных вычеслений, поэтому принято решения убрать useCallback

	const functions = {
		onEdit: () => {
			navigate(`/edit/${id}`);
		},
		onBack: () => {
			navigate("/");
		},
	};

	return (
		<div className="profile-container">
			{user ? (
				<>
					<header className="profile-header">
						<SideLayout side="between">
							<button
								onClick={functions.onBack}
								className="back-button"
							>
								Назад
							</button>
							{user.canEdit && (
								<button
									onClick={functions.onEdit}
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
								{/* можно вынести в класс */}

								<h4>{user.role}</h4>
							</div>
						</SideLayout>
					</header>

					<section className="profile-content">
						<div className="partner-section">
							<div className="partner-info">
								<p>
									{user.soonDescription}
									{/* {user.description
										? user.description
										: "Описание скоро будет добавлено "} */}
									{/* тоже в класс геттером (check) */}
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

// Так же мемоизация компонента здесь будет избыточна так как UserProfile использует useParams и useUsers, а не получает пропсы. Его рендеринг зависит только от внутренних данных
// export default React.memo(UserProfile);
export default UserProfile;
