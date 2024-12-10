import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import useRoutes from "../../hooks/useRoutes";
import { remind } from "../../store/reducers/auth/authSlice";
import { useEffect } from "react";
import Spinner from "../spinner";

function App() {
	const dispatch: AppDispatch = useDispatch();
	const status = useSelector((state: RootState) => state.auth.status);
	const router = useRoutes();

	useEffect(() => {
		dispatch(remind());
	}, [dispatch]);

	if (status === "loading") {
		return <Spinner />;
		// return <div>Загрузка...</div>;
	}

	// useEffect(() => {
	// 	dispatch(remind()).finally(() => setLoading(false));
	// }, [dispatch]);

	// if (loading || status === "loading") {
	// 	return <div>Загрузка...</div>;
	// }

	return <RouterProvider router={router} />;
}

export default App;
