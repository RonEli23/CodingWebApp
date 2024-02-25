import { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Cookies from 'js-cookie';
import useAxios from '../hooks/useAxios';
import useSocket from '../hooks/useSocket';

const SEND_CODE_URL = "/api/codeBlock";
const SET_UP_URL = `/api/SetComponentUp`;

const CodeBlockTemplate = ({ title, solution, initialCode }) => {
    const { sendRequest, loading, error } = useAxios();
    const socket = useSocket();

    const [code, setCode] = useState(initialCode);
    const [isMentor, setIsMentor] = useState(false);
    const [isCodeCorrect, setIsCodeCorrect] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);

    const removeIndentation = (text) => {
        return text.replace(/^\s+|\s+$/gm, '');
    };

    const formattedSolution = removeIndentation(solution);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(SEND_CODE_URL, 'post', { code, title });
            window.alert('The solution was sent successfully');
        } catch (error) {
            window.alert('Something went wrong');
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setHasChanged(true);
        const newCode = e.target.value;
        setCode(newCode);
        socket.emit('code_change', { room: title, code: newCode });
        if (removeIndentation(newCode) === formattedSolution) {
            setIsCodeCorrect(true);
            setShowBackdrop(true);
        } else {
            setIsCodeCorrect(false);
        }
    };

    const handleBackdropClick = () => {
        setShowBackdrop(false);
    };

    useEffect(() => {
        if (!hasChanged) return;

        const handleBeforeUnload = (event) => {
            const userResponse = window.confirm('Have you saved your changes?');
            if (!userResponse) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasChanged]);

    useEffect(() => {
        const url = `${SET_UP_URL}/${title}`;
        const params = { uniqueKey: Cookies.get('uniqueKey') };

        sendRequest(url, 'get', params)
            .then((res) => {
                if (res.code) {
                    setCode(res.code);
                }
                setIsMentor(res.isMentor);
            })
            .catch((err) => console.error(err));
    }, []);


    useEffect(() => {
        if (socket) {
            socket.emit('join room', title);
            socket.on('received_data', (newCode) => {
                setCode(newCode);
            });
        }

        return () => {
            if (socket) {
                socket.emit('leave room', title);
                socket.off('received_data');
            }
        };
    }, [socket, title]);

    // Render loading indicator
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error message
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="container">
            <h1 className="code-block-title">{title}</h1>
            <textarea
                value={code}
                onChange={handleChange}
                rows={10}
                cols={50}
                readOnly={isMentor}
            />
            <SyntaxHighlighter language="javascript" style={atomOneDark} className="code-block">
                {code}
            </SyntaxHighlighter>
            <button onClick={handleSubmit} disabled={isMentor}>Save Changes</button>
            {isCodeCorrect && showBackdrop ? (
                <div>
                    <div className="backdrop" onClick={handleBackdropClick} />
                    <div className="smiley" onClick={handleBackdropClick}>
                        😊
                    </div>
                </div>
            ) : null}
        </section>
    );
};

export default CodeBlockTemplate;
