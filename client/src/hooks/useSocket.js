import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketUrl = process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_API_BASE_URL
            : process.env.REACT_APP_LOCAL_API_BASE_URL;

        const newSocket = io(socketUrl);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return socket;
};

export default useSocket;
