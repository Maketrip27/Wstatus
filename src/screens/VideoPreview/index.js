import React,{Component}  from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar
} from 'react-native';

import { downloadFiles, shareFile,getFilePath,getRandomAdUnit,getRandomInt } from '../../utils/helper.js';
import {Icon} from 'native-base';
// import Ad from '../../config/ad';
import VideoPlayer from 'react-native-video-player';
import LottieView from 'lottie-react-native';
import AdMopub from '../../component/AdMopub';
import Ad from '../../config/mopubAds';
const { width, height} = Dimensions.get('window');

export default class VideoImageListComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      video_url: "",
      loading: false
    }
  }

  componentWillMount(){
    let {code, isUrl} = this.props.navigation.state.params;
    if (isUrl){
      this.getMediaFromTag(code)
      this.setState({loading: true})
    }
  }
  componentWillUnmount(){
    StatusBar.setHidden(false, 'none');
  }

  getMediaFromTag(code){
    fetch("https://www.instagram.com/p/"+code+"/?__a=1", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
        }).then((response) => response.json())
        .then((responseData) =>
        {
            console.log(responseData)
            let video_url = responseData.graphql.shortcode_media.video_url;
            this.setState({video_url: video_url, loading: false})
        })
        .catch(()=> {
          consol
          this.setState({loading: false})
        });
  }
  componentDidMount() {
    setTimeout(()=>{
      StatusBar.setHidden(true, 'none');
    },1000)
  }
  render(){
      const {url, thumbnail,shareUrl, isUrl} = this.props.navigation.state.params;
      const videoUrl = isUrl ? this.state.video_url : url;
      const shareFileUrl = isUrl ? this.state.video_url : shareUrl;
    return(
             <View style={{flex:1,backgroundColor: 'transparent',backgroundColor: 'rgba(0,0,0,0.90)',alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
                onPress={() => {
                  StatusBar.setHidden(false, 'none');
                  this.props.navigation.goBack();
                }}
                style={[styles.largeButtonContainer, { left: 12 }]}
              >
                <Icon active name="md-close" style = {{color: 'white', fontSize: 23}}/>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {shareFile(shareFileUrl, isUrl, "video/mp4")}}
                style={[styles.largeButtonContainer, { right: 64 }]}
              >
                <Icon active name="md-share-alt" style = {{color: 'white', fontSize: 23}}/>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {downloadFiles(shareFileUrl, isUrl, ".mp4")}}
                style={[styles.largeButtonContainer, { right: 12 }]}
              >
                <Icon active name="md-download" style = {{color: 'white', fontSize: 23}}/>
              </TouchableOpacity>
              {(isUrl && this.state.loading) ?           
              <LottieView
                source={require('../../animation/loading_dots-color.json')}
                style={{}}
                autoPlay
                loop
              /> :
                <VideoPlayer
                    endWithThumbnail={false}
                    thumbnail={{uri: thumbnail}}
                    video={{ uri: videoUrl}}
                    style={{width}}
                    videoWidth={width}
                    videoHeight={height}
                    duration={undefined}
                    ref={r => this.player = r}
                    key={this.props.id+"Vplay"}
                    autoplay={true}
                    pauseOnPress={true}
                    disableControlsAutoHide={true}
                    disableSeek={true}
                    hideControlsOnStart={true}
                    onLoad={(event) => {
                      console.log('VideoPlayer onLoad, ', event);
                   }}
                />}
                <View style={styles.bottomView}>
                  <AdMopub unitId={Ad.videoPreview}/>
                </View>
            </View>
    )
  }
}
const styles = StyleSheet.create({
  image: {
    width: width,
    height: height,
  },
  largeButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 12,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0,0,0,0.50)',
    borderRadius: 16,
    zIndex:5
  },
  bottomView:{
    width: '100%', 
    height: 50, 
    backgroundColor: 'black', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom:20
  }
});