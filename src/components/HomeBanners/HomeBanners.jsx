import React, {useContext} from 'react';
import { sessionContext } from '../../context';
import { Link } from 'react-router-dom';

const HomeBanners = () => {

    const {user} = useContext(sessionContext)

    return (
        <>
        <div className="mt-[1rem] flex w-full flex-col items-center gap-[3rem] lg:mt-[4rem]">
            <div className="flex flex-col items-center gap-[3rem] lg:flex-row lg:items-start lg:gap-x-[8rem] 2xl:gap-x-[20rem]">
                <div className="flex flex-col gap-8 text-center lg:text-left">
                    <h1 className="text-3xl font-bold lg:text-5xl">
                        Dev Coin llego para quedarse!
                    </h1>
                    <p className="text-lg lg:text-xl">
                        Controla todas tus monedas, compra, vende y transfiere con Dev Coin!
                    </p>
                    <div className="flex w-full max-lg:justify-center">
                        <Link
                            to={`${user ? '/profile' : '/signup'}`}
                            className="buttons px-8"
                        >
                            Comenzar!
                        </Link>
                    </div>
                </div>
                <img
                    src="home-image1.svg"
                    alt="Controla tus monedas"
                    className="w-full min-w-[12rem] max-w-[25rem]"
                />
            </div>
        </div>
        <div className="flex w-full flex-col items-center gap-[4rem] lg:mt-8">
            <div className="flex flex-col items-center gap-[3rem] lg:flex-row-reverse lg:items-start lg:gap-x-[8rem] 2xl:gap-x-[10rem]">
                <div className="flex flex-col gap-8 text-center lg:text-left">
                    <h1 className="text-3xl font-bold lg:text-5xl">
                        Trasferencias rápidas y seguras!
                    </h1>
                    <p className="text-lg lg:text-xl">
                        En Dev Coin protegemos tus transferencias con la mejor tecnología!
                    </p>
                    <div className="flex w-full max-lg:justify-center">
                        <Link
                            to={`${user ? '/wallet' : '/signup'}`}
                            className="buttons px-8"
                        >
                            Empieza a transferir!
                        </Link>
                    </div>
                </div>
                <img
                    src="home-image3.svg"
                    alt="Controla tus monedas"
                    className="w-full min-w-[12rem] max-w-[25rem]"
                />
            </div>
        </div>
        </>
    );
}

export default HomeBanners;
