const axios = require('axios');

export const getCompetitions = async function () {
    try {
        const response = await axios.get(`http://localhost:3000/competitions`);
        return response;
    } catch (error) {
        console.error("Error searching for photos:", error);
        return {};
    }
}