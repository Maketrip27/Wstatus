import React, {Component} from 'react';
import {Icon,Text} from 'native-base';

import {View} from 'react-native';

export default class NoData extends Component {
  render() {
    return (
      <View style={{marginBottom: 40}}>
        <Icon 
          name="md-paper" 
          style={styles.feedIcon}
        />
        <View style={{marginBottom: 20}}>
          <Text style={styles.boldTextStyle}> 
            {this.props.message}
          </Text>
        </View>
      </View>
    );
  }
}

let styles = {
  boldTextStyle: {
    marginBottom: 5, 
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