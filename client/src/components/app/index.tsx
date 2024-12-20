import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import useRoutes from "../../hooks/useRoutes";
// import { remind } from "../../store/reducers/auth/authSlice";
import { useEffect } from "react";
import Spinner from "../spinner";
import useAuth from "../../hooks/useAuth";
// import MainCore from "../../core/MainCore";

// export const MainCoreContext = createContext<MainCore>(null as never);

function App() {
	const dispatch: AppDispatch = useDispatch();
	const status = useSelector((state: RootState) => state.auth.status);
	const router = useRoutes();
	const authController = useAuth();
	useEffect(() => {
		// dispatch(remind());
		authController.remind();
	}, [dispatch, authController]);

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

	// const mainCore = new MainCore(dispatch);

	console.log("render");

	return (
		// <MainCoreContext.Provider value={mainCore}>
		<RouterProvider router={router} />
		// </MainCoreContext.Provider>
	);
}

export default App;
