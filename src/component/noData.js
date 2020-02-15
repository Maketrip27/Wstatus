import React, {Component} from 'react';
import {Icon,Text} from 'native-base';

import {View} from 'react-native';
import LottieView from 'lottie-react-native';

export default class NoData extends Component {
  render() {
    return (
      <View>
 
        <View>
        <LottieView
            source={require('../animation/crying.json')}
            autoPlay
            style={{left:10,width:200}}
            loop
          />
          <Text style={styles.boldTextStyle}> 
            {this.props.message}
          </Text>
          {this.props.whatsApp === undefined ?
          <Text style={styles.boldTextStyle}> 
            Please view status on What's App. 
          </Text>: null}
        </View>
      </View>
    );
  }
}

let styles = {
  boldTextStyle: {
    fontSize: 16, 
    alignSelf: 'center',
    color: '#3f3f3f'
  },
  grayTextStyle: {
    marginBottom: 5, 
    fontSize: 13, 
    color: '#a8a8a8',
    alignSelf: 'center'
  },
  feedIcon: {
    color: "#006055", 
    alignSelf: 'center', 
    fontSize: 100, 
    marginBottom: 20
  }
};