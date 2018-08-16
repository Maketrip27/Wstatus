import React, { Component,Video } from 'react';
import {
  StyleSheet,
  ImageBackground,
  ToastAndroid,
  ScrollView,
  Dimensions
} from 'react-native';
import { Container, Content, Item, Input, Card, CardItem, Text, Button, Thumbnail,Body,Left,Right,Icon,Spinner,List,Header,Title } from 'native-base';

import RNFetchBlob from 'rn-fetch-blob'
import { getWhatsappStatusDirectory,downloadFiles } from '../utils/helper.js';
import Share from 'react-native-share';

const {height, width} = Dimensions.get('window');
export class Feed extends Component {

  sendFile(shareOptions){
    Share.open(shareOptions).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log("err",error)
    })
  }
  render() {
    let dir =  getWhatsappStatusDirectory() + '/'  + this.props.image_url;
    let shareOptions = {
      title: "Share",
      url: "file://"+dir,
    };
    return (
            <List style={styles.gird}>
              <CardItem cardBody>
                <ScrollView horizontal>
                  <ImageBackground source={{uri: `file://${dir}`}} style={{height: 150,width:width/2, flex: 1, justifyContent:'flex-end'}}>
                  <CardItem style={{ backgroundColor: 'transparent', height: 40, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <Left>
                      <Button transparent onPress={ () =>  this.sendFile(shareOptions)}>
                        <Icon active name="md-share" style = {{color: 'white', fontSize: 30}}/>
                      </Button>
                    </Left>
                    <Right>
                      <Button transparent onPress={ () =>  downloadFiles(dir,this.props.image_url)}>
                        <Icon active name="md-download" style = {{color: 'white', fontSize: 30}}/>
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
    margin: 5,
    minWidth: 170,
    maxWidth: 170,
    height: 150,
    maxHeight:150,
    backgroundColor: 'red',
    }
});