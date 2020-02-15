import RNFetchBlob from 'rn-fetch-blob';
import { getWhatsappStatusDirectory,createDirectory } from '../utils/helper.js';

export const UPDATE_IMAGE_LIST = 'UPDATE_IMAGE_LIST';
export const UPDATE_VIDEO_LIST = 'UPDATE_VIDEO_LIST';



export function fetchWhatsAppFiles() {
	return (dispatch,getState) => {
		createDirectory()
    RNFetchBlob.fs.ls(getWhatsappStatusDirectory())
        .then(data => {
            dispatch(getWhatsappImages(data))
            dispatch(getWhatsappVideos(data))
        }).catch(error => {
    });
  }
}
export function getWhatsappImages(statusFiles) {
    return (dispatch) => {
        let images = statusFiles.filter((elem, index) => elem.endsWith('.jpg'));
        return dispatch(updateWhatsAppImage(images));

    }
}

export function getWhatsappVideos(statusFiles) {
    return (dispatch) => {
        let videos = statusFiles.filter((elem, index) => elem.endsWith('.mp4'));
        return dispatch(updateWhatsAppVideos(videos));

    }
}

export function updateWhatsAppImage(images) {
    return {
        type: UPDATE_IMAGE_LIST,
        data: images
    }
}

export function updateWhatsAppVideos(videos) {
    return {
        type: UPDATE_VIDEO_LIST,
        data: videos
    }
}


