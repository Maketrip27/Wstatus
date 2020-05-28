import React, { Component } from 'react';
import { FlatList, StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import Feed from '../../component/feed.js';
import { Card, Text } from 'native-base';
import { NavigationActions } from "react-navigation";
import NoData from '../../component/noData';
import AdMopub from '../../component/AdMopub';
import Ad from '../../config/mopubAds';
import _ from 'lodash';
import WithContainer from '../../component/Container';
import { BACK_ARROW } from "../../config/icons";
import PintestView from "../../component/pintrestView";

const { width } = Dimensions.get('window');

export default class ImageListComponent extends Component {
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
    const { navigation, images } = this.props;
    return (
      <React.Fragment>
        <WithContainer
          title={"Whats App Image Status"}
          leftClick={() => navigation && navigation.goBack()}
          leftIcon={BACK_ARROW}
          contentStyle={{ padding: 0, margin: 0, backgroundColor: "white" }}
          content={true}
        >
          {/* {this.props.images.length > 0 ?
            <FlatList
              contentContainerStyle={styles.list}
              data={this.props.images}
              numColumns={2}
              keyExtractor={(item) => item.id}
              onEndReached={() => console.log("end reac")}
              onEndThreshold={1}
              renderItem={({ item, index }) => {
                return (<Feed key={index + "whatsapp"} for_key="Whats" image_url={item} id={index} navigate={this._navigate} />)
              }} /> : <NoData message="No status available." />} */}
          {images.length > 0 ? <PintestView
            data={images}
            isUrl={false}
            navigate={this._navigate}
          /> : <NoData message="No status available." />}
          {/* <AdMopub unitId={Ad.imageList} /> */}
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
