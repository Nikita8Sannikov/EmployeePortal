import { Router } from "express";
import User from "../models/User.js";

const router = Router();

// /api/users/userlist
router.get("/userlist", async (req, res) => {
	try {
		// Получаем параметры из query
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.per_page) || 4;
		const skip = (page - 1) * perPage;

		const users = await User.find().skip(skip).limit(perPage);

		const totalUsers = await User.countDocuments();
		const totalPages = Math.ceil(totalUsers / perPage);

		// const users = await User.find();
		// res.status(200).json(users);

		res.status(200).json({
			page: page,
			per_page: perPage,
			total: totalUsers,
			total_pages: totalPages,
			data: users.map((user) => ({
				_id: user._id,
				email: user.email,
				name: user.name,
				first_name: user.first_name,
				last_name: user.last_name,
				avatar: user.avatar
					? user.avatar
					: "https://example.com/avatar.jpg",
			})),
		});
	} catch (e) {
		res.status(500).json({
			message: "Smth wrong, try again",
			error: e.message,
		});
	}
});

export default router;

// /api/users/:id

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findById(id);

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.status(200).json(user);
	} catch (e) {
		res.status(500).json({
			message: "Smth wrong, try again",
			error: e.message,
		});
	}
});

// /api/users/:id
router.patch("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { first_name, last_name, avatar } = req.body;

		const user = await User.findById(id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		(user.first_name = first_name),
			(user.last_name = last_name),
			(user.avatar = avatar),
			// user.name = name;
			await user.save();
		res.status(200).json(user);
	} catch (e) {
		res.status(500).json({
			message: "Smth wrong, try again",
			error: e.message,
		});
	}
});
