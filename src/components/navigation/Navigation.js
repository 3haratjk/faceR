import React from 'react';


const Navigation = (props) => {
    
    return(
        <div className = "Navigation flex justify-end">
            <p className = "f4 underline link dim pa3 pointer  white" onClick={props.handleAuth} >Sign out</p>
        </div>
    )
}

export default Navigation;