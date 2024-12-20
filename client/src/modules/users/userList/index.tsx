import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import { increment, decrement } from "../../../store/reducers/users/usersSlice";
import SideLayout from "../../../components/sideLayout";
import Spinner from "../../../components/spinner";
import useUsers from "../../../hooks/useUsers";
import useAuth from "../../../hooks/useAuth";
import "./userList.css";

const UsersList = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const usersController = useUsers();
	const authController = useAuth();
	const me = usersController.getUser();
	const { page, total_pages, error, loading } = useSelector(
		(state: RootState) => state.users
	);

	useEffect(() => {
		usersController.fetchUsers(page);
	}, [page]);

	// const callbacks = {
	// 	onLogout: useCallback(() => {
	// 		authController.signOut();
	// 	}, [authController]),
	// 	onShowMore: useCallback(() => {
	// 		dispatch(increment());
	// 	}, [dispatch]),
	// 	onShowLess: useCallback(() => {
	// 		dispatch(decrement());
	// 	}, [dispatch]),
	// 	onUserClick: useCallback(
	// 		(id: string) => navigate(`/profile/${id}`),
	// 		[navigate]
	// 	),
	// };

	const functions = {
		onLogout: () => {
			authController.signOut();
		},
		onShowMore: () => {
			dispatch(increment());
		},
		onShowLess: () => {
			dispatch(decrement());
		},
		onUserClick: (id: string) => navigate(`/profile/${id}`),
	};

	return (
		<div className="user-list-container">
			<header className="user-list-header">
				{me && (
					// !loading &&
					<SideLayout side="between">
						<div
							key="228"
							className="user-name"
							onClick={() => functions.onUserClick(me.id)
						>
							{`Вы - `}
							{me.name ? me.name : me.regName}
						</div>
						<button
							onClick={functions.onLogout}
							className="logout-button"
						>
							{/* {isMobile ? "=>" : "Выход"} */}
							Выход
						</button>
					</SideLayout>
				)}

				<h1 className="title">Наша команда</h1>

				<div className="subtitle">
					Это опытные специалисты, хорошо разбирающиеся во всех
					задачах, которые ложатся на их плечи, и умеющие находить
					выход из любых, даже самых сложных ситуаций.
				</div>
			</header>

			<div className="user-cards">
				{loading && <Spinner />}
				{error && <p>Ошибка: {error}</p>}
				{usersController.users &&
					!loading &&
					usersController.users.map((user) => (
						<div
							key={user.id}
							className="user-card"
							onClick={() => functions.onUserClick(user.id)}
						>
							<img
								src={user.avatar}
								alt={user.name}
								className="avatar"
							/>
							<h2 className="name">
								{user.name.trim() ? user.name : user.regName}
							</h2>
						</div>
					))}
			</div>
			{/* {page < total_pages ? (
				<button onClick={functions.onShowMore} className="show-button">
					Показать больше
				</button>
			) : (
				<button onClick={functions.onShowLess} className="show-button">
					Показать меньше
				</button>

			)} */}
			<button
				onClick={
					page < total_pages
						? functions.onShowMore
						: functions.onShowLess
				}
				className="show-button"
			>
				{page < total_pages ? "Показать больше" : "Показать меньше"}
			</button>
		</div>
	);
};

export default UsersList;
