import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { MdOutlineCancel } from "react-icons/md";
import { LuIndianRupee } from "react-icons/lu";
import { BsTelephoneFill } from "react-icons/bs";

function TableRow({ product }) {
    const navigate = useNavigate();
    const [userID, setUserID] = useState(null);

    // Navigate to product details page
    const navigateToProduct = () => {
        navigate(`/productlanding/${product._id}`);
    };

    // Remove product from the wishlist
    const removeProduct = async () => {
        const data = {
            userID,
            item: product
        };

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const resp = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/product/remove/wishlist`,
                data,
                config
            );

            window.alert(resp.data.message);
            window.location.reload(); // Reload page after product removal

        } catch (error) {
            navigate("/login"); // Redirect to login if there is an error (e.g., user not authenticated)
            console.error(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            setUserID(user._id);
        } else {
            navigate("/login"); // Redirect to login if user data is not found in localStorage
        }
    }, [navigate]);

    return (
        <tr>
            <td onClick={removeProduct} className="hoverPointer"><MdOutlineCancel /></td>
            <td>
                <img
                    className="hoverPointer"
                    onClick={navigateToProduct}
                    src={`${process.env.PUBLIC_URL}/uploads/${product.imageFilePath || "no-img.png"}`}
                    alt="product"
                />
            </td>
            <td>{product.model} {product.category}</td>
            <td>
                {product.seller} <BsTelephoneFill /> {product.contact}
            </td>
            <td>
                <span><LuIndianRupee /></span> {product.price}
            </td>
        </tr>
    );
}

function Table({ list, heading }) {
    return (
        <section id="wish-list" className="section-p1">
            <div className="proHead">
                <h2>{heading}</h2>
            </div>
            {list.length === 0 ? (
                <div className="section-p1 center">
                    <img
                        alt="Empty wishlist"
                        src={`${process.env.PUBLIC_URL}/images/empty_wishList.png`}
                    />
                    <br />
                    <strong>There is nothing in your wish list</strong>
                    <p>Let's add some items</p>
                    <Link to="/allproduct" className="normal removeDecoration">ADD ITEMS</Link>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <td>Remove</td>
                            <td>Image</td>
                            <td>Product</td>
                            <td>Seller Details</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((product) => (
                            <TableRow key={product._id} product={product} />
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export default Table;
