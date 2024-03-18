const axios = require('axios');
const Qs = require('qs');

/**
 * photoLists : ['photoId1', 'photoId2', ...]
 */
export const getPhotos_byList = async function (photoIdList) {
    try {
        const stringified_idList = JSON.stringify(photoIdList);
        const response = await axios.get(`http://localhost:3000/photos?photoIdList=${stringified_idList}`);
        console.log("getPhotos_byList response:", response);
        return response;
    } catch (error) {
        console.error("Error getting photos by list:", error);
        return {};
    }
}