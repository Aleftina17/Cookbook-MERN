import { useState, useEffect } from "react";

const useLoadingWithMessages = (initialMessage) => {
    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState(initialMessage);
    const [startTime, setStartTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (loading) {
                const now = Date.now();
                setElapsedTime((prevElapsedTime) => {
                    const newElapsedTime = (now - startTime) / 1000;
                    if (newElapsedTime > 20 && newElapsedTime <= 40) {
                        setLoadingMessage("If you're patient enough, we'll have your recipes soon...");
                    } else if (newElapsedTime > 40) {
                        setLoadingMessage("Our optimization might need some work...");
                    }
                    return newElapsedTime;
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, startTime]);

    const stopLoading = () => {
        setLoading(false);
    };

    const startLoading = () => {
        setLoading(true);
        setStartTime(Date.now());
        setElapsedTime(0);
        setLoadingMessage(initialMessage);
    };

    return { loading, loadingMessage, stopLoading, startLoading, elapsedTime };
};

export default useLoadingWithMessages;
