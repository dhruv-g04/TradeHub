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
                    `https://tradehub-backend.onrender.com/api/product/cart`, Data, config
                );
                window.alert(resp.data.message);
            } catch (error) {
                navigate("/login");
                console.log(error.response.data);
            }
        }
    };

    return (
        <div className="card">
            <img className="open-card" onClick={navigateToProduct} src={process.env.PUBLIC_URL + `/uploads/${product.imageFilePath ? product.imageFilePath : "no-img.png"}`} alt="" />
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
