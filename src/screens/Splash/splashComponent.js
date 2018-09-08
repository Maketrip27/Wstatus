import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  PermissionsAndroid,
  Image,
  AsyncStorage
} from 'react-native';
import {Button} from 'native-base';
import { NavigationActions } from "react-navigation";

import {getThumbnailfiles} from "../../utils/helper"
import LottieView from 'lottie-react-native';

export default class SplashComponent extends Component {
  constructor() {
    super();
    this.state={
      appIntro: true
    }
  }
  componentWillMount(){
    getThumbnailfiles()
    console.log(this.props)
    this.requestCameraPermission()
    AsyncStorage.getItem("introduction", (err, result) => {
      console.log("result=>>>>>>.", result)
      if (result !=null && result === 'true'){
        console.log("result is null");
         this.setState({appIntro: true});
       }else{
        AsyncStorage.setItem("introduction", 'true');
        this.setState({appIntro: false});
       }
    });
  }

  async  requestCameraPermission() {
    try {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
      ).then((result) => {
        console.log('result', result);
        if (Object.values(result).includes("denied")){
          this.requestCameraPermission()
        }else{
          this.props.fetchWhatsAppFiles()
          setTimeout(()=>{
            if (this.state.appIntro === true){
              this._navigate('Home')
            }else{
              this._navigate('AppIntro')
            }
          },3000)
        }
      })
    } catch (err) {
      console.warn(err)
    }
  }
  _navigate(name) {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: {}
    });
    this.props.navigation.dispatch(navigate);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../../images/ic_launcher.png")} style={{width: 100,height:100,bottom:40}}/>
          <LottieView
            source={require('../../animation/loading_dots.json')}
            style={{top:80}}
            autoPlay
            loop
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01776a',
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
