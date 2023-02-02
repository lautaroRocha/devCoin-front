import React from 'react';
import { CoinRanking, HomeBanners } from '../../components';
import { AppWrap } from '../../wrapper';

const HomePage = () => {

    return (
        <>
            <div className="flex h-full w-full flex-col gap-[4rem] sm:gap-y-[6rem] lg:gap-y-[8rem] lg:px-8">
                <HomeBanners />
                <div className="mt-[1rem] flex flex-col gap-4">
                    <CoinRanking />
                </div>
            </div>
        </>
    );
};

export default AppWrap(HomePage);
