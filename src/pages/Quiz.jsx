import React, { useState } from 'react';
import Setting from './Setting';
import Timeshock from './TimeShock';

const Quiz = () => {
    const [settings, setSettings] = useState(null);

    const handleStart = (settings) => {
        setSettings(settings);
    };

    return (
        <div>
            {!settings ? (
                <Setting onStart={handleStart} />
            ) : (
                <Timeshock settings={settings} />
            )}
        </div>
    );
};

export default Quiz;