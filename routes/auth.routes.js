import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";

const router = Router();
const jwtSecret = config.get("jwtSecret");

// /api/auth/register
router.post(
	"/register",
	[
		check("email", "Invalid email").isEmail(),
		check("password", "Password must be at least 6 characters").isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({
					errors: errors.array(),
					message: "Invalid registration data",
				});
				return;
			}

			const { email, password, name } = req.body;
			console.log(email, password, name);

			const candidate = await User.findOne({ email });

			if (candidate) {
				res.status(400).json({ message: "This user already exists" });
				return;
			}

			const hashPassword = await bcrypt.hash(password, 12);

			const user = new User({
				name,
				email,
				password: hashPassword,
			});

			await user.save();

			res.status(201).json({ message: "User created" });
		} catch (e) {
			res.status(500).json({ message: "Smth wrong, try again" });
		}
	}
);

// /api/auth/login
router.post(
	"/login",
	[
		check("email", "Correct email required").normalizeEmail().isEmail(),
		check("password", "Password required").exists(),
	],
	async (req, res) => {
		// console.log(req.body);

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({
					errors: errors.array(),
					message: "Invalid login data",
				});
				return;
			}
			const { email, password, name } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				res.status(400).json({ message: "User not found" });
				return;
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				res.status(400).json({ message: "Wrong password" });
				return;
			}

			const token = jwt.sign({ userId: user.id }, jwtSecret, {
				expiresIn: "1h",
			});
			res.status(200).json({
				token,
				userId: user.id,
				email: user.email,
				name: user.name,
			});
			// console.log("user", user);
			// console.log("userId", user.id);
		} catch (e) {
			res.status(500).json({ message: "Smth wrong, try again" });
		}
	}
);

// /api/auth/me
router.get("/me", async (req, res) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res.status(401).json({ message: "No token provided" });
		}

		const decoded = jwt.verify(token, jwtSecret);
		const userId = decoded.userId;
		// console.log(req);
		const user = await User.findById(userId);
		// console.log(user);
		// 6737165ce0b86163cb6959a2
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json(user);
	} catch (e) {
		console.error("Error in /me:", e);
		res.status(500).json({
			message: "Smth wrong, try again",
			error: e.message,
		});
	}
});

export default router;
