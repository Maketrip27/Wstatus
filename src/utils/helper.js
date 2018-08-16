import RNFetchBlob from 'rn-fetch-blob';
import { ToastAndroid } from 'react-native';

const DIRECTORY_NAME = "WhatsAppStatus"
const dirs = RNFetchBlob.fs.dirs;

export function getWhatsappStatusDirectory() {
    return dirs.SDCardDir + '/WhatsApp/Media/.Statuses';
}

export function getDownloadDirectory() {
    return dirs.DownloadDir
}

export function getWhatsappStatusFiles() {
    let status = [];
    RNFetchBlob.fs.ls(getWhatsappStatusDirectory())
        .then(data => {
            status = data
        }).catch(error => {
            console.log(error)
    });
    return status
}

export function downloadFiles(file_path, file_name) {
    // download file and confirm it is saved
    console.log(file_path);
    RNFetchBlob.fs.cp(file_path, `${getDownloadDirectory()}/${DIRECTORY_NAME}/${file_name}`)
        .then((exist) => {
            console.log(file_path, exist);

            ToastAndroid.show("File will saved in WhatsAppStatus folder",ToastAndroid.SHORT)
        }).catch((error) => {
            ToastAndroid.show("Failed to save",ToastAndroid.SHORT)
    });
}

export function createDirectory() {
    RNFetchBlob.fs.isDir(`${getDownloadDirectory()}/${DIRECTORY_NAME}`)
        .then((exists) => {
            console.log("================",exists)
            if (exists) {
                return `${getDownloadDirectory()}/${DIRECTORY_NAME}`;
            } else {
                return RNFetchBlob.fs.mkdir(`${getDownloadDirectory()}/${DIRECTORY_NAME}`);
            }
        }).catch((error) =>{
            console.log("---------------",error)
        })
}

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];
        return reducer ? reducer(state, action.payload) : state;
    };
}

export function getSavedStatus() {
    return `${dirs.DownloadDir}/${DIRECTORY_NAME}`;
}
