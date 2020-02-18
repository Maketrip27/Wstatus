import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { DrawerLayoutAndroid } from 'react-native'
import WithContainer from '../../component/Container';
import { MENU } from "../../config/icons";
import SideMenu from "../../component/sideMenu";
import InstaStatus from '../../config/instaStatus';
import CarouselView from "../../component/Carousel";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.drawer = null;
  }

  render() {
    const { navigation } = this.props;
    return (
      <DrawerLayoutAndroid
        ref={(ref) => {
          this.drawer = ref;
        }}
        drawerWidth={300}
        renderNavigationView={() => <SideMenu />}>
        <WithContainer
          title={"Share Status"}
          leftClick={() => this.drawer && this.drawer.openDrawer()}
          onRightClick={() => navigation.navigate("FavData")}
          leftIcon={MENU}
          contentStyle={{ padding: 0, margin: 0, backgroundColor: "white" }}
          content={true}
        >
          <View style={styles.container}>
            <CarouselView
              title="Trending Image Status"
              data={InstaStatus.imageStatus}
              navigation={navigation}
            />
            <CarouselView
              title="Trending Video Status"
              data={InstaStatus.videoStatus}
              navigation={navigation}
            />
            <CarouselView
              title="Whats App Status"
              data={InstaStatus.whatsApp}
              navigation={navigation}
            />
          </View>
        </WithContainer >
      </DrawerLayoutAndroid >
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