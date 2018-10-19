import RNFetchBlob from 'rn-fetch-blob';
import { ToastAndroid } from 'react-native';
import Share from 'react-native-share';
import Config from '../config/config';

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

export function downloadFiles(file_name, isUrl=false, fileType=".png") {
		// download file and confirm it is saved
		if (isUrl === true){
			downloadImageFromUrl(file_name, fileType)
		}else{
			RNFetchBlob.fs.cp(getFilePath(file_name), `${getDownloadDirectory()}/${DIRECTORY_NAME}/${file_name}`)
					.then((exist) => {
							ToastAndroid.show("Status saved in WhatsAppStatus folder",ToastAndroid.SHORT)
					}).catch((error) => {
							ToastAndroid.show("Failed to save",ToastAndroid.SHORT)
			});
		}
}

export function createDirectory() {
		RNFetchBlob.fs.isDir(`${getDownloadDirectory()}/${DIRECTORY_NAME}`)
				.then((exists) => {
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

export function getFilePath(file_name, isUrl = false){
	if (isUrl){
		return file_name
	}else
	return "file://" + getWhatsappStatusDirectory() + "/" + file_name
}

export const shareFile = (file_name, isUrl, fileType="image/png") => {
	if (isUrl){
		ToastAndroid.show("Please wait fetching status..",ToastAndroid.LONG)
		RNFetchBlob
		.fetch('GET', file_name, {
		})
		.then((res) => {
			ToastAndroid.show("Sending Status",ToastAndroid.SHORT)
			let shareOptions ={
			title: "Share",
			message: "Share Status From :- "+Config.shareUrl,
			url: "data:"+fileType+";base64,"+res.base64(),
			}
			Share.open(shareOptions).then((response)=>{
			}).catch((error)=>{
				console.log("err",error)
			})
		})
	}else{
		let shareOptions ={
			message: "Share Status From :- "+Config.shareUrl,
			title: "Share",
			url: getFilePath(file_name),
		}
		Share.open(shareOptions).then((response)=>{
		}).catch((error)=>{
			console.log("err",error)
		})
	}
}

export const containerStyle = (data) => {
  if (data !== undefined && data.length > 0){
    return {}
  }else{
    return {flex: 1, justifyContent: 'center',alignItems: 'center'}
  }
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
export const getRandomAdUnit= (ad) => {
	let a =ad[Math.floor(Math.random() * ad.length)];
	return a;
}

export const getFilenameFromUrl = (url) =>{
	if (url)
	{
		var m = url.toString().match(/.*\/(.+?)\./);
		if (m && m.length > 1)
		{
			return m[1];
		}
	}
	return "";
}
export const downloadImageFromUrl = (url, fileType=".png") => {
	let file_name = getFilenameFromUrl(url);
	let mimeType = fileType === '.png' ? 'image/png' : 'video/mp4'
    // RNFetchBlob
    // .config({
    //   path : `${getDownloadDirectory()}/${DIRECTORY_NAME}/${file_name}${fileType}`
    // })
    // .fetch('GET', url, {
    // })
    // .then((res) => {
	//   ToastAndroid.show("File saved in WhatsAppStatus folder",ToastAndroid.SHORT)
	// })
	RNFetchBlob
    .config({
        addAndroidDownloads : {
            useDownloadManager : true, // <-- this is the only thing required
            // Optional, override notification setting (default to true)
            notification : true,
            // Optional, but recommended since android DownloadManager will fail when
            // the url does not contains a file extension, by default the mime type will be text/plain
            mime : mimeType,
			description : 'File downloaded by download manager.',
			path: `${getDownloadDirectory()}/${DIRECTORY_NAME}/${file_name}${fileType}`
        }
    })
    .fetch('GET', url)
    .then((resp) => {
	  // the path of downloaded file
	  ToastAndroid.show("File saved in WhatsAppStatus folder",ToastAndroid.SHORT)
    //   resp.path()
    })
}
export const shareThisApp = (url) =>{
	let shareOptions ={
	title: "Share",
	url: url,
	}
	Share.open(shareOptions).then((response)=>{
	}).catch((error)=>{
		console.log("err",error)
	})
}

