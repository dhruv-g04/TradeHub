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
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            };
            const { data } = await axios.post(
                "https://tradehub-backend.onrender.com/api/signup",
                signupText,
                config
            );
            window.alert(data.message);
            if (data.message === "Registration successful") {
                localStorage.setItem("userInfo", JSON.stringify(data));
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode === 409) {
                    window.alert("User already exists.");
                } else {
                    window.alert("Some Error message");
                    console.log("Error message:", error);
                }
            } else {
                window.alert("Error Occurred");
                console.log("Error message:", error);
            }
        }
    };

    return (
        <div>
            <div>
                <Link to={`/`} className='home-btn'> <span className='arrow'><IoArrowBackCircleOutline /></span> Home</Link>
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
                        />
                        <input
                            onChange={handleChange}
                            name="username"
                            type="text"
                            value={signupText.username}
                            placeholder="User Name"
                        />
                        <input
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={signupText.password}
                            placeholder="Password"
                        />
                        <button type="submit" className="normal">Sign Up</button>
                        <p>Already a member? <a href="/login">Login</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
