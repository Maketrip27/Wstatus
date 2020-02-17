import React, { Component } from 'react';
import { Icon, Text, Card, Thumbnail, CardItem, Body } from 'native-base';
import { View, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { DrawerLayoutAndroid } from 'react-native'
import WithContainer from '../../component/Container';
import { MENU, HEART } from "../../config/icons";
import SideMenu from "../../component/sideMenu";
import Ripple from 'react-native-material-ripple';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from "../../component/Slider";
import styles1, { colors } from '../../component/Slider/styles/index.style';
import { sliderWidth, itemWidth } from '../../component/Slider/styles/SliderEntry.style';


const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg'
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg'
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
  },
  {
    title: 'Middle Earth, Germany',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/lceHsT6l.jpg'
  }
];

export default class ListIconExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      basic: true,
      listViewData: [],
      data: [
        { path: "Images", name: "Whats App Image Status", image: require("../../images/wappimage.png") },
        { path: "Videos", name: "Whats App Video Status", image: require("../../images/wappvideo.png") },
        { path: "DailyStatus", name: "Daily Image Status", image: require("../../images/list.png") },
        { path: "DailyStatus", name: "Daily Video Status", image: require("../../images/status.png") },
      ]
    };
    this.drawer = null;
    this.currentlyOpenSwipeable = null;
  }

  _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
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
            <Card style={{ padding: 0 }}>
              <CardItem footer bordered>
                <Text style={{ color: '#01776a', fontWeight: 'bold' }}>Daily Image Status</Text>
              </CardItem>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={ENTRIES1}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages={true}
                firstItem={1}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                // inactiveSlideShift={20}
                containerCustomStyle={styles1.slider}
                contentContainerCustomStyle={styles1.sliderContentContainer}
                // loop={true}
                // loopClonesPerSide={2}
                // autoplay={true}
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
              />
            </Card>
            <Card>
              <CardItem footer bordered>
                <Text style={{ color: '#01776a', fontWeight: 'bold' }}>Daily Video Status</Text>
              </CardItem>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={ENTRIES1}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages={true}
                firstItem={1}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                // inactiveSlideShift={20}
                containerCustomStyle={styles1.slider}
                contentContainerCustomStyle={styles1.sliderContentContainer}
                loop={true}
                // loopClonesPerSide={2}
                autoplay={true}
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
              />
            </Card>
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
    backgroundColor: "#fff",
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
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
  safeArea: {
    flex: 1,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  scrollview: {
    flex: 1
  },
  exampleContainer: {
    paddingVertical: 30
  },
  exampleContainerDark: {
    backgroundColor: 'black'
  },
  exampleContainerLight: {
    backgroundColor: 'white'
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  titleDark: {
    color: 'black'
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  slider: {
    marginTop: 15,
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
  }
});  