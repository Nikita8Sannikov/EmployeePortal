import { Schema, model } from "mongoose";

const schema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	// first_name: { type: String, required: true },
	// last_name: { type: String, required: true },
	// avatar: { type: String, default: "https://i.ibb.co/4pDNDk1/avatar.png" },
	// isAdmin: {type: Boolean, default: false}
});

export default model("User", schema);
