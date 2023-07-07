import { LOCAL_STORAGE_KEY_LOG, SERVER_URL } from './Constants';

export const log = (message) => {
    const logs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LOG)) || [];
    logs.push({
        timestamp: Date.now(),
        message
    });
    localStorage.setItem(LOCAL_STORAGE_KEY_LOG, JSON.stringify(logs));
};

const getLogs = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEY_LOG);
};

const clearLogs = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_LOG);
};

export const sendLogsToServerAndClear = async (video) => {
    try {
        const token = sessionStorage.getItem('token');
        const logs = getLogs();
        await fetch(SERVER_URL + '/logs', {
            method : 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type' : 'application/json',
            },
            body: JSON.stringify({ video, logs }),
        });
        clearLogs();
    } catch (error) {
        console.error('Send logs failed:', error.message);        
    }
}

