import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Button} from 'native-base';
import { NavigationActions } from "react-navigation";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Splash,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class SplashComponent extends Component {
  constructor() {
    super();
  }
  componentWillMount(){
    console.log(this.props)
    this.props.fetchWhatsAppFiles()
  }
  _navigate(name) {
    // this.props.navigator.push({
    //   name: name,
    //   passProps: {
    //     msg: msg_obj
    //   }
    // })
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: {}
    });
    this.props.navigation.dispatch(navigate);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcomeghgj to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
            <Button 
              style={{justifyContent:'center',borderRadius:10, marginTop: 25, marginBottom: 20, marginLeft:15,width:285,borderWidth:1 }} 
              onPress={ () => this._navigate('AppIntro') }
            >
             <Text>SIGN IN</Text>
            </Button>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
