///точка входа которая ретернает юзерлист
// import { createContext } from "react";
import UserList from "./userList";
// import UsersController from "../../core/UsersController";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store";
// import { IUser } from "../../types/types";
// import AuthController from "../../core/AuthController";

// export const UsersControllerContext = createContext<UsersController>(
// 	null as never
// );

const Users = () => {
	// const dispatch: AppDispatch = useDispatch();
	// const user = useSelector((state: RootState) => state.auth.user) as IUser;
	// const isAuth = useSelector((state: RootState) => state.auth.isAuth);
	// const authController = new AuthController(dispatch);
	// const usersController = new UsersController(
	// 	authController,
	// 	// user
	// 	// isAuth,
	// 	dispatch
	// );

	return (
		// <UsersControllerContext.Provider value={usersController}>
		<UserList />
		// </UsersControllerContext.Provider>
	);
};

export default Users;
