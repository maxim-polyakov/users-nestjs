import axios from 'axios';

const GetBaseUrl = () => {
    const [ prefix, host, apiPort ] = process.env.REACT_APP_API_URL.split(':').map( (v) => v.replaceAll('/', '') );
    const { hostname, protocol } = window.location;

    let resultingPath;
    if (host == 'localhost')
        resultingPath = apiPort === undefined ? `${protocol}//${hostname}/` : `${protocol}//${hostname}:${apiPort}/`;
    else
        resultingPath = apiPort === undefined ? `${prefix}//${host}/` : `${prefix}//${host}:${apiPort}/`;

    return resultingPath;
};

export const $host = axios.create();


$host.defaults.baseURL = GetBaseUrl();