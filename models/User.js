import { Schema, model } from "mongoose";

const schema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	first_name: { type: String, default: "" },
	last_name: { type: String, default: "" },
	avatar: { type: String, default: "https://i.ibb.co/4pDNDk1/avatar.png" },
	isAdmin: { type: Boolean, default: false },
	description: { type: String, default: "" },
	role: { type: String, default: "user" },
});

export default model("User", schema);
