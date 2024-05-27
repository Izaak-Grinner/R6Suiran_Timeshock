import React, { useState, useEffect, useCallback } from 'react';
import { quizData } from '../db'; // クイズデータが保存されているデータベースをインポート

const Timeshock = ({ settings }) => {
    const [questions, setQuestions] = useState([]); // クイズの問題を保持するステート
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 現在の問題のインデックス
    const [score, setScore] = useState(0); // ユーザーのスコアを保持するステート
    const [timeLeft, setTimeLeft] = useState(5); // 制限時間を保持するステート (秒単位)
    const [isQuizOver, setIsQuizOver] = useState(false); // クイズ終了フラグ

    // クイズデータの取得と設定
    useEffect(() => {
        const filteredQuestions = quizData.filter(
            (q) => q.category === settings.category && q.level === settings.level
        );
        setQuestions(filteredQuestions);
    }, [settings]);

    // 次の質問を読み込む関数
    const loadNextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setTimeLeft(5); // 問題が切り替わったら制限時間をリセットする
        } else {
            setIsQuizOver(true);
        }
    }, [currentQuestionIndex, questions.length]);

    // タイマーを管理するeffect
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

    // ユーザーが回答を選択したときに呼び出される関数
    const handleAnswer = () => {
        if (questions[currentQuestionIndex].answer === 'true') {
            setScore((prev) => prev + 1);
        }
        loadNextQuestion();
    };

    // currentQuestionがnullの場合、ローディング表示
    if (questions.length === 0 || !questions[currentQuestionIndex]) {
        return <div>Loading...</div>;
    }

    // クイズが終了した場合の表示
    if (isQuizOver) {
        return (
            <div>
                <h2>Quiz Over!</h2>
                <p>Your final score is: {score}</p>
            </div>
        );
    }

    // 現在の問題
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h2>Question: {currentQuestion.question}</h2>
            <button onClick={handleAnswer}>True</button>
            <div>Score: {score}</div>
            <div>Time Left: {timeLeft}</div>
        </div>
    );
};

export default Timeshock;
