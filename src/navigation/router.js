import React from 'react';
import { TabNavigator, createStackNavigator,createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import Splash from '../screens/Splash/'
import AppIntro from '../screens/AppIntro/'
import ImageList from '../screens/ImageList/'
import VideoList from '../screens/VideoList/'
import Priview from '../screens/Priview';
import CONFIG from '../config/config';
import VideoPreview from '../screens/VideoPreview/index';

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
    activeBackgroundColor: CONFIG.themeColor,
    inactiveBackgroundColor: CONFIG.themeColor,
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
      navigationOptions: {
        cardStack: {
          gesturesEnabled: false,
        }
      }
    },
  Priview: {screen: Priview},
  VideoPreview: {
    screen: VideoPreview,
    cardStyle: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
      gesturesEnabled: false,
      headerLeft: null,
      gesturesDirection: 'inverted',
      cardStack: {
        gesturesEnabled: false,
      }
    },
    cardStyle: {
      backgroundColor: "#ffffff"
    }
});

export default NavigationStack;
