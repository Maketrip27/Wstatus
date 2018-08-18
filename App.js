/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, StatusBar,View} from 'react-native';
import { Provider } from 'react-redux';
import NavigationStack from "./src/navigation/router";
import configureStore from './src/store/store'
import CONFIG from './src/config/config';

const { store } = configureStore();

export default class App extends Component{
  constructor() {
    super();
    StatusBar.setBackgroundColor(CONFIG.themeColor, true);
    StatusBar.setHidden(false, 'none');
  }
  
  render() {
    return (
      <Provider store={store} >
        <NavigationStack/>
      </Provider>
    );
  }
}
