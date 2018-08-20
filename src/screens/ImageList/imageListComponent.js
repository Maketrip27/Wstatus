import React, {Component} from 'react';
import {View,StyleSheet, Text,FlatList,AppState,Dimensions,TouchableOpacity} from 'react-native';
import {Feed} from '../../component/feed.js';
import { Container, Content,  Body,Left,Right,Header,Title,Button,Icon } from 'native-base';
import { NavigationActions } from "react-navigation";
import NoData from '../../component/noData';
import { containerStyle,getRandomInt,getRandomAdUnit } from '../../utils/helper.js';
import {
  AdMobBanner
} from 'react-native-admob'
import Ad from '../../config/ad';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'

const {height, width} = Dimensions.get('window');

export default class ImageListComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      isActionButtonVisible: true
    }
    this.totalAdd = 1;
  }
  componentWillMount(){
    console.log(this.props.images)
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    console.log('App has come to the foreground!',nextAppState)
    if(nextAppState !== "background"){
      this.props.fetchWhatsAppFiles()
      this.totalAdd = 0
    }
  }
  _navigate = (name) => {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: {}
    });
    this.props.navigation.dispatch(navigate);
  }
  _onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
      ? 'down'
      : 'up'
    const isActionButtonVisible = direction === 'up'
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      this.setState({ isActionButtonVisible })
    }
    this._listViewOffset = currentOffset
  }
  render() {
    return (
      <Container>
        {(this.state.isActionButtonVisible && this.props.images.length > 0) ? <Button style={styles.floatButton} onPress = {()=>this._navigate("Priview")}>
          <Icon name='ios-expand' style={{fontSize:20,fontWeight:'bold'}}/>
          <Text style={{right:8,color:"#fff",fontWeight:'bold'}}>Full Screen</Text>
        </Button> : null}
        <Content 
          onScroll={this._onScroll}
          contentContainerStyle = {containerStyle(this.props.images)}>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID={Ad.topAd}
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.log(error)}
          />
        {this.props.images.length > 0 ?
          <OptimizedFlatList
              contentContainerStyle={styles.list}
              data={this.props.images}
              keyExtractor={(item, index) => item.id}
              renderItem={({item,index}) => {
                console.log(index,"----------------",(index+1)%2)
                if(Ad.totalAdShow >= this.totalAdd && (index+1)%2 === 1 && index !=0 && getRandomInt(1,3) === 2){
                  this.totalAdd +=1;
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
                      <Feed image_url={item} id={index}/>
                    </View>
                    )
                }else{
                return  (<Feed image_url={item} id={index}/>)
              }
          }}/> :
          <NoData message="No status available."/>}
          <AdMobBanner
            adSize="fullBanner"
            adUnitID={Ad.imageBottomAd}
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.log(error)}
          />
       </Content>
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
  },
  floatButton:{
    width: 120,
    height: 30,
    justifyContent: 'center',   
    backgroundColor: 'rgba(1, 119, 106,0.8)',                                    
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: (width/2)-60,
    borderRadius: 30,
    zIndex: 1
  }
});
