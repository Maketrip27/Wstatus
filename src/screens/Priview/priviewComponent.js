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
import { downloadFiles, shareFile,getFilePath,getRandomAdUnit,getRandomInt } from '../../utils/helper.js';
import {Icon} from 'native-base';
import {
  AdMobBanner
} from 'react-native-admob'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import Loading from '../../component/loading.js';
import FastImage from 'react-native-fast-image'
import Ad from '../../config/ad';
import Carousel from 'react-native-snap-carousel';

const { width, height} = Dimensions.get('window');
const myAnimatedValue = new Animated.Value(0);

export default class ImageListComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: true
    }
    this.selected = 0
    this.totalAdd = 1;
  }

  componentWillUnmount(){
    StatusBar.setHidden(false, 'none');
  }
  componentWillReceiveProps(){
    this.totalAdd = 1;
  }
  componentDidMount() {
    console.log("appoinments", this.props)
    setTimeout(()=>{
      this.setState({loading: false});
      StatusBar.setHidden(true, 'none');
    },1000)
  }
  getAd = (index) => {
    console.log("preview",index)
    // Ad.previewAdShow >= this.totalAdd && (index+1)%2 === 1 && index !=0 && getRandomInt(1,3) === 2
    if(getRandomInt(1,6) === 3){
      console.log("1preview",index)
      this.totalAdd += 1;
      return(
        <View style={styles.bottomView}>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID={getRandomAdUnit(Ad.previewAd)}
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.log(error)}
          />
        </View>
      )
    }
    else{
      return null
    }
  }
  render(){
    if (this.state.loading)
      return (<Loading message="Please wait fetching status."/>)
    else
    return(
            <View>
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
                onPress={() => {shareFile(this.props.images[this.selected])}}
                style={[styles.largeButtonContainer, { right: 64 }]}
              >
                <Icon active name="md-share-alt" style = {{color: 'white', fontSize: 23}}/>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {downloadFiles(this.props.images[this.selected])}}
                style={[styles.largeButtonContainer, { right: 12 }]}
              >
                <Icon active name="md-download" style = {{color: 'white', fontSize: 23}}/>
              </TouchableOpacity>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.props.images}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                onSnapToItem={(index) => {this.selected= index; console.log(index)} }
                renderItem={({item,index}) => (
                  <View style = {{backgroundColor: 'transparent',backgroundColor: 'rgba(0,0,0,0.90)'}}>
                                  {console.log("eee----------")}
                    <FastImage
                      style={styles.image}
                      source={{
                        uri: getFilePath(item),
                      }}
                      resizeMode="contain"
                    >{ this.getAd(index)}
                    </FastImage>
                  </View>
                )}
                sliderWidth={width}
                itemWidth={width}
              />
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