import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import useRoutes from "../../hooks/useRoutes";
import { useEffect } from "react";
import Spinner from "../spinner";
import Toast from "../toast";
import useAuth from "../../hooks/useAuth";
import { setNotice } from "../../store/reducers/auth/authSlice";

function App() {
	const dispatch: AppDispatch = useDispatch();
	const status = useSelector((state: RootState) => state.auth.status);
	const notice = useSelector((state: RootState) => state.auth.notice);
	const router = useRoutes();
	const authController = useAuth();

	useEffect(() => {
		authController.remind();
	}, [dispatch, authController]);

	useEffect(() => {
		if (!notice) {
			return;
		}
		const timer = window.setTimeout(() => dispatch(setNotice(null)), 2500);
		return () => window.clearTimeout(timer);
	}, [dispatch, notice]);

	if (status === "loading") {
		return <Spinner />;
	}

	return (
		<>
			<RouterProvider router={router} />
			{notice && <Toast message={notice} />}
		</>
	);
}

export default App;
