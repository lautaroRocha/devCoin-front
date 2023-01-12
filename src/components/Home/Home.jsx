import React from 'react';
import {MinBalance, CoinRanking} from "../../components"

const Home = () => {
    return (
        <div>
            <h1>Bienvenido a DEVCOIN</h1>
            <CoinRanking />
            <MinBalance />
        </div>
    );
}

export default Home;
