import {performLogin} from "./util";
import styles from "./LoginForm.module.css";
import {useState} from "react";

// ================ LOGIN FORM ====================
//
// You are provided with an incomplete login form.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.
//
// Tasks:
//  * Login button should trigger the performLogin() action imported above and pass required data to it.
//  * Disable the Login button if email is blank OR if password is under 6 letters
//  * Disable the Login button while login action is being performed
//  * Show an error message from the performLogin() if login fails. The error should be cleared every time user re-attempts to log in.
//  * Show an alert box (native Javascript alert) if login succeeds. Investigate the performLogin function to find out how to log in successfully.

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
