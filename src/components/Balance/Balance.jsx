import React, { useContext, useState, useEffect } from 'react';
import { MinCoin } from '../../components';
import { userContext } from '../../context/userContext';
import { tokenContext } from '../../context/tokenContext';

const Balance = () => {
    const token = useContext(tokenContext);
    const user = useContext(userContext);

    const [userCoins, setUserCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [coinsFiltered, setCoinsFiltered] = useState([]);

    // esto obviamente después lo sacaríamos del usuario que recibe el componente
    const USER_COINS = [
        { token: 'lucascoin', quantity: '5' },
        { token: 'gonzacoin', quantity: '7' },
        { token: 'juanbit', quantity: '3' },
    ];

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
        <div className="mt-8 flex w-8/12 lg:w-full flex-col text-white">
            <div className="relative max-h-screen overflow-x-auto rounded-lg">
                <table className="w-full">
                    <thead className="bg-secondary text-xs uppercase text-white lg:text-base">
                        <tr>
                            {['Moneda', 'Balance', '', ''].map((title, index) => (
                                <td className="whitespace-nowrap py-3 px-6 font-semibold" key={index}>
                                    {title}
                                </td>
                            ))}
                         
                        </tr>
                    </thead>
                    <tbody>
                    {USER_COINS.map((coin, index) => (
                                <MinCoin coin={coin} key={index}/>
                            ))} 
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Balance;
