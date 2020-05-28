import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import { CardItem, Button, Left, Right, Icon, List, Card } from 'native-base';
import { downloadFiles, shareFile, getFilePath } from '../utils/helper.js';
import FastImage from 'react-native-fast-image'

const { height, width } = Dimensions.get('window');
const Feed = (props) => {
  return (
    <Card style={{ marginTop: 2, marginBottom: 2 }}>
      <List style={styles.gird} key={props.id + "list"}>
        <TouchableWithoutFeedback
          button
          cardBody
          key={props.id + "ci" + props.for_key}
          onPress={() => props.navigate("Priview", { isUrl: props.isUrl, shareUrl: props.image_url, url: getFilePath(props.image_url, props.isUrl) })}>
          <FastImage key={props.id + "img" + props.for_key} source={{ uri: getFilePath(props.image_url, props.isUrl) }} style={{ height: 150, width: width / 2 - 5, flex: 1, justifyContent: 'flex-end', backgroundColor: '#e3f7f5' }}>
            <CardItem key={props.id + "CII" + props.for_key} style={{ backgroundColor: 'transparent', height: 30, backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <Left key={props.id + "left" + props.for_key}>
                <Button key={props.id + "btn" + props.for_key} transparent onPress={() => shareFile(props.image_url, props.isUrl)}>
                  <Icon key={props.id + "icon" + props.for_key} active name="md-share-alt" style={{ color: 'white', fontSize: 18 }} />
                </Button>
              </Left>
              <Right key={props.id + "right" + props.for_key}>
                <Button key={props.id + "rbtn" + props.for_key} transparent onPress={() => downloadFiles(props.image_url, props.isUrl)}>
                  <Icon key={props.id + "ricon" + props.for_key} active name="md-download" style={{ color: 'white', fontSize: 18 }} />
                </Button>
              </Right>
            </CardItem>
          </FastImage>
        </TouchableWithoutFeedback>
      </List>
    </Card>
  );

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
  gird: {
    flex: 1,
    marginLeft: 1,
    marginRight: 1,
    marginBottom: 1,
    marginTop: 1,
    minWidth: width / 2 - 5,
    maxWidth: width / 2 - 5,
    height: 150,
    maxHeight: 150
  }
});

export default Feed;
