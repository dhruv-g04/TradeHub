import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { LuIndianRupee } from "react-icons/lu";

function Card({ product }) {
    const navigate = useNavigate();
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            setUserID(user._id);
        }
    }, []);

    const navigateToProduct = () => {
        navigate(`/productlanding/${product._id}`);
    };

    const submitProduct = async (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (!user) {
            window.alert("Please Login!");
            navigate("/login");
        } else {
            const Data = {
                userID: user._id,
                item: product
            };
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                const resp = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/product/cart`, // Removed extra space
                    Data,
                    config
                );

                // Check if resp and resp.data are defined
                if (resp && resp.data) {
                    window.alert(resp.data.message);
                } else {
                    console.error("Unexpected response structure:", resp);
                }
            } catch (error) {
                // Improved error handling
                if (error.response && error.response.data) {
                    console.error("Error response data:", error.response.data);
                    window.alert(error.response.data.message || "An error occurred");
                } else {
                    console.error("Error:", error);
                    window.alert("An unexpected error occurred");
                }
                navigate("/login");
            }
        }
    };

    return (
        <div className="card">
            <img
                className="open-card"
                onClick={navigateToProduct}
                src={process.env.PUBLIC_URL + `/uploads/${product.imageFilePath ? product.imageFilePath : "no-img.png"}`}
                alt=""
            />
            <div className="open-card des" onClick={navigateToProduct}>
                <span>{product.category}</span>
                <h5>{product.model}</h5>
                <h4><LuIndianRupee /> {product.price}</h4>
            </div>
            <div className="heart" onClick={submitProduct}>
                <AiOutlineHeart />
            </div>
        </div>
    );
}

export default Card;
