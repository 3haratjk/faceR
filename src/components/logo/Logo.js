import React from 'react';

import Tilt from 'react-tilt'



const Logo = () => {
    return(
        <div className="Logo flex justify-start items-center ma3 w-5">
            <Tilt className="Tilt pa2 bg-navy white item-center br2 shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pt2  "><h3>faceR</h3></div>
            </Tilt>
        </div>
    )
}

export default Logo;