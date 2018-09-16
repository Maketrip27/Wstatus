import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import {CardItem, Button, Left,Right,Icon,List} from 'native-base';
import { getWhatsappStatusDirectory,downloadFiles, shareFile,getFilePath } from '../utils/helper.js';
import RNThumbnail from 'react-native-thumbnail';
import FastImage from 'react-native-fast-image'

const {height, width} = Dimensions.get('window');

export class VideoFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {thumbnail: undefined}
    this.thumbnail = "null";
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps, "ddddddddd--")
  }
  componentDidMount(){
    console.log("props------------",this.props)
    let dir =  getWhatsappStatusDirectory() + '/'  + this.props.video_url;
    let  self=this;
    RNThumbnail.get(dir).then((result) => {
      console.log(result.path); // thumbnail path
      self.thumbnail =result.path
      self.setState({thumbnail: result.path})
    })
    console.log("hh",this.thumbnail,this.state.thumbnail)
  }
  render() {
    return (
            <List style={styles.gird} key={this.props.id+"list"}>
              <CardItem cardBody key={this.props.id+"ci"}>
                  <FastImage 
                    key={this.props.id+"img"} 
                    source={{uri: this.thumbnail}} 
                    style={styles.FastImage}
                  >
                    <Button 
                      style={styles.centerButton}
                      key={this.props.id+"btn"} transparent 
                      onPress={ () =>  this.props.navigate("VideoPreview",{thumbnail: this.thumbnail, url: getFilePath(this.props.video_url),shareUrl: this.props.video_url})}
                    >
                      <Icon key={this.props.id+"icon"} active name="md-play" style = {{color: 'white'}}/>
                    </Button>
                    <CardItem 
                      key={this.props.id+"CII"} 
                      style={styles.sharePanel}
                    >
                      <Left key={this.props.id+"left"}>
                        <Button key={this.props.id+"btn"} transparent onPress={ () =>  shareFile(this.props.video_url)}>
                          <Icon key={this.props.id+"icon"} active name="md-share-alt" style = {{color: 'white', fontSize: 23}}/>
                        </Button>
                      </Left>
                      <Right key={this.props.id+"right"}>
                        <Button key={this.props.id+"rbtn"} transparent onPress={ () =>  downloadFiles(this.props.video_url)}>
                          <Icon key={this.props.id+"ricon"} active name="md-download" style = {{color: 'white', fontSize: 23}}/>
                        </Button>
                      </Right>
                    </CardItem>
                  </FastImage>
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
    margin: 5
  },
  centerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.60)',
    borderRadius: 25,
    zIndex:5,
    left: width/2 - 30
  },
  sharePanel:{ 
    backgroundColor: 'transparent', 
    height: 30,
    width: width,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignContent:'flex-end', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  FastImage:{height: width/2,width: width, flex: 1,alignItems: 'center',justifyContent: 'center'}
});