import {performLogin} from "./util";
import styles from "./LoginForm.module.css";
import {useState} from "react";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoginInProgress, setIsLoginInProgress] = useState(false);
	const [error, setError] = useState(null);

	const handleLogin = () => {
		setIsLoginInProgress(true);
		setError(null);
		performLogin({email, password})
			.then(() => {
				setIsLoginInProgress(false);
				alert("Login successful");
			})
			.catch((error) => {
				setIsLoginInProgress(false);
				setError(error.message);
			});
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const isLoginButtonDisabled = () => {
		return !email || password.length < 6;
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.row}>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					value={email}
					onChange={handleEmailChange}
					className={styles.formControl}
					placeholder='Enter email'
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					value={password}
					onChange={handlePasswordChange}
					className={styles.formControl}
					placeholder='Enter password'
				/>
			</div>
			<div className={styles.row}>
				<button
					type='button'
					className={styles.loginButton}
					onClick={handleLogin}
					disabled={isLoginButtonDisabled() || isLoginInProgress}
				>
					{isLoginInProgress ? "Logging in..." : "Login"}
				</button>
			</div>
			{error && <div className={styles.errorMessage}>{error}</div>}
		</div>
	);
}
