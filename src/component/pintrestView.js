import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacings, View, Card, Text, Image, Constants, } from 'react-native-ui-lib';
import _ from 'lodash';
import { downloadFiles, shareFile, getFilePath } from '../utils/helper.js';
import FastImage from 'react-native-fast-image'
import { Button, Icon, } from 'native-base';


Spacings.loadSpacings({
  page: 10
});

const GUTTER_SIZE = Spacings.page;
const COLUMN_SIZE = (Constants.screenWidth - 2 * Spacings.page - GUTTER_SIZE) / 2;

// const ActionButton = ({ onClick, icon }) => (
//   <Button transparent onPress={onClick}>
//     <Icon active name={icon} style={{ marginBottom: 10, color: 'white', fontSize: 20 }} />
//   </Button>
// )

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
    _.map(imageList, (image, index) => {
      Image.getSize(getFilePath(image, isUrl),
        (width, height) => {
          console.log(width)
          images[index] = {
            uri: getFilePath(image, isUrl),
            width,
            height,
            aspectRatio: width / height,
            isUrl,
            filePath: image,

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
            isUrl
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
        onPress={() => navigate && navigate("Priview", { isUrl: image.isUrl, shareUrl: image.filePath, url: image.uri })}
      >
        <FastImage
          style={[styles.image, { aspectRatio: image.aspectRatio, justifyContent: 'flex-end' }]}
          source={{ uri: image.uri }}
          width={COLUMN_SIZE}
        >
          {/* <View height={30} style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
            height: 30,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          >
            <ActionButton icon="md-share-alt" onClick={() => shareFile(image.filePath, image.isUrl)} />
            <ActionButton icon="md-download" onClick={() => downloadFiles(image.filePath, image.isUrl)} />
          </View> */}
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
    borderRadius: 10
  }
});

export default Pinterest;
