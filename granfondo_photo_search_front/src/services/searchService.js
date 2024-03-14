const axios = require('axios');

export const search = async function (query) {
    try {
        const response = await axios.get(`http://localhost:3000/photo?query=${query}`);
        return await response.json();
    } catch (error) {
        console.error("Error searching for photos:", error);
    }
};