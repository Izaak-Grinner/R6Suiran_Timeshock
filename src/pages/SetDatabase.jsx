//import React, { useRef, useEffect } from 'react';
//import Webcam from 'react-webcam';

const VideoOverlay = () => {


    return (
        <div>
            <video width='100%' controls>
                <source src='../timeShockTimer.mp4' type='video/mp4' />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoOverlay;
