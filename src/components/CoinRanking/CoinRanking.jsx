import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoinRankingRow from './CoinRankingRow/CoinRankingRow';

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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex h-[1.30rem] w-[1.30rem] items-center justify-center"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd"
                        />
                    </svg>

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
