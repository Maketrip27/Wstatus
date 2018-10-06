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
import {
  AdMobBanner
} from 'react-native-admob'
import Ad from '../../config/ad';
import VideoPlayer from 'react-native-video-player';

const { width, height} = Dimensions.get('window');

export default class ImageListComponent extends Component {
  constructor(props){
    super(props);
  }

  componentWillUnmount(){
    StatusBar.setHidden(false, 'none');
  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({loading: false});
      StatusBar.setHidden(true, 'none');
    },1000)
  }
  render(){
      const {url, thumbnail,shareUrl} = this.props.navigation.state.params;
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
                onPress={() => {shareFile(shareUrl, false)}}
                style={[styles.largeButtonContainer, { right: 64 }]}
              >
                <Icon active name="md-share-alt" style = {{color: 'white', fontSize: 23}}/>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {downloadFiles(shareUrl, false)}}
                style={[styles.largeButtonContainer, { right: 12 }]}
              >
                <Icon active name="md-download" style = {{color: 'white', fontSize: 23}}/>
              </TouchableOpacity>
                <VideoPlayer
                    endWithThumbnail={false}
                    thumbnail={{uri: thumbnail}}
                    video={{ uri: url }}
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
                />
                <View style={styles.bottomView}>
                    <AdMobBanner
                        adSize="fullBanner"
                        adUnitID={getRandomAdUnit(Ad.videoPreview)}
                        testDevices={[AdMobBanner.simulatorId]}
                        onAdFailedToLoad={error => console.log(error)}
                    />
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