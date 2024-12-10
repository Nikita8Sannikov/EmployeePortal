import express from "express";
import config from "config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //Мидлвар cookie-parser разбирает cookies и делает их доступными через req.cookies
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

const PORT = config.get("port") || 5000;

async function start() {
	try {
		await mongoose.connect(config.get("mongoUri"), {});
		app.listen(PORT, () =>
			console.log(`App has been started on port ${PORT}`)
		);
	} catch (e) {
		if (e instanceof Error) {
			console.log("Server Error", e.message);
		} else {
			console.log("Server Error", e);
		}
		process.exit(1);
	}
}

start();
