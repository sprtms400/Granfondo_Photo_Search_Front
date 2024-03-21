const axios = require('axios');
// const Qs = require('qs');

const GCS_STORAGE_URL = "https://storage.googleapis.com";
const GCS_BUCKET_NAME = 'granfondo-photos';

export const getPhotosFromGCP_original = async function (dirPath, photoId) {
    try {
        const full_url = `${GCS_STORAGE_URL}/${GCS_BUCKET_NAME}/${dirPath}/${photoId}`;
        const response = await axios.get(full_url)
        return response;
    } catch (error) {
        console.error("Error getting photos from GCP:", error);
        return {};
    }
}

export const getPhotosFromGCP_annotated = async function (dirPath, photoId) {
    try {
        const full_url = `${GCS_STORAGE_URL}/${GCS_BUCKET_NAME}/${dirPath}/${photoId}_annotated_image.jpg`;
        const response = await axios.get(full_url)
        return response;
    } catch (error) {
        console.error("Error getting photos from GCP:", error);
        return {};
    }
}

export const getPhotosFromGCP_numberplate = async function (dirPath, photoId) {
    try {
        const full_url = `${GCS_STORAGE_URL}/${GCS_BUCKET_NAME}/${dirPath}/${photoId}_number_plate_image.jpg`;
        const response = await axios.get(full_url)
        return response;
    } catch (error) {
        console.error("Error getting photos from GCP:", error);
        return {};
    }
}

export const getPhotosFromGCP_cropped_numberplate = async function (dirPath, photoId) {
    try {
        const full_url = `${GCS_STORAGE_URL}/${GCS_BUCKET_NAME}/${dirPath}/${photoId}_cropped_number_plate_image.jpg`;
        const response = await axios.get(full_url)
        return response;
    } catch (error) {
        console.error("Error getting photos from GCP:", error);
        return {};
    }
}

export const photoURL_assembler_original = function (dirPath, photoId) {
    return `${GCS_STORAGE_URL}/${GCS_BUCKET_NAME}/${dirPath}/${photoId}`;
}

export const photoURL_annotated_image = function (dirPath, photoId) {
    return `${GCS_STORAGE_URL}/${GCS_BUCKET_NAME}/${dirPath}/${photoId}-annotated_image.jpg`;
}

export const photoURL_cropped_number_plate_image = function (dirPath, photoId) {
    return `${GCS_STORAGE_URL}/${GCS_BUCKET_NAME}/${dirPath}/${photoId}-cropped_number_plate_image.jpg`;
}

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