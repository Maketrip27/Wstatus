import RNFetchBlob from 'rn-fetch-blob';
import { ToastAndroid } from 'react-native';
import Share from 'react-native-share';

const DIRECTORY_NAME = "WhatsAppStatus"
const THUMBNAIL_DIR = "///storage/emulated/0/.thumb"

const dirs = RNFetchBlob.fs.dirs;

export function getWhatsappStatusDirectory() {
		return dirs.SDCardDir + '/WhatsApp/Media/.Statuses';
}

export function getDownloadDirectory() {
		return dirs.DownloadDir
}

export function deleteFile(file){
	RNFetchBlob.fs.unlink(file)
	.then(() => { console.log("deleted suceess")})
	.catch((error) => { console.log("nott---",error)})
}

export function getThumbnailfiles(){
	let status = [];
	RNFetchBlob.fs.ls(THUMBNAIL_DIR)
			.then(data => {
					data.map(file => {
						deleteFile(THUMBNAIL_DIR+"/"+file)	
					})
			}).catch(error => {
					console.log("eee------------e",error)
	});
	return status
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

export function downloadFiles(file_name) {
		// download file and confirm it is saved
		RNFetchBlob.fs.cp(getFilePath(file_name), `${getDownloadDirectory()}/${DIRECTORY_NAME}/${file_name}`)
				.then((exist) => {
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

export function getFilePath(file_name){
	return "file://" + getWhatsappStatusDirectory() + "/" + file_name
}

export const shareFile = (file_name) => {
	let shareOptions ={
		title: "Share",
		url: getFilePath(file_name),
	}
	Share.open(shareOptions).then((response)=>{
		console.log(response)
	}).catch((error)=>{
		console.log("err",error)
	})
}

export const containerStyle = (data) => {
  if (data !== undefined && data.length > 0){
    return {}
  }else{
    return {flex: 1, justifyContent: 'center',alignItems: 'center'}
  }
}