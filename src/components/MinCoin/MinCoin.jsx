import React from 'react';

const MinCoin = ({coin, idx}) => {
    return (
        <div key={idx} className="flex  bg-secondary dark:bg-secondary/90 justify-center rounded-lg items-center py-7 w-full font-bold text-center" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 w-1/4 ">
<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
</svg>
         <div className="flex flex-col items-center justify-center text-center px-1 md:flex-row md:gap-3"> 
        <span className=''>{coin.token}</span>
        <span className=''>{coin.quantity}</span>
        </div>  
        {/* acá se calcularía el valor en pesos/dolares  */}
        <span className='w-1/4'>$750</span>
     </div>
    );
}

export default MinCoin;