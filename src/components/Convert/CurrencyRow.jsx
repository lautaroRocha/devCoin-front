import React from 'react'

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangedCurrency,
        onChangeAmount,
        amount
    } = props
  
    return (
    <div>
       <input type="number" className='input' value={amount} onChange={onChangeAmount}/>
       
       <select value={selectedCurrency} onChange={onChangedCurrency}>
        {currencyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
        ))}
       </select>
    </div>
  )
}

/*
body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
}

h1 {
    margin: 0;
    margin-bottom: .5rem;
}


.input {
    border: 1px solid #333;
    border-radius: .3em;
    padding: .25rem;
    width: 7em;
}

select {
    margin-left: .5rem;
}

.equals {
    font-weight: bold;
    font-size: 2rem;
}
*/