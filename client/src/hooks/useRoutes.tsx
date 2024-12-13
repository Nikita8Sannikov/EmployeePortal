import { createBrowserRouter, Navigate } from "react-router-dom";
import Users from "../modules/users";
import UsersProfile from "../modules/users/userProfile";
import EditProfile from "../modules/users/editProfile";
import Auth from "../modules/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
// import AuthController from "../core/AuthController";

const existRouter = createBrowserRouter([
	{ path: "/list", element: <Users /> },
	{ path: "/profile/:id", element: <UsersProfile /> },
	{ path: "/edit/:id", element: <EditProfile /> },
	{ path: "*", element: <Navigate to="/list" /> },
]);

const notExistRouter = createBrowserRouter([
	{ path: "/", element: <Auth /> },
	{ path: "*", element: <Navigate to="/" /> },
]);

const useRoutes = () => {
	// const dispatch: AppDispatch = useDispatch();
	// const authController = new AuthController(dispatch);
	// const isAuth = authController.isAuth;
	const isAuth = useSelector((state: RootState) => state.auth.isAuth);

	return isAuth ? existRouter : notExistRouter;
};

export default useRoutes;
