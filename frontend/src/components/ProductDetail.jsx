import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { LuIndianRupee } from "react-icons/lu";

function ProductDetail() {
    const navigate = useNavigate();
    const param = useParams();
    const productId = param.productId;

    const [productData, setProductData] = useState({});
    const [userID, setUserID] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("productIdFrontend:", productId);
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/products_by_id?id=${productId}`);
                if (res.status === 200) {
                    setProductData(res.data.data); // Assuming res.data.data is the correct structure
                } else {
                    throw new Error(res.data.error); // Assuming error message is sent in res.data.error
                }
            } catch (err) {
                console.error("Error fetching product data:", err);
            }
        };

        fetchData();
    }, [productId]);


    const submitProduct = async (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (!user) {
            window.alert("Please Login!");
            navigate("/login");
        } else {
            const { _id: userID, token } = user;
            setUserID(userID);
            setToken(token);

            const data = {
                userID,
                item: productData
            };

            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };

                const resp = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/product/cart`, data, config);
                window.alert(resp.data.message);
            } catch (error) {
                console.error("Error adding to cart:", error);
                if (error.response && error.response.status === 401) {
                    navigate("/login");
                } else {
                    window.alert("Failed to add to cart. Please try again later.");
                }
            }
        }
    };
    return (
        <section id="single-pro">
            <Header />
            <div id="prodetails" className="section-p1">
                <div className="single-pro-img">
                    <img src={process.env.PUBLIC_URL + `/uploads/${productData.imageFilePath ? productData.imageFilePath : "no-img.png"}`} id="main-img" alt="Product" />
                </div>
                <div className="single-pro-details">
                    <div className="name">
                        <h5>{productData.category}</h5>
                        <h3>{productData.model}</h3>
                    </div>
                    <h2><LuIndianRupee />{productData.price}</h2>
                    <button onClick={submitProduct} className="normal">Add To WishList</button>
                    <h4>Product Details</h4>
                    <span>{productData.description}</span>
                    <h4>Seller Details</h4>
                    <p>Name: <span>{productData.owner}</span></p>
                    <p>Mobile no.: <span>{productData.contact}</span></p>
                    <p>Address: <span>{productData.address}</span></p>
                    <p>Pincode: <span>{productData.pincode}</span></p>
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default ProductDetail;
