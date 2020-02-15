import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Button} from 'native-base';
import { NavigationActions } from "react-navigation";
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  title: {
    color: 'white'
  }
});

const slides = [
  {
    key: 'How to use this app ?',
    title: 'How to use this app ?',
    text: 'View Status from  Whats App and Open This App, you will see two tab Images and Videos list.',
    backgroundColor: '#01776a',
    titleStyle:styles.title,
    textStyle:styles.title,
    image: require('../../images/status.png'),
    imageStyle: styles.image,
  },
  {
    key: 'How To Share Status?',
    title: 'How to share status ?',
    text: 'Click On the Share icon on bottom of the every status to share.',
    backgroundColor: '#01776a',
    titleStyle:styles.title,
    textStyle:styles.title,
    image: require('../../images/share-option.png'),
    imageStyle: styles.image,
  },
  {
    key: 'How to Download status?',
    title: 'How to download status ?',
    text: 'Click on the Download icon on bottom of the every status to download.',
    backgroundColor: '#01776a',
    titleStyle:styles.title,
    textStyle:styles.title,
    image: require('../../images/download.png'),
    imageStyle: styles.image,
  },
  {
    key: 'Store',
    title: 'Downloaded Status',
    text: 'All the Downloaded status will be saved in the Whats App Status folder.',
    backgroundColor: '#01776a',
    titleStyle:styles.title,
    textStyle:styles.title,
    image: require('../../images/folder.png'),
    imageStyle: styles.image,
  }
];
export default class App extends Component {
    _navigate(name) {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: {}
    });
    this.props.navigation.dispatch(navigate);
  }
  _onDone = () => {
    this._navigate('Home')
  }
  
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
      />
    );
  }
}

