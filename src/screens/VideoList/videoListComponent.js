import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableWithoutFeedback, Image} from 'react-native';
import {VideoFeed} from '../../component/videoFeed.js';
import { Container, Content,Card, Text } from 'native-base';
import { containerStyle, } from '../../utils/helper.js';
import NoData from '../../component/noData';
// import Ad from '../../config/ad';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import Loading from '../../component/loading.js';
import { NavigationActions } from "react-navigation";
import AdMopub from '../../component/AdMopub';
import Ad from '../../config/mopubAds';
import InstatStatus from '../../config/instaStatus';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: true
    }
  }
  componentWillMount(){
  }
  componentDidMount() {
    setTimeout(()=>{
      this.setState({loading: false});
    },500)
  }

  _navigate = (name, params = {}) => {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: params
    });
    this.props.navigation.dispatch(navigate);
  }
  renderCard = (item) => {
    let {title, tag, video, image} = item;
    return (
      <TouchableWithoutFeedback onPress={() => this._navigate('StatusVideoList', { title: title, tag: tag, video: video })}>
            <Card style={styles.menuBox}>
              <Image style={styles.icon} source={image} />
              <Text style={styles.info}>{title}</Text>
            </Card>
      </TouchableWithoutFeedback>
    )
  }
  render() {
    let length = this.props.videos.length;
    return (
      <Container>
         <View style={{ height: 95 }}>
         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {InstatStatus.videoStatus.map(item=>{
                return this.renderCard(item) 
              })}
            </ScrollView>
         </View>
      {(this.state.loading)? <Loading message="Please wait fetching video."/>:
        <Content contentContainerStyle = {containerStyle(this.props.videos)}>
        <AdMopub unitId={Ad.videoList}/>
        {length > 0 ?
          <OptimizedFlatList
              contentContainerStyle={styles.list}
              numColumns={3}
              data={this.props.videos}
              keyExtractor={(item, index) => item.id}
              renderItem={({item,index}) => {
                return  (<VideoFeed video_url={item} id={index} navigate={this._navigate} isUrl={false}/>)
          }}/>:
          <NoData message="No video status available."/>}
       {/* <AdMopub unitId={Ad.videoList}/> */}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    margin: 2
  },
  menuBox: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: 2,
    borderRadius:5
  },
  icon: {
    width: 64,
    height: 64,
  },
  info: {
    top: 2,
    fontSize: 12,
    color: "black",
    fontWeight: 'bold'
  }
});
