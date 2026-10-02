export function toPublicUser(user) {
	return {
		_id: user._id,
		email: user.email,
		name: user.name,
		first_name: user.first_name,
		last_name: user.last_name,
		avatar: user.avatar ? user.avatar : "https://example.com/avatar.jpg",
		isAdmin: user.isAdmin,
		description: user.description,
		role: user.role,
	};
}

export function canEditUser(authUser, targetId) {
	return authUser.isAdmin || String(authUser._id) === String(targetId);
}
