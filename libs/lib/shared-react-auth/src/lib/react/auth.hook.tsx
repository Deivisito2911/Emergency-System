import { sessionValidator } from './sessionValidator';
import { useState, useEffect, useRef } from 'react';

export const useAuth = () => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();
    const intervalId = useRef<NodeJS.Timer>();

    useEffect(() => {
        const validateSession = async () => {
            try {
                const user = await sessionValidator();
                setAuthUser(user);

                intervalId.current = setInterval(async () => {
                    try {
                        const user = await sessionValidator();
                        setAuthUser(user);
                    } catch (error) {
                        setError(error as Error);
                    }
                }, 60000);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        validateSession();
        return () => clearInterval(intervalId.current);
    }, []);

    return { authUser, loading, error };
};