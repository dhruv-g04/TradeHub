import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./Header";
import Grid from "./Grid";
import Footer from "./Footer";
import Loader from './Loader';
import Prohead from './Prohead';

function AllProduct() {
    const [products, setProducts] = useState([]);
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
            .then((response) => {
                setFlag(true);
                setProducts(response.data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div id="box">
            <Header />
            <Prohead heading="All Products" />
            {!flag ? <Loader /> :
                <Grid prodList={products} />}
            <Footer />
        </div>
    )
}
export default AllProduct;