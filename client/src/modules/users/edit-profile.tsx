import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { updateUsers } from "./usersSlice";

const EditProfile = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const loggedInUser = useSelector((state: RootState) => state.auth.user);
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		avatar: "",
		description: "",
		role: "user",
	});
	const changeHandler = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	useEffect(() => {
		const fetchUser = async () => {
			const response = await fetch(`/api/users/${id}`);
			const data = await response.json();
			setForm({
				first_name: data.first_name,
				last_name: data.last_name,
				avatar: data.avatar,
				description: data.description,
				role: data.role,
			});
		};
		fetchUser();
	}, [id]);

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		const response = await fetch(`/api/users/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});

		const data = await response.json();
		console.log(data);

		if (response.ok) {
			updateUsers(data);
			navigate(`/profile/${id}`); // Возвращаемся на страницу профиля
		} else {
			alert("Ошибка при сохранении данных");
		}
	};

	return (
		<div>
			<h1>Редактирование профиля</h1>
			<form>
				<input
					type="text"
					name="first_name"
					placeholder="Имя"
					value={form.first_name}
					onChange={changeHandler}
				/>
				<input
					type="text"
					name="last_name"
					placeholder="Фамилия"
					value={form.last_name}
					onChange={changeHandler}
				/>
				<input
					type="text"
					name="avatar"
					placeholder="Ссылка на аву"
					value={form.avatar}
					onChange={changeHandler}
				/>
				{loggedInUser?.isAdmin && (
					<>
						<textarea
							name="description"
							value={form.description}
							onChange={changeHandler}
							placeholder="Описание"
							rows={5}
							cols={100}
						/>
						{/* <input
							type="text"
							name="description"
							placeholder="Описание"
							value={form.description}
							onChange={changeHandler}
						/> */}
						<input
							type="text"
							name="role"
							placeholder="Роль"
							value={form.role}
							onChange={changeHandler}
						/>
					</>
				)}

				<button onClick={handleSave}>Сохранить</button>
			</form>
		</div>
	);
};

export default EditProfile;
