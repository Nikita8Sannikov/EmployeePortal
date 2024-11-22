import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import useRoutes from "./routes";
import "./global.css";
import { remind } from "./modules/auth/authSlice";
import { useEffect } from "react";

function App() {
	const dispatch: AppDispatch = useDispatch();
	const exists = useSelector((state: RootState) => state.auth.exists);
	const status = useSelector((state: RootState) => state.auth.status);
	// const [loading, setLoading] = useState(true);
	const router = useRoutes(exists);

	useEffect(() => {
		dispatch(remind());
	}, [dispatch]);

	if (status === "loading") {
		return <div>Загрузка...</div>;
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
