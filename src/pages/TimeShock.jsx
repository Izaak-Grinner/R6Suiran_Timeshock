import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Webcam from 'react-webcam';
import timeShockText from "../images/timeShockText.png";
import timeShockTimer from "../videos/timeShockTimer.mp4";
import easy0 from "../audio/easy0.mp3";
import easy1 from "../audio/easy1.mp3";
import easy2 from "../audio/easy2.mp3";
import easy3 from "../audio/easy3.mp3";
import normal0 from "../audio/normal0.mp3";
import normal1 from "../audio/normal1.mp3";
import normal2 from "../audio/normal2.mp3";
import normal3 from "../audio/normal3.mp3";
import hard0 from "../audio/hard0.mp3";
import hard1 from "../audio/hard1.mp3";
import hard2 from "../audio/hard2.mp3";
import hard3 from "../audio/hard3.mp3";

import { Client, Storage } from "appwrite";
import Papa from 'papaparse';
import { dbID } from '../appwrite';
import { useKey } from 'react-use';

const Timeshock = ({ settings }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isQuizOver, setIsQuizOver] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showAudio, setShowAudio] = useState(false);
    const [username, setUsername] = useState('');
    const [files, setFiles] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const videoRef = useRef(null);

    useKey('ArrowDown', () => setScore((prevScore) => prevScore - 1));
    useKey('ArrowUp', () => setScore((prevScore) => prevScore + 1));

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
    }, [files, settings.level, settings.type]);

    useEffect(() => {
        setUsername(settings.username);
    }, [settings.username]);

    const easyRefs = useMemo(() => [
        new Audio(easy0),
        new Audio(easy1),
        new Audio(easy2),
        new Audio(easy3),
    ], []);

    const normalRefs = useMemo(() => [
        new Audio(normal0),
        new Audio(normal1),
        new Audio(normal2),
        new Audio(normal3),
    ], []);

    const hardRefs = useMemo(() => [
        new Audio(hard0),
        new Audio(hard1),
        new Audio(hard2),
        new Audio(hard3),
    ], []);

    const audioRefs = useMemo(() => ({
        easy: easyRefs,
        normal: normalRefs,
        hard: hardRefs,
    }), [easyRefs, normalRefs, hardRefs]);

    const startQuestionCycle = useCallback(() => {
        let questionCount = 0;

        const loadNextQuestion = () => {
            if (questionCount < 13 && questionCount < questions.length) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                questionCount++;

                setTimeout(() => {
                    setShowText(true);
                    setShowAudio(true);

                    setTimeout(loadNextQuestion, 4990);
                }, 10);
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
                setTimeout(startQuestionCycle, 3600);
                videoElement.removeEventListener('play', handlePlay);
            };
            videoElement.addEventListener('play', handlePlay);
        }
    }, [startQuestionCycle, isDataLoaded]);

    const playAudio = useCallback(() => {
        if (showAudio) {
            setTimeout(() => {
                try {
                    const levelRefs = audioRefs[settings.level];
                    const typeIndex = parseInt(settings.type, 10);
                    const audioRef = levelRefs[typeIndex];

                    audioRef.play().catch(error => {
                        console.error("Audio playback failed: ", error);
                        if (audioRef.context && audioRef.context.state === 'suspended') {
                            audioRef.context.resume().then(() => {
                                audioRef.play();
                            });
                        }
                    });
                } catch (error) {
                    console.error("Error in playing audio:", error);
                }
            }, 10);
        }
    }, [showAudio, audioRefs, settings.level, settings.type]);

    useEffect(() => {
        playAudio();
    }, [showAudio, playAudio]);

    const currentQuestion = questions[currentQuestionIndex];
    console.log("Current Question Index:", currentQuestionIndex);
    console.log("Current Question:", currentQuestion);

    const styleShow = {
        position: 'relative',
        width: '100%',
        aspectRatio: 16 / 9
    };

    const stylePosition = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
    };

    const webcamContainer = {
        position: 'absolute',
        top: '41%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '59%',
        height: '55%',
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
        fontSize: '3em',
        textAlign: 'left',
        bottom: '6%',
        left: '13%'
    };

    const styleLastScore = {
        zIndex: 5
    };

    const styleUser = {
        ...textStyle,
        fontSize: '4em',
        bottom: '33%',
        left: '43%',
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
                                    <div style={styleUser}>{username}</div>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Timeshock
