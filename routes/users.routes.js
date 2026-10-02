import { Router } from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";
import { canEditUser, toPublicUser } from "../utils/publicUser.js";

const router = Router();

router.use(requireAuth);

// /api/users/userlist
router.post("/userlist", async (req, res) => {
	try {
		const { page = 1, perPage = 5 } = req.body;
		const authUserId = req.authUser._id;
		const skip = (page - 1) * perPage;

		// const users = await User.find().skip(skip).limit(perPage); //сюда как то добавить что бы не брать самого authUserId
		const users = await User.find({ _id: { $ne: authUserId } }) // исключает authUserId
			.skip(skip)
			.limit(perPage);

		const totalUsers = await User.countDocuments();
		const totalPages = Math.ceil(totalUsers / perPage);

		// const users = await User.find();
		// res.status(200).json(users);

		res.status(200).json({
			page: page,
			per_page: perPage,
			total: totalUsers,
			total_pages: totalPages,
			data: users.map((user) => toPublicUser(user)),
		});
	} catch (e) {
		res.status(500).json({
			message: "Smth wrong, try again",
			error: e.message,
		});
	}
});
// router.get("/userlist", async (req, res) => {
// 	try {
// 		// Получаем параметры из query
// 		const page = parseInt(req.query.page) || 1;
// 		const perPage = parseInt(req.query.per_page) || 5;
// 		const skip = (page - 1) * perPage;

// 		const users = await User.find().skip(skip).limit(perPage);

// 		const totalUsers = await User.countDocuments();
// 		const totalPages = Math.ceil(totalUsers / perPage);

// 		// const users = await User.find();
// 		// res.status(200).json(users);

// 		res.status(200).json({
// 			page: page,
// 			per_page: perPage,
// 			total: totalUsers,
// 			total_pages: totalPages,
// 			data: users.map((user) => ({
// 				_id: user._id,
// 				email: user.email,
// 				name: user.name,
// 				first_name: user.first_name,
// 				last_name: user.last_name,
// 				avatar: user.avatar
// 					? user.avatar
// 					: "https://example.com/avatar.jpg",
// 				isAdmin: user.isAdmin,
// 				description: user.description,
// 				role: user.role,
// 			})),
// 		});
// 	} catch (e) {
// 		res.status(500).json({
// 			message: "Smth wrong, try again",
// 			error: e.message,
// 		});
// 	}
// });

// /api/users/:id

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findById(id);

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.status(200).json(toPublicUser(user));
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
		const { first_name, last_name, avatar, description, role } = req.body;

		if (!canEditUser(req.authUser, id)) {
			res.status(403).json({ message: "Forbidden" });
			return;
		}

		const user = await User.findById(id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		user.first_name = first_name;
		user.last_name = last_name;
		user.avatar = avatar;
		if (req.authUser.isAdmin) {
			user.description = description;
			user.role = role;
		}
		await user.save();
		res.status(200).json(toPublicUser(user));
	} catch (e) {
		res.status(500).json({
			message: "Smth wrong, try again",
			error: e.message,
		});
	}
});

export default router;
