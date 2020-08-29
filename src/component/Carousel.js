import React, { Component } from 'react';
import { Icon, Text } from 'native-base';
import { ScrollView, TouchableOpacity,  } from 'react-native';
import SliderEntry from "./Slider";
import _ from 'lodash';
import { View } from 'react-native-ui-lib';
import { Card } from 'react-native-ui-lib';
import { NavigationActions } from "react-navigation";


export default class CarouselView extends Component {
  _navigate = (name, params) => {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: params
    });
    this.props.navigation.dispatch(navigate);
  }
  _renderItem = ({ item, index }, parallaxProps) => {
    const { navigation } = this.props;
    return (
      <SliderEntry
        key={"carouse" + index}
        data={item}
        cols={3}
        even={(index + 1) % 2 === 0}
        parallaxProps={parallaxProps}
        onClickItem={(item) => this._navigate(item.path, { ...item })}
      />
    );
  }
  render() {
    const { navigation, data, dataKey,  title } = this.props;
    return (
      <View
        style={{ width: "100%", padding: 0 }}
      >
      <Card
        onPress={null}
        // enableShadow
        // marginB-page
        // useNative
        // activeScale={0.98}
        // activeOpacity={1}
        borderRadius={5}
        containerStyle={{ margin: 5, backgroundColor: 'white'}}
      >
        <View
          style={{ 
            padding: 5, 
            flex: 1, 
            justifyContent: 'space-between', 
            flexDirection: 'row',
            backgroundColor: '#f5f5f5'
          }}
        >
          <Text 
            style={{ color: 'black', fontWeight: '600' }}
            onPress={() => navigation && navigation.push("DailyStatus", { data: dataKey, title })}
          >
            {title}
          </Text>
          <Icon
            name="arrow-forward"
            style={{ color: "black",fontSize: 20, fontWeight:'bold' }}
            fontSize={20}
            onPress={() => navigation && navigation.push("DailyStatus", { data: dataKey, title })}
          />
        </View>
        <ScrollView 
          style={{ height: 'auto', padding: 5,  }} 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
        >
          {_.shuffle(data).map((item, index) => this._renderItem({ item, index }))}
        </ScrollView>
        </Card>
      </View >

    );
  }
}
