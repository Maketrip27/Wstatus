import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
import {VideoFeed} from '../../component/videoFeed.js';
import { Container, Content,  Body,Left,Right,Header,Title } from 'native-base';
import { containerStyle,getRandomInt,getRandomAdUnit } from '../../utils/helper.js';
import NoData from '../../component/noData';
import Ad from '../../config/ad';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import Loading from '../../component/loading.js';
import { NavigationActions } from "react-navigation";

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
  
  render() {
    let length = this.props.videos.length;
    return (
      <Container>
      {(this.state.loading)? <Loading message="Please wait fetching video."/>:
        <Content contentContainerStyle = {containerStyle(this.props.videos)}>
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
  }
});
