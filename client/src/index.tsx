// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
// import App from "./components/app";
import "./global.css";
import AppService from "./service/AppService";

createRoot(document.getElementById("root")!).render(
	// <StrictMode>
	<Provider store={store}>
		<AppService />
	</Provider>
	// </StrictMode>
);
