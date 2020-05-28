import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacings, View, Card, Text, Image, Constants, } from 'react-native-ui-lib';
import _ from 'lodash';
import { getFilePath } from '../utils/helper.js';
import FastImage from 'react-native-fast-image'
import { Button, Icon, } from 'native-base';


Spacings.loadSpacings({
  page: 10
});

const GUTTER_SIZE = Spacings.page;
const COLUMN_SIZE = (Constants.screenWidth - 2 * Spacings.page - GUTTER_SIZE) / 2;

class Pinterest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { data, isUrl } = props
    this.loadImages(data, isUrl)
  }

  static options() {
    return {
      topBar: {
        background: {
          color: 'transparent'
        },
        backButton: {
          color: Colors.dark10
        }
      }
    };
  }

  loadImages(imageList, isUrl) {
    const images = {};
    _.map(imageList, ({ image, code }, index) => {
      Image.getSize(getFilePath(image, isUrl),
        (width, height) => {
          images[index] = {
            uri: getFilePath(image, isUrl),
            width,
            height,
            aspectRatio: width / height,
            isUrl,
            filePath: image,
            code
          };
          if (_.size(images) === imageList.length) {
            this.setState({ images: _.values(images) });
          }
        },
        () => {
          images[index] = {
            uri: getFilePath(image, isUrl),
            width: COLUMN_SIZE,
            height: COLUMN_SIZE,
            aspectRatio: 1,
            filePath: image,
            isUrl,
            code
          };
        });
    });
  }

  renderImage(image) {
    const { navigate } = this.props;
    return (
      <Card
        key={image.uri}
        borderRadius={10}
        enableShadow
        marginB-page
        useNative
        activeScale={0.98}
        activeOpacity={1}
        onPress={() =>
          navigate &&
          navigate("VideoPreview", {
            code: image.code,
            thumbnail: image.filePath,
            url: image.filePath,
            shareUrl: image.filePath,
            isUrl: image.isUrl
          }
          )}
      >
        <FastImage
          style={[styles.image, { aspectRatio: image.aspectRatio }]}
          source={{ uri: image.uri }}
          width={COLUMN_SIZE}
        >
          <Button
            style={styles.centerButton}
            transparent
            onPress={() =>
              navigate &&
              navigate("VideoPreview", {
                code: image.code,
                thumbnail: image.filePath,
                url: image.uri,
                shareUrl: image.filePath,
                isUrl: image.isUrl
              }
              )
            }
          >
            <Icon active name="md-play" style={{ color: 'white', fontSize: 18 }} />
          </Button>
        </FastImage>
      </Card>
    );
  }

  renderColumn(columnIndex) {
    const { images } = this.state;
    return (
      <View marginR-page={columnIndex === 0}>
        {_.map(images, (image, index) => {
          if (index % 2 === columnIndex) {
            return this.renderImage(image);
          }
        })}
      </View>
    );
  }

  render() {
    const { images } = this.state;
    if (!images) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        <View padding-page row>
          {this.renderColumn(0)}
          {this.renderColumn(1)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: COLUMN_SIZE,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3f7f5'
  },
  centerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.60)',
    borderRadius: 30,
    zIndex: 5,
  },
});

export default Pinterest;
