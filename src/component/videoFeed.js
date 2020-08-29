import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import { CardItem, Button, Left, Right, Icon, List, Card } from 'native-base';
import { getWhatsappStatusDirectory, downloadFiles, shareFile, getFilePath } from '../utils/helper.js';
import RNThumbnail from 'react-native-thumbnail';
import FastImage from 'react-native-fast-image'

const { height, width } = Dimensions.get('window');

export class VideoFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { thumbnail: undefined }
    this.thumbnail = "null";
  }
  render() {
    const { isUrl, video_url, code } = this.props;
    let filePath = getFilePath(video_url, isUrl);
    return (
      <Card style={{ marginTop: 2, marginBottom: 2 }}>
        <List style={styles.gird} key={this.props.id + "list"}>
          <CardItem cardBody key={this.props.id + "ci"}>
            <FastImage
              key={this.props.id + "img"}
              source={{ uri: filePath }}
              style={styles.FastImage}
            >
              <Button
                style={styles.centerButton}
                key={this.props.id + "btn"} transparent
                onPress={() => this.props.navigate("VideoPreview", { code: code, thumbnail: filePath, url: filePath, shareUrl: this.props.video_url, isUrl: isUrl })}
              >
                <Icon key={this.props.id + "icon"} active name="md-play" style={{ color: 'white', fontSize: 15 }} />
              </Button>
              {isUrl ? null :
                <CardItem
                  key={this.props.id + "CII"}
                  style={styles.sharePanel}
                >
                  <Left key={this.props.id + "left"}>
                    <Button key={this.props.id + "btn"} transparent onPress={() => shareFile(this.props.video_url, isUrl, "video/mp4")}>
                      <Icon key={this.props.id + "icon"} active name="md-share-alt" style={{ color: 'white', fontSize: 18 }} />
                    </Button>
                  </Left>
                  <Right key={this.props.id + "right"}>
                    <Button key={this.props.id + "rbtn"} transparent onPress={() => downloadFiles(this.props.video_url, isUrl, ".mp4")}>
                      <Icon key={this.props.id + "ricon"} active name="md-download" style={{ color: 'white', fontSize: 18 }} />
                    </Button>
                  </Right>
                </CardItem>}
            </FastImage>
          </CardItem>
        </List>
      </Card>
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
  gird: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 2,
    marginTop: 2,
    minWidth: width / 2 - 5,
    maxWidth: width / 2 - 5,
    height: 150,
    maxHeight: 150,
  },
  centerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.60)',
    borderRadius: 25,
    zIndex: 5,
  },
  sharePanel: {
    backgroundColor: 'transparent',
    height: 30,
    width: width / 2 - 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignContent: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  FastImage: { height: 150, width: width / 2 - 5, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e3f7f5' }
});
