import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import timeShockText from "../images/timeShockText.png";
import timeShockTimer from "../videos/timeShockTimer.mp4";

const VideoOverlay = () => {
    const [showImage, setShowImage] = useState(false);
    const [showText, setShowText] = useState(false);
    const videoRef = useRef(null);
    const DISPLAY_DELAY = 3500; // 遅延時間をミリ秒で指定

    const quiz = "ASMR Yshirt ?";
    const score = "11";
    const answer = "あいうえおかきくけこさしすせそ";
    const user = 'yasu';

    const styleShow = {
        position: 'relative',
        width: '100%',
        height: '100vh', // 画面全体をカバーする
    };

    const stylePosition = {
        position: 'absolute',
        buttom: 0,
        left: 0,
        width: '100%',
        zIndex: 1,
    };

    const webcamContainer = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // 中央に配置するためのトランスフォーム
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '59%', // 必要に応じて調整
        height: '54%', // 必要に応じて調整
        overflow: 'hidden',
        borderRadius: '42%', // 丸い枠を作成
        zIndex: 2,
    };

    const webcamStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover', // 映像を枠にフィットさせる
    };

    const textStyle = {
        position: 'absolute',
        color: 'black',
        zIndex: 4,

    };

    const styleQuiz = {
        ...textStyle,
        fontSize: '7em',
        bottom: '8%',
        right: '35%'
    };

    const styleScore = {
        ...textStyle,
        fontSize: '10em',
        bottom: '41%',
        right: '26%'


    };

    const styleAnswer = {
        ...textStyle,
        fontSize: '4em',
        top: '25%',
        right: '22.5%',
        width: '15%',
        overflowWrap: 'break-word',
        lineHeight: '1.2em'

    };

    const styleUser = {
        ...textStyle,
        fontSize: '7em',
        bottom: '35%',
        right: '45%',
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const handlePlay = () => {
                setTimeout(() => {
                    setShowImage(true);
                    setTimeout(() => {
                        setShowText(true);
                    }, 500); // 画像が表示されてから少し遅れてテキストを表示
                }, DISPLAY_DELAY);
            };

            videoElement.addEventListener('play', handlePlay);

            // コンポーネントのアンマウント時にイベントリスナーをクリーンアップ
            return () => {
                videoElement.removeEventListener('play', handlePlay);
            };
        }
    }, []);

    return (
        <div className="showQuiz" style={styleShow}>
            <video autoPlay style={stylePosition} ref={videoRef}>
                <source src={timeShockTimer} type='video/mp4' />
                Your browser does not support the video tag.
            </video>

            <div style={webcamContainer}>
                <Webcam style={webcamStyle} />
            </div>

            {showImage && <img src={timeShockText} alt="failure" style={{ ...stylePosition, zIndex: 3 }} />}

            {showText && (
                <>
                    <div style={styleQuiz}>{quiz}</div>
                    <div style={styleScore}>{score}</div>
                    <div style={styleAnswer}>{answer}</div>
                    <div style={styleUser}>{user}</div>
                </>
            )}
        </div>
    );
};

export default VideoOverlay;
