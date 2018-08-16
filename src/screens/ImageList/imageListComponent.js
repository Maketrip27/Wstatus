import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,AppState} from 'react-native';
import {Feed} from '../../component/feed.js';
import { Container, Content,  Body,Left,Right,Header,Title } from 'native-base';

export default class ImageListComponent extends Component {
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
    this.props.fetchWhatsAppFiles()
  }
  render() {
    return (
      <Container>
        <Content>
        <FlatList
            contentContainerStyle={styles.list}
            data={this.props.images}
            keyExtractor={(item, index) => item.id}
            renderItem={(item) => {
              return  (<Feed image_url={item.item}/>)
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
