import React, { useCallback, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./auth.css";

const Auth: React.FC = () => {
	const authController = useAuth();
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
			authController.signIn(form.email, form.password);
		}, [form.email, form.password]),
		onReg: useCallback(() => {
			setForm({ email: "", password: "", name: "" });
			authController.register({
				email: form.email,
				password: form.password,
				name: form.name,
			});
		}, [form.email, form.password, form.name]),
	};

	return (
		<div className="auth-form">
			<div className="">
				<h2>Employee Portal</h2>
				<div className="">
					<div className="">
						<span className="">Введите имя при регистрации</span>
						<div>
							<div className="input-container">
								<label htmlFor="name" className="input-label">
									Name
								</label>
								<input
									placeholder="Введите имя"
									id="name"
									type="text"
									name="name"
									className="input-field"
									value={form.name}
									onChange={changeHandler}
								/>
							</div>
							<div className="input-container">
								<label htmlFor="email" className="input-label">
									Email
								</label>
								<input
									placeholder="Введите email"
									id="email"
									type="text"
									name="email"
									className="input-field"
									value={form.email}
									onChange={changeHandler}
								/>
							</div>

							<div className="input-container">
								<label htmlFor="Пароль" className="input-label">
									Password
								</label>
								<input
									placeholder="Введите пароль"
									id="password"
									type="password"
									name="password"
									className="input-field"
									value={form.password}
									onChange={changeHandler}
								/>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button className="btn" onClick={callbacks.onLogin}>
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
