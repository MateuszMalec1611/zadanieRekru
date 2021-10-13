import axios from 'axios';

export const api = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API,
        headers: {
            Authorization: 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e',
        },
    });

    return instance;
};

export default api;
