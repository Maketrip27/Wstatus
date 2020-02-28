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
import WithContainer from '../../component/Container';
import { BACK_ARROW } from "../../config/icons";
import { NavigationActions } from "react-navigation";
import AdMopub from '../../component/AdMopub';
import Ad from '../../config/mopubAds';
import InstaStatus from '../../config/instaStatus';
import CarouselView from "../../component/Carousel";
import SliderEntry from "../../component/Slider";

export default class InstaPicsComponent extends Component {
  _navigate = (name, params) => {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: params
    });
    this.props.navigation.dispatch(navigate);
  }

  imageStatus = (data) => {
    const { navigation } = this.props
    return (
      < View style={styles.container} >
        {
          data.map((item, index) => {
            return (
              <SliderEntry
                data={{ ...item, index }}
                index={index}
                onClickItem={(item) => navigation && navigation.push(item.path, { ...item })}
              />
            )
          })
        }
      </View >
    )
  }
  render() {
    // console.log(JSON.stringify(this.props.navigation.state.params))
    const { navigation } = this.props;
    const { data, title } = navigation.state.params
    return (
      <WithContainer
        title={title || "Share Status"}
        leftClick={() => navigation && navigation.goBack()}
        leftIcon={BACK_ARROW}
        contentStyle={{ flex: 1, padding: 0, margin: 0, backgroundColor: "white" }}
        content={true}
      >
        {this.imageStatus(data)}
        <AdMopub unitId={Ad.dailyStatus} />
      </WithContainer >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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