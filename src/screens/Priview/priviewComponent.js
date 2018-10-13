import React,{Component}  from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import { downloadFiles, shareFile,getRandomAdUnit } from '../../utils/helper.js';
import {Icon} from 'native-base';
import Ad from '../../config/ad';
import PhotoView from 'react-native-photo-view';

const { width, height} = Dimensions.get('window');
export default class ImageListComponent extends Component {
  constructor(props){
    super(props);
  }
  componentWillUnmount(){
    StatusBar.setHidden(false, 'none');
  }
  componentWillReceiveProps(){
  }
  componentDidMount() {
    StatusBar.setHidden(true, 'none');
  }

  render(){
    let ad = [];
    const {url, shareUrl, isUrl} = this.props.navigation.state.params;
    ad = isUrl ? Ad.quotePreview : Ad.previewAd
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
                onPress={() => {shareFile(shareUrl, isUrl)}}
                style={[styles.largeButtonContainer, { right: 64 }]}
              >
                <Icon active name="md-share-alt" style = {{color: 'white', fontSize: 23}}/>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {downloadFiles(shareUrl, isUrl)}}
                style={[styles.largeButtonContainer, { right: 12 }]}
              >
                <Icon active name="md-download" style = {{color: 'white', fontSize: 23}}/>
              </TouchableOpacity>
              <PhotoView
                source={{uri: url}}
                androidScaleType="center"
                style={{width: width, height: height}} />
              {/* <View style={styles.bottomView}>
              </View> */}
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