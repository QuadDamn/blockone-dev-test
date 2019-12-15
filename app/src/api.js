import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001'
});

export const fetchLatestBlocks = async (numberOfBlocksToFetch = 10) => {
    try {
        return await axiosInstance.get(`/block/latest/${numberOfBlocksToFetch}`);
    } catch (err) {
        throw err;
    }
};