// src/components/Setting.jsx
import React, { useState } from 'react';

const Setting = ({ onStart }) => {
    const [username, setUsername] = useState('');
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');

    const handleStart = () => {
        onStart({ username, category, level });
    };

    return (
        <div>
            <center>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <div>
                    <span>Category:</span>
                    <label>
                        <input
                            type="radio"
                            value="math"
                            checked={category === 'math'}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        Math
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="science"
                            checked={category === 'science'}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        Science
                    </label>
                    {/* 他のカテゴリーを追加可能 */}
                </div>
                <div>
                    <span>Level:</span>
                    <label>
                        <input
                            type="radio"
                            value="easy"
                            checked={level === 'easy'}
                            onChange={(e) => setLevel(e.target.value)}
                        />
                        Easy
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="medium"
                            checked={level === 'medium'}
                            onChange={(e) => setLevel(e.target.value)}
                        />
                        Medium
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="hard"
                            checked={level === 'hard'}
                            onChange={(e) => setLevel(e.target.value)}
                        />
                        Hard
                    </label>
                </div>
                <button onClick={handleStart}>Start</button>
            </center>
        </div>
    );
};

export default Setting;
