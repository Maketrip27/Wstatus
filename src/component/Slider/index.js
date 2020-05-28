import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './styles/SliderEntry.style';
import { Card } from 'react-native-ui-lib';

export default class SliderEntry extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image() {
    const { data: { image }, parallax, parallaxProps, even } = this.props;

    return parallax ? (
      <ParallaxImage
        source={image}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
        <Image
          source={image}
          // style={styles.image}
          style={{ top: 25, height: 50, width: 50, alignSelf: 'center' }}
        />
      );
  }
  getRandomColor() {
    // var letters = '0123456789ABCDEF';
    // var color = '#';
    // for (var i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';

  }
  render() {
    const { data } = this.props;
    const { data: { title, subtitle }, even, onClickItem } = this.props;

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, true ? styles.titleEven : {}]}
        numberOfLines={2}
      >
        {title}
      </Text>
    ) : false;

    return (
      <Card

        style={styles.slideInnerContainer}
        onPress={() => onClickItem && onClickItem(data)}
      >
        <View style={styles.shadow} />
        <View style={[styles.imageContainer, true ? styles.imageContainerEven : {}, { backgroundColor: this.getRandomColor() }]}>
          {this.image}
          {/* <View style={[styles.radiusMask, true ? styles.radiusMaskEven : {}]} /> */}
        </View>
        <View style={[styles.textContainer, true ? styles.textContainerEven : {}]}>
          {uppercaseTitle}
        </View>
        {/* </TouchableOpacity> */}
      </Card>
    );
  }
}
