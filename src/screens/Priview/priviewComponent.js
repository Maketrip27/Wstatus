import React,{Component}  from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
  StatusBar
} from 'react-native';

import {
  ParallaxSwiper,
  ParallaxSwiperPage,
} from 'react-native-parallax-swiper';
// import LinearGradient from 'react-native-linear-gradient';

import { downloadFiles, shareFile,getFilePath } from '../../utils/helper.js';

import {Icon} from 'native-base';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const myAnimatedValue = new Animated.Value(0);

export default class ImageListComponent extends Component {
  
  componentWillMount(){
    console.log(this.props)
    StatusBar.setHidden(true, 'none');
  }
  
  render(){
    return(
      <View>
      <ParallaxSwiper
        speed={0.75}
        dividerWidth={6}
        dividerColor="black"
        animatedValue={myAnimatedValue}
      >
        {this.props.images.map(image =>
          (<ParallaxSwiperPage
            BackgroundComponent={
              <ImageBackground
                style={styles.image}
                source={{
                  uri: getFilePath(image),
                }}
                resizeMode="contain"

              />
            }
            ForegroundComponent={
              <View style={styles.innerContainer}>
              <TouchableOpacity 
        onPress={() => {shareFile(image)}}
        style={[styles.largeButtonContainer, { right: 64 }]}
      >
        <Icon active name="md-share-alt" style = {{color: 'white', fontSize: 23}}/>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => {downloadFiles(image)}}
        style={[styles.largeButtonContainer, { right: 12 }]}
      >
       <Icon active name="md-download" style = {{color: 'white', fontSize: 23}}/>
      </TouchableOpacity>
              </View>
            }
          />),
        )}
      </ParallaxSwiper>
      <TouchableOpacity
        onPress={() => {
          StatusBar.setHidden(false, 'none');
          this.props.navigation.goBack();
        }}
        style={[styles.largeButtonContainer, { left: 12 }]}
      >
        <Icon active name="md-close" style = {{color: 'white', fontSize: 23}}/>
      </TouchableOpacity>
      
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              transform: [
                {
                  translateX: myAnimatedValue.interpolate({
                    inputRange: [0, (deviceWidth + 6) * (this.props.images.length - 1)],
                    outputRange: [-deviceWidth, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </View>);
  }
}
const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: deviceWidth,
    height: deviceHeight,
  },
  gradient: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    backgroundColor: 'transparent',
  },
  twitterNameAndHandleContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  twitterName: {
    marginRight: 4,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  twitterHandle: {
    fontSize: 16,
    color: 'white',
  },
  tweetTextContainer: {
    marginBottom: 12,
  },
  tweetText: {
    fontSize: 16,
    color: 'white',
  },
  buttonWithTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  bottomIconsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    tintColor: 'white',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
  },
  smallButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  smallButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  smallButtonWithTextIconContainer: {
    marginRight: 12,
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
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressBar: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
});