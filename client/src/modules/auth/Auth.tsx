import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { register, signIn } from "./authSlice";

const Auth = () => {
	const dispatch: AppDispatch = useDispatch();
	const [form, setForm] = useState({
		email: "",
		password: "",
		name: "",
	});
	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const callbacks = {
		onLogin: useCallback(() => {
			dispatch(signIn({ email: form.email, password: form.password }));
		}, [dispatch, form.email, form.password]),
		onReg: useCallback(() => {
			setForm({ email: "", password: "", name: "" });
			dispatch(
				register({
					email: form.email,
					password: form.password,
					name: form.name,
				})
			);
		}, [dispatch, form.email, form.password, form.name]),
	};

	return (
		<div className="">
			<div className="">
				<h1>Employee__Portal</h1>
				<div className="">
					<div className="">
						<span className="">Введите имя при регистрации</span>
						<div>
							<div className="input-field">
								<label htmlFor="email">Name</label>
								<input
									placeholder="Введите email"
									id="name"
									type="text"
									name="name"
									// className="yellow-input"
									value={form.name}
									onChange={changeHandler}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="email">Email </label>
								<input
									placeholder="Введите email"
									id="email"
									type="text"
									name="email"
									// className="yellow-input"
									value={form.email}
									onChange={changeHandler}
								/>
							</div>

							<div className="input-field">
								<label htmlFor="Пароль">Пароль</label>
								<input
									placeholder="Введите пароль"
									id="password"
									type="password"
									name="password"
									// className="yellow-input"
									value={form.password}
									onChange={changeHandler}
								/>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button
							className="btn"
							style={{ marginRight: 10 }}
							onClick={callbacks.onLogin}
						>
							Войти
						</button>
						<button className="btn" onClick={callbacks.onReg}>
							Регистрация
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
