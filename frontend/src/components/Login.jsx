import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function Login() {
    const navigate = useNavigate();
    const [loginText, setLoginText] = React.useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setLoginText((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    const clickLogin = async (event) => {
        event.preventDefault();
        if (!loginText.username || !loginText.password) {
            return alert("Please fill in all fields."); // Basic validation
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/login`,
                loginText,
                config
            );

            if (data.error) {
                return alert(data.error);
            }

            localStorage.setItem("userInfo", JSON.stringify(data));
            alert("Login successful");
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("Invalid Username or Password");
            } else {
                alert("An error occurred. Please try again.");
                console.log(error);
            }
        }
    };

    return (
        <div>
            <div>
                <Link to={`/`} className='home-btn'>
                    <span className='arrow'><IoArrowBackCircleOutline /></span> Home
                </Link>
            </div>
            <div className="container">
                <img src="/images/login4.png" alt="Login" />
                <div className="sub-container">
                    <h2>Login</h2>
                    <form onSubmit={clickLogin}>
                        <input
                            onChange={handleChange}
                            name="username"
                            type="text"
                            value={loginText.username}
                            placeholder="User Name"
                            required
                        />
                        <input
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={loginText.password}
                            placeholder="Password"
                            required
                        />
                        <button type="submit" className="normal">Login</button>
                    </form>
                    <p>Not a member? <Link to="/signup">Sign Up</Link> Now</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
