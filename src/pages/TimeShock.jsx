import React, { useState, useEffect, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import timeShockText from "../images/timeShockText.png";
import timeShockTimer from "../videos/timeShockTimer.mp4";
import { quizData } from '../db';

const Timeshock = ({ settings }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isQuizOver, setIsQuizOver] = useState(false);
    const [showText, setShowText] = useState(false);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const [username, setUsername] = useState('');
    const videoRef = useRef(null);

    useEffect(() => {
        const filteredQuestions = quizData.filter(
            (q) => q.category === settings.category && q.level === settings.level
        );
        setQuestions(filteredQuestions);
    }, [settings]);

    useEffect(() => {
        setUsername(settings.username);
    }, [settings.username]);

    const startQuestionCycle = useCallback(() => {
        let questionCount = 0;

        const loadNextQuestion = () => {
            if (questionCount < 12) {
                questionCount++;
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setIsAnswerVisible(false);
                setShowText(false);

                setTimeout(() => {
                    setShowText(true);
                    setTimeout(() => {
                        setIsAnswerVisible(true);
                        setTimeout(loadNextQuestion, 250);
                    }, 4500);
                }, 250);
            } else {
                setIsQuizOver(true);
            }
        };

        loadNextQuestion();
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const handlePlay = () => {
                setTimeout(startQuestionCycle, 3020);
                videoElement.removeEventListener('play', handlePlay);
            };
            videoElement.addEventListener('play', handlePlay);
        }
    }, [startQuestionCycle]);

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

            <img src={timeShockText} alt="failure" style={{ ...stylePosition, zIndex: 3 }} />

            {isQuizOver ? (
                <div>
                    <h2>Quiz Over!</h2>
                    <p>Your final score is: {score}</p>
                </div>
            ) : (
                <>
                    {questions.length === 0 || !currentQuestion ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            {showText && (
                                <>
                                    <div style={styleQuiz}>{currentQuestion.question}</div>
                                    <div style={styleScore}>{score}</div>
                                    <div style={styleUser}>{username}</div>
                                </>
                            )}

                            {isAnswerVisible && (
                                <div style={styleAnswer}>{currentQuestion.answer}</div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Timeshock;
