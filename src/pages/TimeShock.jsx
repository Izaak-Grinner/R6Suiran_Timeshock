import React, { useState, useEffect, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import timeShockText from "../images/timeShockText.png";
import timeShockTimer from "../videos/timeShockTimer.mp4";
import { Client, Storage } from "appwrite";
import Papa from 'papaparse';
import { dbID } from '../appwrite';
import { useKey } from 'react-use';

import easy0 from "../music/easy0.mp3";
import easy1 from "../music/easy1.mp3";
import easy2 from "../music/easy2.mp3";
import easy3 from "../music/easy3.mp3";
import normal0 from "../music/normal0.mp3";
import normal1 from "../music/normal1.mp3";
import normal2 from "../music/normal2.mp3";
import normal3 from "../music/normal3.mp3";
import hard0 from "../music/hard0.mp3";
import hard1 from "../music/hard1.mp3";
import hard2 from "../music/hard2.mp3";
import hard3 from "../music/hard3.mp3";

const Timeshock = ({ settings }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isQuizOver, setIsQuizOver] = useState(false);
    const [showText, setShowText] = useState(false);
    //const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [files, setFiles] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef(new Audio());

    const decrement = () => {
        setScore((prevIndex) => prevIndex - 1);
    };

    const increment = () => {
        setScore((prevIndex) => prevIndex + 1);
    };

    useKey('ArrowDown', decrement);
    useKey('ArrowUp', increment);

    useEffect(() => {
        const fetchFiles = async () => {
            const client = new Client()
                .setEndpoint(dbID.endpoint)
                .setProject(dbID.project);

            const storage = new Storage(client);

            try {
                const result = await storage.listFiles(dbID.bucket);
                setFiles(result.files);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        fetchFiles();
    }, []);

    useEffect(() => {
        const fetchLatestCSVData = async () => {
            if (files.length > 0) {
                const latestFile = files.reduce((latest, file) => {
                    return new Date(file.$createdAt) > new Date(latest.$createdAt) ? file : latest;
                });

                try {
                    const client = new Client()
                        .setEndpoint(dbID.endpoint)
                        .setProject(dbID.project);

                    const storage = new Storage(client);
                    const fileURL = storage.getFileView(dbID.bucket, latestFile.$id).href;

                    const response = await fetch(fileURL);
                    const blob = await response.blob();

                    const reader = new FileReader();
                    reader.onload = () => {
                        const csvText = reader.result;
                        Papa.parse(csvText, {
                            header: false,
                            complete: (results) => {
                                const csvQuestions = results.data;
                                console.log("Parsed CSV Questions:", csvQuestions);
                                const filteredQuestions = csvQuestions.filter(
                                    (q) => q[0] === settings.type.toString() && q[1] === settings.level.toString()
                                );
                                setQuestions(filteredQuestions);
                                setIsDataLoaded(true);
                                videoRef.current.play();
                            }
                        });
                    };
                    reader.readAsText(blob);

                } catch (error) {
                    console.error("Error fetching or parsing CSV file:", error);
                }
            }
        };

        fetchLatestCSVData();
    }, [files, settings.level, settings.type]);  // Add dependencies here

    useEffect(() => {
        setUsername(settings.username);
    }, [settings.username]);

    const startQuestionCycle = useCallback(() => {
        let questionCount = 0;

        const loadNextQuestion = () => {
            if (questionCount < 13 && questionCount < questions.length) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                questionCount++;
                //setIsAnswerVisible(false);
                setShowText(false);

                setTimeout(() => {
                    setShowText(true);
                    setTimeout(() => {
                        // setIsAnswerVisible(true);
                        setTimeout(loadNextQuestion, 250);
                    }, 4500);
                }, 250);
            } else {
                setIsQuizOver(true);
                console.log("Quiz Over");
            }
        };

        loadNextQuestion();
    }, [questions]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement && isDataLoaded) {
            const handlePlay = () => {
                setTimeout(startQuestionCycle, 3020);
                videoElement.removeEventListener('play', handlePlay);
            };
            videoElement.addEventListener('play', handlePlay);
        }
    }, [startQuestionCycle, isDataLoaded]);

    useEffect(() => {
        if (showText) {
            // 設定に基づいて音声を選択
            let sound;
            if (settings.level === 'easy') {
                if (settings.type === '0') {
                    sound = easy0; // 特定のeasy音声を選択するロジックに置き換えてください
                } else if (settings.type === '1') {
                    sound = easy1; // 特定のnormal音声を選択するロジックに置き換えてください
                } else if (settings.type === '2') {
                    sound = easy2; // 特定のhard音声を選択するロジックに置き換えてください
                } else if (settings.type === '3') {
                    sound = easy3; // 特定のhard音声を選択するロジックに置き換えてください
                }
            } else if (settings.level === 'normal') {
                if (settings.type === '0') {
                    sound = normal0; // 特定のeasy音声を選択するロジックに置き換えてください
                } else if (settings.type === '1') {
                    sound = normal1; // 特定のnormal音声を選択するロジックに置き換えてください
                } else if (settings.type === '2') {
                    sound = normal2; // 特定のhard音声を選択するロジックに置き換えてください
                } else if (settings.type === '3') {
                    sound = normal3; // 特定のhard音声を選択するロジックに置き換えてください
                }
            } else if (settings.level === 'hard') {
                if (settings.type === '0') {
                    sound = hard0; // 特定のeasy音声を選択するロジックに置き換えてください
                } else if (settings.type === '1') {
                    sound = hard1; // 特定のnormal音声を選択するロジックに置き換えてください
                } else if (settings.type === '2') {
                    sound = hard2; // 特定のhard音声を選択するロジックに置き換えてください
                } else if (settings.type === '3') {
                    sound = hard3; // 特定のhard音声を選択するロジックに置き換えてください
                }
            }

            audioRef.current.src = sound;
            audioRef.current.play();
        }
    }, [showText, settings.level, settings.type]);  // settings.type を依存関係に追加


    const currentQuestion = questions[currentQuestionIndex];
    console.log("Current Question Index:", currentQuestionIndex);
    console.log("Current Question:", currentQuestion);

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
        top: '42.5%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '58%',
        height: '54%',
        overflow: 'hidden',
        borderRadius: '40%',
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
        fontSize: '5.5em',
        textAlign: 'left',
        bottom: '4%',
        left: '16%'
    };

    /*const styleScore = {
        ...textStyle,
        fontSize: '10em',
        bottom: '41%',
        right: '26%'
    };*/

    const styleLastScore = {
        zIndex: 5
    };

    /*const styleAnswer = {
        ...textStyle,
        fontSize: '4em',
        top: '26%',
        right: '22%',
        width: '15%',
        overflowWrap: 'break-word',
        lineHeight: '1.2em'
    };*/

    const styleUser = {
        ...textStyle,
        fontSize: '4em',
        bottom: '32%',
        right: '43%',
        textAlign: 'left'
    };

    return (
        <div className="showQuiz" style={styleShow}>
            <video style={{ ...stylePosition, zIndex: 1 }} ref={videoRef}>
                <source src={timeShockTimer} type='video/mp4' id="video" />
                Your browser does not support the video tag.
            </video>

            <div style={webcamContainer}>
                <Webcam style={webcamStyle} />
            </div>

            <img src={timeShockText} alt="failure" style={{ ...stylePosition, zIndex: 3 }} />

            {isQuizOver ? (
                <div>
                    <h2>Your final score is: {score}</h2>
                    <p style={styleLastScore}>Your final score is: {score}</p>
                </div>
            ) : (
                <>
                    {questions.length === 0 || !currentQuestion ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            {showText && (
                                <>
                                    <div style={styleQuiz}>{currentQuestion[2]}</div>
                                    {/*<div id="score" style={styleScore}>{score}</div>*/}
                                    <div style={styleUser}>{username}</div>
                                </>
                            )}

                            {/*

                            {isAnswerVisible && (
                                <div style={styleAnswer}>{currentQuestion[3]}</div>
                            )}
                        */}
                        </>
                    )}
                </>
            )}

            {/*<div>
                <h3>Fetched Files:</h3>
                <ul>
                    {files.map(file => (
                        <li key={file.$id}>{file.name}</li>
                    ))}
                </ul>
                </div>*/}
        </div>
    );
};

export default Timeshock;
