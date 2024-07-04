import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./Header";
import Grid from "./Grid";
import Footer from "./Footer";

function AllProduct() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get("https://tradehub-backend.onrender.com/api/products")
            .then((response) => {
                setProducts(response.data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div id="box">
            <Header />
            <Grid heading="All Products" prodList={products} />
            <Footer />
        </div>
    )
}
export default AllProduct;