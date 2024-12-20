import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideLayout from "../../../components/sideLayout";
import useUsers from "../../../hooks/useUsers";
import "./edit.css";

const EditProfile = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const usersController = useUsers();
	const loggedInUser = usersController.getUser();
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

		if (response.ok) {
			usersController.setUser(data);
			navigate(`/profile/${id}`);
		} else {
			alert("Ошибка при сохранении данных");
		}
	};

	const callbacks = {
		onBack: useCallback(() => {
			navigate("/");
		}, [navigate]),
	};

	return (
		<div className="edit-container">
			<div className="edit-container-header">
				<SideLayout side="between">
					<button onClick={callbacks.onBack} className="back-button">
						Назад
					</button>
				</SideLayout>

				<h1>Редактирование профиля</h1>
			</div>

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
						/>
						<input
							type="text"
							name="role"
							placeholder="Роль"
							value={form.role}
							onChange={changeHandler}
						/>
					</>
				)}

				<button className="edit-container-button" onClick={handleSave}>
					Сохранить
				</button>
			</form>
		</div>
	);
};

export default EditProfile;
