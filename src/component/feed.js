import React, { Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import { CardItem,Button, Left,Right,Icon,List} from 'native-base';
import {downloadFiles, shareFile,getFilePath } from '../utils/helper.js';
import FastImage from 'react-native-fast-image'

const {height, width} = Dimensions.get('window');
export class Feed extends Component {
  render() {
    return (
            <List style={styles.gird} key={this.props.id+"list"}>
              <TouchableWithoutFeedback 
                button 
                cardBody 
                key={this.props.id+"ci"+this.props.for_key} 
                onPress={()=>this.props.navigate("Priview",{isUrl: this.props.isUrl, shareUrl: this.props.image_url, url: getFilePath(this.props.image_url,  this.props.isUrl)})}>
                  <FastImage key={this.props.id+"img"+this.props.for_key} source={{uri: getFilePath(this.props.image_url, this.props.isUrl)}} style={{height: 150,width:width/3 - 5, flex: 1, justifyContent:'flex-end',backgroundColor: '#e3f7f5'}}>
                  <CardItem key={this.props.id+"CII"+this.props.for_key} style={{ backgroundColor: 'transparent', height: 30, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <Left key={this.props.id+"left"+this.props.for_key}>
                      <Button key={this.props.id+"btn"+this.props.for_key} transparent onPress={ () =>  shareFile(this.props.image_url, this.props.isUrl)}>
                        <Icon key={this.props.id+"icon"+this.props.for_key} active name="md-share-alt" style = {{color: 'white', fontSize: 23}}/>
                      </Button>
                    </Left>
                    <Right key={this.props.id+"right"+this.props.for_key}>
                      <Button key={this.props.id+"rbtn"+this.props.for_key} transparent onPress={ () =>  downloadFiles(this.props.image_url, this.props.isUrl)}>
                        <Icon key={this.props.id+"ricon"+this.props.for_key} active name="md-download" style = {{color: 'white', fontSize: 23}}/>
                      </Button>
                    </Right>
                  </CardItem>
                  </FastImage>
              </TouchableWithoutFeedback>
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
    marginLeft: 2,
    marginRight:2,
    marginBottom:2,
    marginTop:2,
    minWidth: width/3-5,
    maxWidth: width/3-5,
    height: 150,
    maxHeight:150,
    }
});