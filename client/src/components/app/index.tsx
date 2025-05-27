import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import useRoutes from "../../hooks/useRoutes";
import { useEffect } from "react";
import Spinner from "../spinner";
import useAuth from "../../hooks/useAuth";

function App() {
	const dispatch: AppDispatch = useDispatch();
	const status = useSelector((state: RootState) => state.auth.status);
	const router = useRoutes();
	const authController = useAuth();

	useEffect(() => {
		authController.remind();
	}, [dispatch, authController]);

	if (status === "loading") {
		return <Spinner />;
	}
	console.log("render");

	return (
		<RouterProvider router={router} />
	);
}

export default App;
