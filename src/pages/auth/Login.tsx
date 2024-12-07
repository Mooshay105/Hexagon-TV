import { useState } from "react";
import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import { postJSONData } from "../../utils/api";
import PasswordBox from "../../components/PasswordBox";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [hasFailed, setHasFailed] = useState(false);
	const [failureReason, setFailureReason] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	document.title = "Hexagon TV | Login";

	function handleLogin() {
		async function getId() {
			if (!username || !password) {
				setHasFailed(true);
				setFailureReason("Please fill in all fields!");
				return;
			}
			try {
				const data = await postJSONData(`https://api.hexagon.kiwi-micro.com:8073/auth`, {
					username: username,
					passwordCheckSum: password,
				});
				if (data.status === "success") {
					localStorage.setItem("id", data.ID);
					localStorage.setItem("username", username);
					window.location.href = "/account";
				} else {
					setFailureReason(data.status);
					setHasFailed(true);
				}
			} catch (error) {
				setFailureReason("There was an error logging you in! Please try again later. (client error)");
				setHasFailed(true);
			}
		}

		getId();
	}

	return (
		<div className="main">
			<GlobalNavBar />
			<div className="loginPage">
				<div className="loginPageDiv">
					<p className="loginPageHeader">Login</p>
					<div className="hasFailed" style={{ display: hasFailed ? "block" : "none" }}>
						{hasFailed && <h4>{failureReason}</h4>}
					</div>
					<div className="loginPageForm">
						<input type="text" placeholder="Username" className="loginPageFormInput" value={username} onChange={(e) => setUsername(e.target.value)} />
						<PasswordBox isVisible={isVisible} setIsVisible={setIsVisible} password={password} setPassword={setPassword} />
						<button className="loginPageFormButton" onClick={() => handleLogin()}>
							Login
						</button>
					</div>
					<div className="loginPageRegisterLinkDiv">
						<a href="/register" className="loginPageRegisterLink">
							Don't have an account? Register here!
						</a>
					</div>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default Login;
