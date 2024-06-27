import { useState, useEffect } from 'react';

interface WsMessage {
    type: string;
    comment: {
        'id': string;
        'text': string;
        'user': string;
    }
}

const useWebSocket = (url: string) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState<WsMessage | null>(null)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {

        const isProduction = import.meta.env.PROD;
        const baseUrl = isProduction ? "wss://laflorblanca.onrender.com" : "ws://localhost:8000";

        try {
            const ws = new WebSocket(`${baseUrl}/${url}`);

            ws.onopen = () => {
                console.log(`WebSocket connection opened: ${url}`);
                setSocket(ws);
            };
            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    setMessage(data)
                    console.log('Parsed data:', data);
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };
            ws.onerror = (event) => {
                const eventError = new Error(`${event.type}}`)
                setError(eventError)
                console.error('WebSocket error:', event);
            };

            ws.onclose = (event) => {
                console.log('WebSocket connection closed:', event);
                setSocket(null);
            };

            // Clean up the WebSocket connection
            return () => {
                if (ws.readyState === WebSocket.OPEN) {
                    console.log('Closing WebSocket connection');
                    ws.close();
                }
            };
        } catch (error) {
            setError(new Error('Error creating WebSocket connection'));
            console.error('Error creating WebSocket connection:', error);
        }
    }, [url]);

    return { socket, message, error };
}

export default useWebSocket