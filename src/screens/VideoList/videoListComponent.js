import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
import {VideoFeed} from '../../component/videoFeed.js';
import { Container, Content,  Body,Left,Right,Header,Title } from 'native-base';
import { containerStyle,getRandomInt,getRandomAdUnit } from '../../utils/helper.js';
import NoData from '../../component/noData';
import {
  AdMobBanner
} from 'react-native-admob'
import Ad from '../../config/ad';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import Loading from '../../component/loading.js';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: true
    }
  }
  componentWillMount(){
    console.log("sss",this.props.videos)
  }
  componentDidMount() {
    console.log("appoinments", this.props)
    setTimeout(()=>{
      this.setState({loading: false});
    },3000)
  }
  
  render() {
    let length = this.props.videos.length;
    return (
      <Container>
      {(this.state.loading)? <Loading message="Please wait fetching video."/>:
        <Content contentContainerStyle = {containerStyle(this.props.videos)}>
        <AdMobBanner
            adSize="fullBanner"
            adUnitID={Ad.topAd}
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.log(error)}
        />
        {length > 0 ?
          <OptimizedFlatList
              data={this.props.videos}
              keyExtractor={(item, index) => item.id}
              renderItem={({item,index}) => {
                if(getRandomInt(1,4) === 2){
                  return(
                    <View>
                      <View/>
                      <View style={{width:170, flex: 1}}>
                        <AdMobBanner
                          adSize="fullBanner"
                          adUnitID={getRandomAdUnit(Ad.bannerAd)}
                          testDevices={[AdMobBanner.simulatorId]}
                          onAdFailedToLoad={error => console.log(error)}
                        />
                      </View>
                      <VideoFeed video_url={item} id={index} videoStop={this.state.stopVideo}/>
                    </View>)
                }else{
                  return  (<VideoFeed video_url={item} id={index}/>)
                }
          }}/>:
          <NoData message="No video status available."/>}
          <AdMobBanner
            adSize="fullBanner"
            adUnitID={Ad.videoBottomAd}
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.log(error)}
          />
       </Content>}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
     list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
