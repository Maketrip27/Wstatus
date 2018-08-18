import React, { Component,Video } from 'react';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import { CardItem,Button, Left,Right,Icon,List} from 'native-base';

import {downloadFiles, shareFile,getFilePath } from '../utils/helper.js';
const {height, width} = Dimensions.get('window');
export class Feed extends Component {
  render() {
    return (
            <List style={styles.gird}>
              <CardItem cardBody>
                <ScrollView horizontal>
                  <ImageBackground source={{uri: getFilePath(this.props.image_url)}} style={{height: 150,width:width/2, flex: 1, justifyContent:'flex-end'}}>
                  <CardItem style={{ backgroundColor: 'transparent', height: 30, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <Left>
                      <Button transparent onPress={ () =>  shareFile(this.props.image_url)}>
                        <Icon active name="md-share-alt" style = {{color: 'white', fontSize: 20}}/>
                      </Button>
                    </Left>
                    <Right>
                      <Button transparent onPress={ () =>  downloadFiles(this.props.image_url)}>
                        <Icon active name="md-download" style = {{color: 'white', fontSize: 20}}/>
                      </Button>
                    </Right>
                  </CardItem>
                  </ImageBackground>
                </ScrollView>
              </CardItem>
            </List>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  backgroundVideo: {
    position: 'relative',
    height: 300,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gird:{
    flex: 1,
    margin: 3,
    minWidth: 170,
    maxWidth: 170,
    height: 150,
    maxHeight:150,
    backgroundColor: 'red',
    }
});