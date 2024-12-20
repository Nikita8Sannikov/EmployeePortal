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
	const [error, setError] = useState<string | null>(null);

	const [validationError, setValidationError] = useState<{ msg: string }[]>(
		[]
	);
	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};
	//сделать класс кетчЕррорс
	const callbacks = {
		onLogin: useCallback(async () => {
			try {
				setError(null);
				setValidationError([]);
				await authController.signIn(form.email, form.password);
			} catch (e: Error | any) {
				console.error("Ошибка при входе:", e);
				if (e.errors) {
					console.error("Ошибки валидации:", e.errors[0].msg);
					e.errors.forEach((err: any) => {
						console.error(
							`Ошибка в поле "${err.path}": ${err.msg}`
						);
					});
					setValidationError(e.errors || []);
				}
				// setError(e.errors[0].msg ? e.errors[0].msg : e.message);
				setError(e.message);
			}
		}, [form.email, form.password]),
		onReg: useCallback(async () => {
			try {
				setError(null);
				setValidationError([]);
				setForm({ email: "", password: "", name: "" });
				await authController.register({
					email: form.email,
					password: form.password,
					name: form.name,
				});
			} catch (e: Error | any) {
				console.error("Ошибка при регистрации:", e);
				if (e.errors) {
					e.errors.forEach((err: any) => {
						console.error(
							`Ошибка в поле "${err.path}": ${err.msg}`
						);
					});

					setValidationError(e.errors || []);
				}
				setError(e.message);
			}
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
						{validationError.length > 0 ? (
							<div className="error-message">
								<ul>
									{validationError.map((valEr, index) => (
										<li key={index}>{valEr.msg}</li>
									))}
								</ul>
							</div>
						) : (
							error && (
								<div className="error-message">{error}</div>
							)
						)}
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
