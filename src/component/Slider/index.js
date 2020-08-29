import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles/SliderEntry.style';
import { Card } from 'react-native-ui-lib';

const { width, height } = Dimensions.get('window');

export default class SliderEntry extends Component {

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

  render() {
    const { data } = this.props;
    const { data: { title, subtitle }, even, onClickItem, cols } = this.props;
    const { data: { image } } = this.props;
    return (
      <Card
        onPress={() => onClickItem && onClickItem(data)}
        enableShadow
        marginB-page
        useNative
        activeScale={0.98}
        activeOpacity={1}
        style={{ margin: 5,}}
      >
        <View 
          style={[
            styles.imageContainer, 
            { 
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              justifyContent: 'space-between', 
              backgroundColor: '#616161',
              width: (width / cols) - 14
            }
          ]}
        >
          <View style={[styles.textContainer]}>
          <Image
            source={image}
            style={{ 
              marginLeft: 5, 
              marginRight: 5, 
              top: 0,
              height: 20, 
              width: 20, 
              alignSelf: 'flex-start',
              shadowColor: 'red',
              shadowOffset: {width: 50, height: 50},
              shadowRadius: 5,
              marginBottom:10
            }}
          />
          {title && 
            <Text
              style={[styles.title]}
              numberOfLines={2}
            >
              {title}
            </Text>
          }
          </View>
        </View>
      </Card>
    );
  }
}
