import React from 'react';
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
  Button
} from 'native-base';
import {View,Linking} from 'react-native';
import CONFIG from '../config/config.js';
import { shareThisApp} from '../utils/helper.js';

const ActionButton = ({onClick, icon, title})=>{
  return(
    <Button transparent style={{flex: 1,marginLeft:12}} onPress={onClick}>
      <Text uppercase={false} style={{color: CONFIG.textColor, fontSize:15}}>
        <Icon 
          name={icon}
          style={{color: CONFIG.textColor, fontSize:20}} 
        />
          {"  "}{title}
      </Text>
   </Button>
  )
}
 const SideMenu = () => {
    return(
      <View style={{flex:1,justifyContent: 'center'}}>
        <Content >
            <View  
              style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column', 
                backgroundColor:CONFIG.themeColor, 
                height:'auto', 
                padding:10
              }}>
              <Thumbnail medium  source={require('../images/ic_launcher.png')} style={{height: 80,width:80}}/>
              <View style={{marginLeft: 15, marginTop:10}}>
                <Text style={{color: CONFIG.textColor, fontSize:22}}>Share Status</Text>
              </View>
              <View 
                style={{ 
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: "100%",
                  top:5,
                }}
                >
                <ActionButton 
                  icon="md-share" 
                  title="Share this app"
                  onClick={()=> shareThisApp(CONFIG.shareUrl)}
                />
                <View style={{height:'auto', borderRightWidth:0.3, borderRightColor: '#e0f2f1'}}/>
                <ActionButton 
                  icon="md-star-half" 
                  title="Rate this app"
                  onClick={()=>Linking.openURL(CONFIG.shareUrl)}
                />
              </View>
            </View>
          {/* <List>
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
          </List> */}
        </Content>
      </View>
    );
  }
  export default SideMenu;
