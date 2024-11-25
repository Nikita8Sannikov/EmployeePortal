import { AppDispatch, RootState } from "../../store";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, increment, decrement } from "./usersSlice";
import { useNavigate } from "react-router-dom";
import "./userList.css";
import { signOut } from "../auth/authSlice";
import SideLayout from "../../components/side-layout";

const UsersList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const users = useSelector((state: RootState) => state.users.data);
	const user = useSelector((state: RootState) => state.auth.user);
	const currentUser = user?._id;

	const { page, total_pages, error } = useSelector(
		(state: RootState) => state.users
	);

	useEffect(() => {
		dispatch(fetchUsers(page));
	}, [dispatch, page]);

	const callbacks = {
		onLogout: useCallback(() => {
			dispatch(signOut());
		}, [dispatch]),
		onShowMore: useCallback(() => {
			dispatch(increment());
		}, [dispatch]),
		onShowLess: useCallback(() => {
			dispatch(decrement());
		}, [dispatch]),
		onUserClick: useCallback(
			(id: string) => navigate(`/profile/${id}`),
			[navigate]
		),
	};

	return (
		<div className="user-list-container">
			<header className="user-list-header">
				<SideLayout side="between">
					<div
						className="user-name"
						onClick={() =>
							callbacks.onUserClick(user ? user?._id : "")
						}
					>
						{`Вы - `}
						{user?.first_name ? user?.first_name : user?.name}{" "}
						{user?.last_name && user?.last_name}
					</div>
					<button
						onClick={callbacks.onLogout}
						className="logout-button"
					>
						{/* {isMobile ? "=>" : "Выход"} */}
						Выход
					</button>
				</SideLayout>

				<h1 className="title">Наша команда</h1>

				<div className="subtitle">
					Это опытные специалисты, хорошо разбирающиеся во всех
					задачах, которые ложатся на их плечи, и умеющие находить
					выход из любых, даже самых сложных ситуаций.
				</div>
			</header>
			<div className="user-cards">
				{error && <p>Ошибка: {error}</p>}
				{users &&
					users
						.filter((user) => user._id !== currentUser)
						.map((user) => (
							<div
								key={user._id}
								className="user-card"
								onClick={() => callbacks.onUserClick(user._id)}
							>
								<img
									src={user.avatar}
									alt={`${user.first_name} ${user.last_name}`}
									className="avatar"
								/>
								<h2 className="name">
									{user.first_name} {user.last_name}
								</h2>
							</div>
						))}
			</div>
			{page < total_pages ? (
				<button onClick={callbacks.onShowMore} className="show-button">
					Показать больше
				</button>
			) : (
				<button onClick={callbacks.onShowLess} className="show-button">
					Показать меньше
				</button>
			)}
		</div>
	);
};

export default React.memo(UsersList);
