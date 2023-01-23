import React, { useEffect, useState} from 'react';
import { AppWrap } from '../../wrapper';

//api.frankfurter.app
//api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false


function ConvertPage() {
    const [monedas, setMonedas] = useState([]);
    const [moneda1, setMoneda1] = useState();
    const [moneda2, setMoneda2] = useState();
    const [monto, setMonto] = useState(undefined);
    const [result, setResult] = useState(undefined);
  
    useEffect(() => {
      const host = 'api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
      fetch(`https://${host}/currencies`)
        .then((resp) => resp.json())
        .then((data) => {
          setMonedas(data);
        });
    }, []);
  
    useEffect(() => {
      setMonto('')
      setResult('')
    }, [moneda1, moneda2])
  
  const handleConvert = () => {
        setResult(moneda1 / moneda2 )
    };
  
    return (
      <div className="background">
        <div className="container">
          <div className="selects-container">
            <select
              value={moneda1}
              name="moneda-1"
              id="moneda-1"
              onChange={(e) => setMoneda1(e.target.value)}
            >
              {monedas.map((moneda) => (
                <option value={moneda.current_price}>{moneda.symbol}</option>
              ))}
            </select>
            <select
              value={moneda2}
              name="moneda-2"
              id="moneda-2"
              onChange={(e) => setMoneda2(e.target.value)}
            >
              {monedas.map((moneda) => (
                <option value={moneda.current_price}>{moneda.symbol}</option>
              ))}
            </select>
          </div>
          <div className="inputs-container">
            <input
              className=""
              type="text"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
            <p className=""> RESULTADO: {result}</p>
          </div>
          <div>
            <button onClick={handleConvert}>Convertir</button>
          </div>
        </div>
      </div>
    );
  }

export default AppWrap(ConvertPage);
