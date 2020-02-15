import React from 'react';
import {
  Header, Left, Body, Icon, Text, Right
} from 'native-base';
import Ripple from 'react-native-material-ripple';
import theme from '../config/config';

const AppHeader = ({ title, onLeftClick, leftIcon, rightIcon, onRightClick }) => (
  <Header androidStatusBarColor={theme.themeColor} style={{ backgroundColor: theme.themeColor, elevation: 5, height: 50 }}>
    {onLeftClick ? (
      <Left style={{ flex: 1 }}>
        <Ripple onPress={onLeftClick} rippleCentered>
          <Icon
            type="Ionicons"
            name={leftIcon}
            style={{ color: 'white', padding: 8, fontSize: 22 }}
          />
        </Ripple>
      </Left>
    ) : <Left style={{ flex: 1 }} />}
    <Body style={{ flex: 3, justifyContent: 'flex-start', marginLeft: 0 }}>
      <Text style={{
        color: 'white', fontWeight: 'bold', fontSize: 15
      }}
      >
        {title}
      </Text>
    </Body>
    {onRightClick ? (
      <Right style={{ flex: 1 }}>
        <Ripple onPress={onRightClick} rippleCentered>
          <Icon
            type="Ionicons"
            name={rightIcon}
            style={{ color: 'white', padding: 8, fontSize: 22 }}
          />
        </Ripple>
      </Right>
    ) : <Right style={{ flex: 1 }} />}
  </Header>
);

export default AppHeader;