import axios from '../api/axios';
import { useState } from 'react';

const useAxios = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (url, method = 'get', requestData = {}, headers = {}) => {
        setLoading(true);
        setError(null);

        try {
            const config = {
                method,
                url,
                headers
            };

            if (method.toLowerCase() === 'get') {
                config.params = requestData;
            } else {
                config.data = requestData;
            }

            const response = await axios(config);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error.response.data.error || 'Something went wrong');
            throw error;
        }
    };

    return { loading, error, sendRequest };
};

export default useAxios;
