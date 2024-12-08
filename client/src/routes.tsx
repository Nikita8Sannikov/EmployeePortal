import { createBrowserRouter, Navigate } from "react-router-dom";
import Users from "./modules/users";
import UsersProfile from "./modules/users/userProfile";
import EditProfile from "./modules/users/editProfile";
import Auth from "./modules/auth";

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

const useRoutes = (exists: boolean) => {
	if (exists) {
		return existRouter;
	}

	return notExistRouter;
};

export default useRoutes;
