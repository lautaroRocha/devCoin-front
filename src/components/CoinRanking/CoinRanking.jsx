import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoinRankingRow from './CoinRankingRow/CoinRankingRow';
import * as Icons from '../../utils/icons';

const CoinRanking = () => {
    const [coins, setCoins] = useState([]);
    const urlCoins =
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
    const [search, setSearch] = useState('');
    const [coinsFiltered, setCoinsFiltered] = useState([]);

    const AxiosCoins = () => {
        axios.get(urlCoins).then((res) => setCoins(res.data));
    };

    useEffect(() => {
        AxiosCoins();
    }, []);

    const Filter = () => {
        let coinsFiltered = coins.filter((coin) => {
            if (
                coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
            ) {
                return coin;
            }
        });
        setCoinsFiltered(coinsFiltered);
    };

    return (
        <>
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
                <h1 className="text-3xl font-bold">Monedas</h1>
                <div className="flex items-center rounded-md bg-secondary/80 py-2 pl-4 text-white max-md:w-full md:w-[20rem]">
                    {Icons.search}
                    <input
                        type="search"
                        className="w-full bg-secondary/0 py-2 px-2 focus:outline-none"
                        placeholder="Buscar..."
                        onChange={(event) => {
                            setSearch(event.target.value);
                            Filter();
                        }}
                    />
                </div>
            </div>

            <div className="relative max-h-screen overflow-x-auto rounded-lg">
                <table className="w-full">
                    <thead className="bg-primary/90 text-xs font-bold uppercase text-white lg:text-base">
                        <tr>
                            {['Moneda', 'Precio', 'Cambio de Precio', 'Volumen 24h'].map(
                                (title, index) => (
                                    <td className="whitespace-nowrap py-3 px-6" key={index}>
                                        {title}
                                    </td>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {search === ''
                            ? coins.map((coin, index) => (
                                  <CoinRankingRow
                                      key={index}
                                      id={coin.id}
                                      symbol={coin.symbol}
                                      name={coin.name}
                                      image={coin.image}
                                      price={coin.current_price}
                                      priceChange={coin.price_change_percentage_24h}
                                      volume24h={coin.total_volume}
                                  />
                              ))
                            : coinsFiltered.map((coin, index) => (
                                  <CoinRankingRow
                                      key={index}
                                      id={coin.id}
                                      symbol={coin.symbol}
                                      name={coin.name}
                                      image={coin.image}
                                      price={coin.current_price}
                                      priceChange={coin.price_change_percentage_24h}
                                      volume24h={coin.total_volume}
                                  />
                              ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CoinRanking;
