import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
import {VideoFeed} from '../../component/videoFeed.js';
import { Container, Content,  Body,Left,Right,Header,Title } from 'native-base';
import Video from 'react-native-video';

export default class App extends Component {
  componentWillMount(){
    console.log("sss",this.props.videos)
  }
  render() {
    return (
      <Container>
        <Content>
        <FlatList
            contentContainerStyle={styles.list}
            data={this.props.videos}
            keyExtractor={(item, index) => item.id}
            renderItem={(item) => {
              return  (<VideoFeed video_url={item.item}/>)
        }}/>
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
  }
});
