import React from "react";

const LinkInput = (props) => {

    return(
        <div className="LinkInput flex justify-center">
            <input className="w-40 pa3" value={props.linkInput} onChange={props.handleChange} placeholder="Image link here..." />
            <button className="pl4 pr4 b dim purple bg-grey pointer bn" onClick={props.onSubmit} >Detect</button>          
        </div>
    )
}

export default LinkInput;