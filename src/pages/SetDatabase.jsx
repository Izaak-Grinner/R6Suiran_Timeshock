//import React, { useRef, useEffect } from 'react';
//import Webcam from 'react-webcam';
import timeShockText from "../images/timeShockText.png";
//import timeShockCamback from "../images/timeShockCamback.png";
import timeShockTimer from "../videos/timeShockTimer.mp4";

const VideoOverlay = () => {
    const styleShow = {
        position: 'relative',
    };

    const stylePosition = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        width: '100%'
    };


    return (
        <div>
            <div className="showQuiz" style={styleShow}>
                <video autoPlay style={stylePosition}>
                    <source src={timeShockTimer} type='video/mp4' />
                    Your browser does not support the video tag.
                </video>

                <img src={timeShockText} alt="failure" style={stylePosition} />


            </div>
        </div>
    );
};

export default VideoOverlay;
