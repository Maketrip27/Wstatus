import React from 'react';
import { TabNavigator, createStackNavigator,createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import Splash from '../screens/Splash/'
import AppIntro from '../screens/AppIntro/'
import ImageList from '../screens/ImageList/'
import VideoList from '../screens/VideoList/'

const Tabs = createBottomTabNavigator({
    Images: {
      screen: ImageList,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (<Icon name='md-image' style={[{color: tintColor}]}/>
        )
      }
    },
    Videos: {
      screen: VideoList,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (<Icon name='md-videocam' style={[{color: tintColor}]}/>
        )
      }
    }
  },{
  backBehavior: 'initialRoute',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#ffffff',
    activeBackgroundColor: '#006055',
    inactiveBackgroundColor: '#006055',
    inactiveTintColor: '#d7e5e3',
    showIcon:true,
      labelStyle: {fontSize: 14}

  },
});

const NavigationStack = createStackNavigator({
  Splash: {screen: Splash},
  AppIntro: {screen: AppIntro},
  Home: {
        screen: Tabs,
    }
  },
{
  initialRouteName: 'Splash',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    gesturesEnabled: false,
    headerLeft: null,
    gesturesDirection: 'inverted',
  },
  cardStyle: {
    backgroundColor: "#ffffff"
  }
});

export default NavigationStack;
