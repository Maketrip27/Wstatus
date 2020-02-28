import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Icon } from 'native-base';
import Splash from '../screens/Splash/'
import AppIntro from '../screens/AppIntro/'
import ImageList from '../screens/ImageList/'
import VideoList from '../screens/VideoList/'
import Priview from '../screens/Priview';
import CONFIG from '../config/config';
import VideoPreview from '../screens/VideoPreview/index';
import InstaPics from '../screens/InstaPics/instaPicsComponent';
import InstaPreviewList from '../screens/InstaPreviewList/index';
import StatusVideoList from '../screens/StatusVideoList/index';
import Home from "../screens/Home/index";

// const Tabs = createBottomTabNavigator({
//   Images: {
//     screen: ImageList,
//     navigationOptions: {
//       tabBarIcon: ({ tintColor }) => (<Icon name='md-image' style={[{ color: tintColor }]} />
//       )
//     }
//   },
//   Videos: {
//     screen: VideoList,
//     navigationOptions: {
//       tabBarIcon: ({ tintColor }) => (<Icon name='md-videocam' style={[{ color: tintColor }]} />
//       )
//     }
//   },
//   'Daily Status': {
//     screen: InstaPics,
//     navigationOptions: {
//       tabBarIcon: ({ tintColor }) => (<Icon name='md-apps' style={[{ color: tintColor }]} />
//       )
//     }
//   }
// }, {
//   backBehavior: 'initialRoute',
//   tabBarPosition: 'bottom',
//   tabBarOptions: {
//     activeTintColor: '#ffffff',
//     activeBackgroundColor: CONFIG.themeColor,
//     inactiveBackgroundColor: CONFIG.themeColor,
//     inactiveTintColor: '#d7e5e3',
//     showIcon: true,
//     labelStyle: { fontSize: 14 }

//   },
// });

const NavigationStack = createStackNavigator({
  // Splash: { screen: Splash },
  Home: {
    screen: Home,
  },
  AppIntro: { screen: AppIntro },
  Images: {
    screen: ImageList
  },
  Videos: {
    screen: VideoList
  },
  DailyStatus: {
    screen: InstaPics,
  },
  Priview: { screen: Priview },
  InstaPreviewList: { screen: InstaPreviewList },
  StatusVideoList: { screen: StatusVideoList },
  VideoPreview: {
    screen: VideoPreview,
    cardStyle: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    }
  }
},
  {
    headerMode: 'none',
    navigationOptions: {
      animationEnabled: false,
      transitionConfig: () => ({
        transitionSpec: {
          duration: 0,
          timing: 0,
        },
      })
    }
  });

const navigator = createSwitchNavigator(
  {
    Splash: { screen: Splash },
    NavigationStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Splash',
    navigationOptions: {
      headerVisible: true,
    },
    cardStyle: {
      backgroundColor: '#ffffff',
    },
  },
);

export default createAppContainer(navigator);
