import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { IoArrowBackCircleOutline } from "react-icons/io5";

function Signup() {
    const navigate = useNavigate();
    const [signupText, setSignupText] = useState({
        name: "",
        username: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setSignupText(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    const register = async (event) => {
        event.preventDefault();
        if (!signupText.name || !signupText.username || !signupText.password) {
            return alert("Please fill in all fields."); // Basic validation
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            };
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/signup`,
                signupText,
                config
            );

            alert(data.message);
            if (data.message === "Registration successful") {
                localStorage.setItem("userInfo", JSON.stringify(data));
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode === 409) {
                    alert("User already exists.");
                } else {
                    alert("An error occurred. Please try again.");
                    console.log("Error message:", error);
                }
            } else {
                alert("Error occurred. Please try again.");
                console.log("Error message:", error);
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
                <img src="/images/login.jpg" alt="Sign Up" />
                <div className="sub-container">
                    <h2>Sign Up</h2>
                    <form onSubmit={register}>
                        <input
                            onChange={handleChange}
                            name="name"
                            type="text"
                            value={signupText.name}
                            placeholder="Full Name"
                            required
                        />
                        <input
                            onChange={handleChange}
                            name="username"
                            type="text"
                            value={signupText.username}
                            placeholder="User Name"
                            required
                        />
                        <input
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={signupText.password}
                            placeholder="Password"
                            required
                        />
                        <button type="submit" className="normal">Sign Up</button>
                        <p>Already a member? <Link to="/login">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
