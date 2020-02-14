import React, { Component } from 'react';
import { Icon, Text, Card, Thumbnail } from 'native-base';
import { View, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { DrawerLayoutAndroid } from 'react-native'
import WithContainer from '../../component/Container';
import { MENU, HEART } from "../../config/icons";
import SideMenu from "../../component/sideMenu";
import Ripple from 'react-native-material-ripple';

export default class ListIconExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      basic: true,
      listViewData: [],
      data: [
        { path: "Images", name: "Whats App Image Status", image: require("../../images/wappimage.png") },
        { path: "Videos", name: "Whats App Video Status", image: require("../../images/wappvideo.png") },
        { path: "Daily Status", name: "Daily Image Status", image: require("../../images/list.png") },
        { path: "Daily Status", name: "Daily Video Status", image: require("../../images/status.png") },
      ]
    };
    this.drawer = null;
    this.currentlyOpenSwipeable = null;
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
          // rightIcon={HEART}
          contentStyle={{ padding: 0, margin: 0, backgroundColor: "white" }}
          content={true}
        >
          <View style={styles.container}>
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.data}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={({ item }) => {
                return (

                  <Card style={styles.card} onPress={() => { }}>
                    <Image resizeMode="contain" style={styles.image} source={item.image} />
                    <View style={styles.cardContent}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.count}>{}</Text>
                      <Ripple style={styles.followButton} onPress={() => navigation.navigate(item.path)}>
                        <Text style={styles.followButtonText}>View now</Text>
                      </Ripple>
                    </View>

                  </Card>

                )
              }} />
          </View>
        </WithContainer ></DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: "#fff"
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10
  },
  image: {
    width: 80,
    height: 80,
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  card: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    borderRadius: 5,
  },

  name: {
    fontSize: 16,
    flex: 1,
    alignSelf: 'center',
    color: "#01776a",
    fontWeight: 'bold'
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: "#6666ff"
  },
  followButton: {
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 6,
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "#01776a",
    fontSize: 12,
    fontWeight: 'bold'
  },
});  