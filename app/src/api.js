import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api'
});

export const fetchLatestBlocks = async (numberOfBlocksToFetch = 10) => {
    try {
        return await axiosInstance.get(`/v1/block/latest/${numberOfBlocksToFetch}`);
    } catch (err) {
        throw err;
    }
};