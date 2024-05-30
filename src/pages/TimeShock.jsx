import React, { useState, useEffect, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import timeShockText from "../images/timeShockText.png";
import timeShockTimer from "../videos/timeShockTimer.mp4";
import { quizData } from '../db';

const Timeshock = ({ settings }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5);
    const [isQuizOver, setIsQuizOver] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [showText, setShowText] = useState(false);
    const videoRef = useRef(null);
    const DISPLAY_DELAY = 3500;

    useEffect(() => {
        const filteredQuestions = quizData.filter(
            (q) => q.category === settings.category && q.level === settings.level
        );
        setQuestions(filteredQuestions);
    }, [settings]);

    const loadNextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setTimeLeft(5);
        } else {
            setIsQuizOver(true);
        }
    }, [currentQuestionIndex, questions.length]);

    useEffect(() => {
        if (timeLeft <= 0) {
            loadNextQuestion();
        } else {
            const timerId = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [timeLeft, loadNextQuestion]);

    /*const handleAnswer = () => {
        setScore((prev) => prev + 1);
        loadNextQuestion();
    };*/

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const handlePlay = () => {
                setTimeout(() => {
                    setShowImage(true);
                    setTimeout(() => {
                        setShowText(true);
                    }, 500);
                }, DISPLAY_DELAY);
            };

            videoElement.addEventListener('play', handlePlay);

            return () => {
                videoElement.removeEventListener('play', handlePlay);
            };
        }
    }, []);

    const currentQuestion = questions[currentQuestionIndex];

    const styleShow = {
        position: 'relative',
        width: '100%',
        height: '100vh',
    };

    const stylePosition = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
    };

    const webcamContainer = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '59%',
        height: '54%',
        overflow: 'hidden',
        borderRadius: '42%',
        zIndex: 2,
    };

    const webcamStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
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

    return (
        <div className="showQuiz" style={styleShow}>
            <video autoPlay style={{ ...stylePosition, zIndex: 1 }} ref={videoRef}>
                <source src={timeShockTimer} type='video/mp4' />
                Your browser does not support the video tag.
            </video>

            <div style={webcamContainer}>
                <Webcam style={webcamStyle} />
            </div>

            {questions.length === 0 || !currentQuestion ? (
                <div>Loading...</div>
            ) : isQuizOver ? (
                <div>
                    <h2>Quiz Over!</h2>
                    <p>Your final score is: {score}</p>
                </div>
            ) : (
                <>
                    {showImage && <img src={timeShockText} alt="failure" style={{ ...stylePosition, zIndex: 3 }} />}

                    {showText && (
                        <>
                            <div style={styleQuiz}>{currentQuestion.question}</div>
                            <div style={styleScore}>{score}</div>
                            <div style={styleAnswer}>{currentQuestion.answer}</div>
                            <div style={styleUser}>{settings.username}</div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Timeshock;
