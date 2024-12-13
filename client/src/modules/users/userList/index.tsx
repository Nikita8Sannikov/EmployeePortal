import { AppDispatch, RootState } from "../../../store";
import React, { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	// fetchUsers,
	increment,
	decrement,
} from "../../../store/reducers/users/usersSlice";
import { useNavigate } from "react-router-dom";
import "./userList.css";
// import { signOut } from "../../../store/reducers/auth/authSlice";
import SideLayout from "../../../components/sideLayout";
// import { UsersControllerContext } from "..";
import Spinner from "../../../components/spinner";
import useUsers from "../../../hooks/useUsers";
import useAuth from "../../../hooks/useAuth";

const UsersList: FC = () => {
	// const usersController = useContext(UsersControllerContext);
	const usersController = useUsers();
	const authController = useAuth();
	// из контектса мейнкора(сделать в енм геттер ) чтобы получить контекст юзер контроллера
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	// const users = useSelector((state: RootState) => state.users.data);
	const me = usersController.getUser();
	// console.log("MEEEE", me);

	// const user = useSelector((state: RootState) => state.auth.user);
	// const currentUser = user?._id;

	const { page, total_pages, error, loading } = useSelector(
		(state: RootState) => state.users
	);

	useEffect(() => {
		usersController.fetchUsers(page);
	}, [page]);

	// useEffect(() => {
	// 	dispatch(fetchUsers(page));
	// }, [dispatch, page]);

	const callbacks = {
		onLogout: useCallback(() => {
			// dispatch(signOut());
			authController.signOut();
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
				{me && (
					// !loading &&
					<SideLayout side="between">
						<div
							className="user-name"
							onClick={() =>
								callbacks.onUserClick(
									// usersController.authUser.id
									// user ? user._id : ""
									me.id
								)
							}
						>
							{`Вы - `}
							{/* {usersController.authUser.regName} */}
							{/* {user?.first_name
								? user?.first_name
								: user?.name}{" "}
							{user?.last_name && user?.last_name} */}
							{/* {me.regName ? me.regName : me.name} */}
							{me.name ? me.name : me.regName}
						</div>
						<button
							onClick={callbacks.onLogout}
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
					usersController.users
						// .filter((user) => user._id !== currentUser)
						.map((user) => (
							<div
								key={user.id}
								className="user-card"
								onClick={() => callbacks.onUserClick(user.id)}
							>
								<img
									src={user.avatar}
									alt={user.name}
									className="avatar"
								/>
								<h2 className="name">
									{/* {user.regName ? user.regName : user.name} */}
									{user.name.trim()
										? user.name
										: user.regName}
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
