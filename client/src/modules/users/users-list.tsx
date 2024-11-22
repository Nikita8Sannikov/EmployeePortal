import { AppDispatch, RootState } from "../../store";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, increment, decrement } from "./usersSlice";
import { Link, useNavigate } from "react-router-dom";
import "./userList.css";
import { signOut } from "../auth/authSlice";

const UsersList: React.FC = () => {
	const users = useSelector((state: RootState) => state.users.data);
	const user = useSelector((state: RootState) => state.auth.user);
	const currentUser = user?._id;
	// console.log("пользователь", currentUser);

	const { page, total_pages, error, status } = useSelector(
		(state: RootState) => state.users
	);
	// const isMobile = false;
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();

	const handleShowMore = () => {
		dispatch(increment());
	};

	const handleShowLess = () => {
		dispatch(decrement());
	};

	const handleUserClick = (id: string) => {
		navigate(`/profile/${id}`);
	};

	useEffect(() => {
		dispatch(fetchUsers(page));
		// console.log(`Статус загрузки: ${status}`);
		// console.log(page);
		// console.log(`Рендеринг компонента UsersList: ${users.length}`);
	}, [dispatch, page]);

	// useEffect(() => {
	// 	console.log(`Текущее количество пользователей: ${users.length}`);
	// }, [users]);

	// useEffect(() => {
	// 	console.log(`Текущий Статус загрузки: ${status}`);
	// }, [status]);

	const callbacks = {
		onLogout: useCallback(() => {
			dispatch(signOut());
		}, [dispatch]),
	};

	// console.log(
	// 	"что будет",
	// 	users.filter((user) => {
	// 		console.log("userID", user.id);
	// 		console.log("currentUser", currentUser);

	// 		return user.id !== currentUser;
	// 	})
	// );

	return (
		<div className="user-list-container">
			<header className="user-list-header">
				{/* <Link to="/">{user?.name}</Link> */}
				<div onClick={() => handleUserClick(user?._id ?? 0)}>
					{user?.first_name ? user?.first_name : user?.name}{" "}
					{user?.last_name && user?.last_name}
					{/* {user?.name} */}
				</div>
				{/* <h1>{user?.name || "Гость"}</h1> */}
				<h1 className="title">Наша команда</h1>
				<button onClick={callbacks.onLogout} className="logout-button">
					Выход
				</button>
				<div className="subtitle">
					Это опытные специалисты, хорошо разбирающиеся во всех
					задачах, которые ложатся на их плечи, и умеющие находить
					выход из любых, даже самых сложных ситуаций.
				</div>
				{/* <button
					  onClick={handleLogout}
					className="logout-button"
				>
					{isMobile ? "=>" : "Выход"}
				</button> */}
			</header>
			<div className="user-cards">
				{/* {status === "loading" && <p>Загрузка...</p>} */}

				{error && <p>Ошибка: {error}</p>}
				{users &&
					users
						.filter((user) => user.id !== currentUser)
						.map((user) => (
							<div
								key={user.id}
								className="user-card"
								onClick={() => handleUserClick(user.id)}
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
				<button onClick={handleShowMore} className="button">
					Показать больше
				</button>
			) : (
				<button onClick={handleShowLess} className="button">
					Показать меньше
				</button>
			)}
		</div>
	);
};

export default React.memo(UsersList);
