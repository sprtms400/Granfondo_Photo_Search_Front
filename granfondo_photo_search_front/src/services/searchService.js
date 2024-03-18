const axios = require('axios');

export const search = async function (query) {
    try {
        const response = await axios.get(`http://localhost:3000/photo?query=${query}`);
        return response;
    } catch (error) {
        console.error("Error searching for photos:", error);
        return {};
    }
};

export const fullTextVectorSearch = async function (query, top_k) {
    try {
        const response = await axios.get(`http://localhost:3000/photo/search/vector?natural_query=${query}?top_k=${top_k}`);
        return response;
    } catch (error) {
        console.error("Error searching for photos:", error);
        return {};
    }
}