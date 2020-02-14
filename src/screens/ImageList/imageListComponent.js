import React, { Component } from 'react';
import { View, StyleSheet, AppState, Dimensions, BackHandler, Image, DrawerLayoutAndroid, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Feed } from '../../component/feed.js';
import { Container, Content, Button, Icon, Card, Text } from 'native-base';
import { NavigationActions } from "react-navigation";
import NoData from '../../component/noData';
import { containerStyle } from '../../utils/helper.js';
// import Ad from '../../config/ad';
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import SideMenu from '../../component/sideMenu.js';
import AdMopub from '../../component/AdMopub';
import Ad from '../../config/mopubAds';
import InstatStatus from '../../config/instaStatus';
import _ from 'lodash';
import WithContainer from '../../component/Container';
import { MENU, HEART, BACK_ARROW } from "../../config/icons";

const { height, width } = Dimensions.get('window');

export default class ImageListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActionButtonVisible: true,
      loading: true
    }
    this.totalAdd = 1;
  }

  componentDidMount() {
    // AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    // AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState !== "background") {
      this.props.fetchWhatsAppFiles()
      this.totalAdd = 0
    }
  }

  _navigate = (name, params) => {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: params
    });
    this.props.navigation.dispatch(navigate);
  }

  _onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
      ? 'down'
      : 'up'
    const isActionButtonVisible = direction === 'up'
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      this.setState({ isActionButtonVisible })
    }
    this._listViewOffset = currentOffset
  }

  renderCard = (item, index) => {
    let { title, tag, video, image } = item;
    return (
      <TouchableWithoutFeedback key={"quote" + index} onPress={() => this._navigate('InstaPreviewList', { title: title, tag: tag, video: video })}>
        <Card style={styles.menuBox}>
          <Image style={styles.icon} source={image} />
          <Text style={styles.info}>{title}</Text>
        </Card>
      </TouchableWithoutFeedback>
    )
  }
  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
        {/* <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        ref={(ref) => {
          this.drawer = ref;
        }}
        renderNavigationView={() => <SideMenu />}>
        <Container>
          <View style={{ height: 75 }}>
            <ScrollView style={{ flex: 1 }} horizontal={true} showsHorizontalScrollIndicator={false}>
              {_.shuffle(InstatStatus.imageStatus).map((item, index) => {
                return this.renderCard(item, index)
              })}
            </ScrollView>
          </View>
          <Content
            contentContainerStyle={containerStyle(this.props.images)}>
            {this.props.images.length > 0 ?
              <OptimizedFlatList
                contentContainerStyle={styles.list}
                data={this.props.images}
                numColumns={3}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => {
                  return (<Feed key={index + "whatsapp"} for_key="Whats" image_url={item} id={index} navigate={this._navigate} />)
                }} /> :
              <NoData message="No status available." />}
            <AdMopub unitId={Ad.imageList} />
          </Content>
        </Container>
      </DrawerLayoutAndroid> */}
        <WithContainer
          title={"Whats App Image Status"}
          leftClick={() => navigation && navigation.goBack()}
          leftIcon={BACK_ARROW}
          contentStyle={{ padding: 0, margin: 0, backgroundColor: "white" }}
          content={true}
        >
          {this.props.images.length > 0 ?
            <OptimizedFlatList
              contentContainerStyle={styles.list}
              data={this.props.images}
              numColumns={3}
              keyExtractor={(item, index) => item.id}
              onEndReached={() => console.log("end reac")}
              onEndThreshold={1}
              initialNumToRender={10}

              renderItem={({ item, index }) => {
                return (<Feed key={index + "whatsapp"} for_key="Whats" image_url={item} id={index} navigate={this._navigate} />)
              }} /> : <NoData message="No status available." />}
          <AdMopub unitId={Ad.imageList} />
        </WithContainer>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    margin: 1
  },
  floatButton: {
    width: 120,
    height: 30,
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 119, 106,0.8)',
    position: 'absolute',
    bottom: 10,
    right: (width / 2) - 60,
    borderRadius: 30,
    zIndex: 1
  },
  menuBox: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 5
  },
  icon: {
    width: 40,
    height: 40,
  },
  info: {
    top: 2,
    fontSize: 10,
    color: "black",
    fontWeight: 'bold'
  }
});
