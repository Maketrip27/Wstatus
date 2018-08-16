/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text} from 'react-native';
import { Provider } from 'react-redux';
import NavigationStack from "./src/navigation/router";

import configureStore from './src/store/store'
const { store } = configureStore();

type Props = {};
export default class App extends Component{
  constructor() {
    super();
  }
  
  render() {
    return (
      <Provider store={store} >
        <NavigationStack/>
      </Provider>
    );
  }
}
