import React from 'react';

const AppWrap = (Component) =>
    function HOC() {
        return (
            <div>
                <Component />
            </div>
        );
    };


export default AppWrap;
