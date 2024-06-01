import React, { useState } from 'react';

const Setting = ({ onStart }) => {
    const [username, setUsername] = useState('');
    const [level, setLevel] = useState('');
    const [type, setType] = useState(0);

    const handleStart = () => {
        onStart({ username, level, type });
    };

    const containerStyle = {
        width: '50%',
        fontSize: '2em',
        margin: '0 auto',
        textAlign: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px'
    };

    const inputStyle = {
        fontSize: '1em',
        margin: '10px 0',
        padding: '10px',
        width: '100%'
    };

    const labelStyle = {
        fontSize: '2em',
        margin: '10px',
        display: 'block'
    };

    const radioStyle = {
        transform: 'scale(2)',
        margin: '0 10px'
    };

    const buttonStyle = {
        fontSize: '2em',
        padding: '10px 20px',
        marginTop: '20px',
        cursor: 'pointer'
    };

    const radioContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div style={containerStyle}>
            <div>
                <label style={labelStyle}>
                    挑戦者
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                    />
                </label>
            </div>
            <div>
                <span style={labelStyle}>難易度:</span>
                <div>
                    <label style={labelStyle}>
                        <input
                            type="radio"
                            value="easy"
                            checked={level === 'easy'}
                            onChange={(e) => setLevel(e.target.value)}
                            style={radioStyle}
                        />
                        Easy
                    </label>
                    <label style={labelStyle}>
                        <input
                            type="radio"
                            value="medium"
                            checked={level === 'medium'}
                            onChange={(e) => setLevel(e.target.value)}
                            style={radioStyle}
                        />
                        Medium
                    </label>
                    <label style={labelStyle}>
                        <input
                            type="radio"
                            value="hard"
                            checked={level === 'hard'}
                            onChange={(e) => setLevel(e.target.value)}
                            style={radioStyle}
                        />
                        Hard
                    </label>
                </div>
            </div>
            <div>
                <span style={labelStyle}>タイプ:</span>
                <div style={radioContainerStyle}>
                    <label style={labelStyle}>
                        <input
                            type="radio"
                            value={0}
                            checked={type === 0}
                            onChange={(e) => setType(Number(e.target.value))}
                            style={radioStyle}
                        />
                        0
                    </label>
                    <label style={labelStyle}>
                        <input
                            type="radio"
                            value={1}
                            checked={type === 1}
                            onChange={(e) => setType(Number(e.target.value))}
                            style={radioStyle}
                        />
                        1
                    </label>
                    <label style={labelStyle}>
                        <input
                            type="radio"
                            value={2}
                            checked={type === 2}
                            onChange={(e) => setType(Number(e.target.value))}
                            style={radioStyle}
                        />
                        2
                    </label>
                    <label style={labelStyle}>
                        <input
                            type="radio"
                            value={3}
                            checked={type === 3}
                            onChange={(e) => setType(Number(e.target.value))}
                            style={radioStyle}
                        />
                        3
                    </label>
                </div>
            </div>
            <button onClick={handleStart} style={buttonStyle}>挑む</button>
        </div>
    );
};

export default Setting;
