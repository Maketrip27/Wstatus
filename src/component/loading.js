import React,{Component} from 'react';
import {
  Content, 
  Spinner,
  Text
} from 'native-base';
import CONFIG from '../config/config.js';
import LottieView from 'lottie-react-native';

export default class Loading extends Component {
  render() {
    return (
        <Content contentContainerStyle={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
          <LottieView
            source={require('../animation/loading_dots-color.json')}
            style={{}}
            autoPlay
            loop
          />
          <Text style={{top:30, color: CONFIG.themeColor}}>Please wait fetching video.</Text>
        </Content>
    );
  }
}