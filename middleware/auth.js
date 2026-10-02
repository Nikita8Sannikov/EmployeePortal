import jwt from "jsonwebtoken";
import config from "config";
import User from "../models/User.js";

const jwtSecret = config.get("jwtSecret");

export const authCookie = {
	httpOnly: true,
	sameSite: "lax",
	secure: false,
	path: "/",
	maxAge: 60 * 60 * 1000,
};

export function clearAuthCookie(res) {
	res.clearCookie("auth_token", {
		httpOnly: true,
		sameSite: "lax",
		secure: false,
		path: "/",
	});
	res.clearCookie("auth_token", {
		httpOnly: true,
		sameSite: "none",
		secure: true,
		path: "/",
	});
}

export async function requireAuth(req, res, next) {
	try {
		const token = req.cookies?.auth_token;
		if (!token) {
			return res.status(401).json({ message: "No token provided" });
		}

		const decoded = jwt.verify(token, jwtSecret);
		const user = await User.findById(decoded.userId);
		if (!user) {
			return res.status(401).json({ message: "User not found" });
		}

		req.authUser = user;
		return next();
	} catch {
		return res.status(401).json({ message: "No token provided" });
	}
}
