import React, {Component} from 'react';
import {
  Body,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail,
} from 'native-base';

import {View,Linking} from 'react-native';

import CONFIG from '../config/config.js';
import { shareThisApp} from '../utils/helper.js';

export default class SideMenu extends Component {

  constructor(props) {
    super(props);
    this.state ={
      side_menu: false
    };
  }

  navigate = () =>{

  }
  render(){
    return(
      <View style={{flex:1,justifyContent: 'center'}}>
        <Content >
            <View  style={{flex:1,justifyContent:'center',alignItems:'center', flexDirection:'column', backgroundColor:CONFIG.themeColor, height:150, padding:25}}>
              <Thumbnail medium  source={require('../images/ic_launcher.png')} style={{height: 80,width:80}}/>
              <View style={{marginLeft: 15, marginTop:10}}>
              <Text style={{color: CONFIG.textColor, fontSize:15}}>Instant Status Saver</Text>
              </View>
            </View>
          <List>
            <ListItem icon  onPress={()=> shareThisApp(CONFIG.shareUrl)}>
              <Left>
                <Icon name="md-share" style={{color:  CONFIG.themeColor}}/>
              </Left>
              <Body>
              <Text >Share this app</Text>
              </Body>
              <Right/>
            </ListItem>
            <ListItem icon  onPress={()=>Linking.openURL(CONFIG.shareUrl)}>
              <Left>
                <Icon name="md-star-half" style={{color:  CONFIG.themeColor}}/>
              </Left>
              <Body>
              <Text >Rate Us</Text>
              </Body>
              <Right/>
            </ListItem>
          </List>
        </Content>
      </View>
    );
  }
}