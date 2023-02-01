import React from 'react';

const AppWrap = (Component) =>
    function HOC({ ...props }) {
        return (
            <div className="float-right h-fit min-h-screen w-full pl-[6rem] pt-[1.5rem] pb-[1.5rem] pr-[2rem] xl:w-[85%] xl:pl-[2rem] 1700:w-[88%] ">
                <Component props={props} />
            </div>
        );
    };

export default AppWrap;
