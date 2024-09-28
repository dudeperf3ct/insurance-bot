import { useState, useEffect } from 'react';
import { getAnalysisStatus } from '../services/api';

function useAnalysisStatus(taskId) {
    const [status, setStatus] = useState('pending');
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (!taskId) return;

        const pollStatus = async () => {
            try {
                const response = await getAnalysisStatus(taskId);
                if (response.status === 'completed') {
                    setStatus('completed');
                    setResult(response.result);
                } else if (response.status === 'failed') {
                    setStatus('failed');
                } else {
                    setTimeout(pollStatus, 2000); // Poll every 2 seconds
                }
            } catch (error) {
                console.error('Error polling status:', error);
                setStatus('failed');
            }
        };

        pollStatus();
    }, [taskId]);

    return { status, result };
}

export default useAnalysisStatus;
