import { createContext } from "react";
import MainCore from "../core/MainCore";
import App from "../components/app";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";

export const MainCoreContext = createContext<MainCore>(null as never);

export default function AppService() {
	const dispatch: AppDispatch = useDispatch();
	const mainCore = new MainCore(dispatch);

	return (
		<MainCoreContext.Provider value={mainCore}>
			<App />
		</MainCoreContext.Provider>
	);
}
