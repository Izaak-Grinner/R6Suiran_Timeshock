import React, { useState, useEffect, useCallback } from 'react';
import { quizData } from '../db'; // クイズデータが保存されているデータベースをインポート

const Timeshock = ({ settings }) => {
    const [currentQuestion, setCurrentQuestion] = useState(null); // 現在の質問を保持するステート
    const [score, setScore] = useState(0); // ユーザーのスコアを保持するステート
    const [timeLeft, setTimeLeft] = useState(60); // 制限時間を保持するステート (秒単位)
    const [isQuizOver, setIsQuizOver] = useState(false); // クイズ終了フラグ

    // 次の質問を読み込む関数
    const loadNextQuestion = useCallback(() => {
        const filteredQuestions = quizData.filter(
            (q) => q.category === settings.category && q.level === settings.level
        );
        console.log('Filtered Questions:', filteredQuestions); // デバッグ用
        if (filteredQuestions.length > 0) {
            const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
            setCurrentQuestion(randomQuestion);
            console.log('Random Question:', randomQuestion); // デバッグ用
        } else {
            setCurrentQuestion(null);
            console.log('No questions available for the selected category and level'); // デバッグ用
        }
    }, [settings]);

    // settingsが変更された時に実行されるeffect
    useEffect(() => {
        loadNextQuestion();
    }, [settings, loadNextQuestion]);

    // タイマーを管理するeffect
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsQuizOver(true);
        } else {
            const timerId = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [timeLeft]);

    // Trueボタンが押されたときに呼び出される関数
    const handleTrue = () => {
        if (currentQuestion) {
            setScore((prev) => prev + 1);
        }
        loadNextQuestion();
    };

    // スキップボタンが押されたときに呼び出される関数
    const handleSkip = () => {
        loadNextQuestion();
    };

    // currentQuestionがnullの場合、ローディング表示
    if (!currentQuestion && !isQuizOver) return <div>Loading...</div>;

    // クイズが終了した場合の表示
    if (isQuizOver) {
        return (
            <div>
                <h2>クイズ終了！</h2>
                <p>最終スコア: {score}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>質問: {currentQuestion.question}</h2>
            <button onClick={handleTrue}>True</button>
            <button onClick={handleSkip}>スキップ</button>
            <div>スコア: {score}</div>
            <div>残り時間: {timeLeft}</div>
        </div>
    );
};

export default Timeshock;