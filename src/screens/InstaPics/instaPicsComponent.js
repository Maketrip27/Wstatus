import React, { Component } from 'react';
import { Container, Content, Text, Card, CardItem, Icon } from 'native-base';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
const { height, width } = Dimensions.get('window');
// import Ad from '../../config/ad';
import Config from '../../config/config';

import { NavigationActions } from "react-navigation";
import AdMopub from '../../component/AdMopub';
import Ad from '../../config/mopubAds';
import InstaStatus from '../../config/instaStatus';

export default class InstaPicsComponent extends Component {
  _navigate = (name, params) => {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: params
    });
    this.props.navigation.dispatch(navigate);
  }

  imageStatus = () => {
    return (
      <View>
        <Card >
          <CardItem header bordered style={{ paddingLeft: 0, height: 18 }}>
            <Icon style={{ color: Config.themeColor, paddingLeft: 5 }} name="md-images" />
            <Text style={{ color: Config.themeColor, fontSize: 18 }}>Image Status</Text>
          </CardItem>
          <View style={styles.container}>
            {InstaStatus.imageStatus.map((item, index) => {
              return (
                <TouchableWithoutFeedback key ={"img-list"+index} onPress={() => this._navigate('InstaPreviewList', { title: item.title, tag: item.tag, video: false })}>
                  <Card style={styles.menuBox}>
                    <Image style={styles.icon} source={item.image} />
                    <Text style={styles.info}>{item.title}</Text>
                  </Card>
                </TouchableWithoutFeedback>)
            })}
          </View>
        </Card>
        <Card style={{ borderRadius: 5 }}>
          <CardItem header bordered style={{ paddingLeft: 0, height: 18 }}>
            <Icon style={{ color: Config.themeColor, paddingLeft: 5 }} name="md-videocam" />
            <Text style={{ color: Config.themeColor, fontSize: 18 }}>Video Status</Text>
          </CardItem>
          <View style={styles.container}>
          {InstaStatus.videoStatus.map((item, index) => {
              return (
                <TouchableWithoutFeedback key ={"vid-list"+index} onPress={() => this._navigate('StatusVideoList', { title: item.title, tag: item.tag, video: false })}>
                  <Card style={styles.menuBox}>
                    <Image style={styles.icon} source={item.image} />
                    <Text style={styles.info}>{item.title}</Text>
                  </Card>
                </TouchableWithoutFeedback>)
            })}
          </View>
        </Card>
      </View>
    )
  }
  render() {
    return (
      <Container>
        <Content>
          {/* <AdMopub unitId={Ad.dailyStatus}/> */}
          {this.imageStatus()}
          <AdMopub unitId={Ad.dailyStatus} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  menuBox: {
    width: width / 3 - 9,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 5

  },
  icon: {
    width: 40,
    height: 40,
  },
  info: {
    top: 5,
    fontSize: 12,
    color: "black",
    fontWeight: 'bold'
  }
});