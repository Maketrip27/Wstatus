import React, { Component } from 'react';
import { View, StyleSheet, DrawerLayoutAndroid } from "react-native";
import {  Button, Icon, Text } from 'native-base';
import WithContainer from '../../component/Container';
import { MENU } from "../../config/icons";
import SideMenu from "../../component/sideMenu";
import InstaStatus from '../../config/instaStatus';
import CarouselView from "../../component/Carousel";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.drawer = React.createRef();;
    
  }

  render() {
    const { navigation } = this.props;
    return (
      // <DrawerLayoutAndroid
      //   ref={this.drawer}
      //   drawerWidth={300}
      //   drawerPosition={"left"}
      //   renderNavigationView={() => <SideMenu />}>
        <WithContainer
          hideHeader={true}
          title={"Share Status"}
          leftClick={() =>{ 
            console.log(this.drawer, this.drawer.current)
            this.drawer.current.openDrawer()
          }}
          onRightClick={() => navigation.navigate("FavData")}
          leftIcon={MENU}
          contentStyle={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
          content={true}
          // outSideContent={<SideMenu/>}
        >
          <SideMenu/>
          <View style={styles.container}>
            <CarouselView
              title="Trending Image Status"
              data={InstaStatus.imageStatus}
              dataKey="imageStatus"
              navigation={navigation}
            />
            <CarouselView
              title="Trending Video Status"
              data={InstaStatus.videoStatus}
              dataKey="videoStatus"
              navigation={navigation}
            />
            <CarouselView
              title="Whats App Status"
              data={InstaStatus.whatsApp}
              dataKey="whatsApp"
              navigation={navigation}
            />
          </View>
          
        </WithContainer >
      // </DrawerLayoutAndroid >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: "#fff",
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  }
});  
