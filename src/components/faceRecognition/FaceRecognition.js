import React from 'react';

const FaceRecognition = (props) => {

    return(
        <div className="FaceRecognition pt3 flex justify-center">
            <div className="absolute">

                <img id="faceImg" alt=" " src={props.imgUrl} height="auto" width="500px" />
                <div className="bounding-box" style={{
                    top: props.box.topRow,
                    bottom: props.box.bottomRow,
                    left: props.box.leftColumn,
                    right: props.box.rightColumn
                }}>

                </div>
            </div>
        </div>
    )
}

export default FaceRecognition;