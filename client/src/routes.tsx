import { createBrowserRouter, Navigate } from "react-router-dom";
import UsersList from "./modules/users/users-list";
import UsersProfile from "./modules/users/user-profile";
import EditProfile from "./modules/users/edit-profile";
import Auth from "./modules/auth/Auth";

const existRouter = createBrowserRouter([
	{ path: "/list", element: <UsersList /> },
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
