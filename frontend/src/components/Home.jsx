import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import {BrowserRouter,Routes,Route} from "react-router-dom";
import Header from "./Header";
import Grid from "./Grid";
// import { cardsList } from "./data";
import Footer from "./Footer";
import Feature from "./Feature";
import Prohead from './Prohead';
import Loader from './Loader';
function Home() {
    const [products, setProducts] = useState([]);
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recentproducts`)
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
            <Feature />
            <Prohead heading="Recent Deal" />
            {!flag ? <Loader /> :
                <Grid prodList={products} />}
            <Footer />
        </div>
    )
}
export default Home;