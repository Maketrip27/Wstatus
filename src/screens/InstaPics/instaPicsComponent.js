import React, { Component } from 'react';
import { Container,Content, Text,Card } from 'native-base';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import Ad from '../../config/ad';
import Config from '../../config/config';

import { NavigationActions } from "react-navigation";

const Quotes = [
  { name: "Good Morning", image: "../../images/sunrise.png", tag: "" },
  { name: "Good Evening", image: "../../images/evening.png", tag: "" },
  { name: "Good Night", image: "../../images/sky.png", tag: "" },
  { name: "Inpsirational", image: "../../images/lightbulb.png", tag: "" },
  { name: "Motivational", image: "../../images/motivate.png", tag: "" },
  { name: "Life Quotes", image: "../../images/pulse.png", tag: "" },
  { name: "Health Tips", image: "../../images/drug.png", tag: "" },
  { name: "Love Quotes", image: "../../images/in-love.png", tag: "" },
  { name: "Entertainement", image: "../../images/cinema.png", tag: "" },
]
export default class InstaPicsComponent extends Component {
  _navigate = (name, params) => {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: params
    });
    this.props.navigation.dispatch(navigate);
  }

  imageStatus = () =>{
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this._navigate('InstaPreviewList', { title: 'Good Morning', tag: 'morningquotes', video: false })}>
          <Card style={styles.menuBox}>
            <Image style={styles.icon} source={require("../../images/sunrise.png")} />
            <Text style={styles.info}>Good Morning</Text>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this._navigate('InstaPreviewList', { title: 'Good Night', tag: 'goodnightquotes', video: false })}>
          <Card style={styles.menuBox}>
            <Image style={styles.icon} source={require("../../images/sky.png")} />
            <Text style={styles.info}>Good Night</Text>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this._navigate('InstaPreviewList', { title: 'Inspirational', tag: 'inspirationalquote', video: false })}>
          <Card style={styles.menuBox}>
            <Image style={styles.icon} source={require("../../images/lightbulb.png")} />
            <Text style={styles.info}>Inspirational</Text>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this._navigate('InstaPreviewList', { title: 'Motivational', tag: 'motivationalspeaker', video: false })}>
          <Card style={styles.menuBox}>
            <Image style={styles.icon} source={require("../../images/motivate.png")} />
            <Text style={styles.info}>Motivational</Text>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this._navigate('InstaPreviewList', { title: 'Life Quotes', tag: 'quotesaboutlife', video: false })}>
          <Card style={styles.menuBox}>
            <Image style={styles.icon} source={require("../../images/pulse.png")} />
            <Text style={styles.info}>Life Quotes</Text>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this._navigate('InstaPreviewList', { title: 'Health Tips', tag: 'healthtip', video: false })}>
          <Card style={styles.menuBox}>
            <Image style={styles.icon} source={require("../../images/drug.png")} />
            <Text style={styles.info}>Health Tips</Text>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this._navigate('InstaPreviewList', { title: 'Love Quotes', tag: 'lovequotes', video: false })}>
          <Card style={styles.menuBox}>
            <Image style={styles.icon} source={require("../../images/in-love.png")} />
            <Text style={styles.info}>Love Quotes</Text>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this._navigate('InstaPreviewList', { title: 'Status of the Day', tag: 'quotesabouteverything', video: false })}>
          <Card style={styles.menuBox}>
            <Image style={styles.icon} source={require("../../images/cinema.png")} />
            <Text style={styles.info}>Status of the Day</Text>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this._navigate('StatusVideoList', { title: 'Love Songs', tag: 'whatsappstatusvideo', video: false })}>
          <Card style={styles.menuBox}>
            <Image style={styles.icon} source={require("../../images/love-song.png")} />
            <Text style={styles.info}>Love Songs</Text>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this._navigate('StatusVideoList', { title: 'Romantic Songs', tag: 'romanticsong', video: false })}>
          <Card style={styles.menuBox}>
            <Image style={styles.icon} source={require("../../images/love-bird.png")} />
            <Text style={styles.info}>Romantic Songs</Text>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this._navigate('StatusVideoList', { title: 'English Songss', tag: 'englishsongs', video: false })}>
          <Card style={styles.menuBox}>
            <Image style={styles.icon} source={require("../../images/english.png")} />
            <Text style={styles.info}>English Songs</Text>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this._navigate('StatusVideoList', { title: 'Comedy Videos', tag: 'comedyvideos', video: false })}>
          <Card style={styles.menuBox}>
            <Image style={styles.icon} source={require("../../images/comedy.png")} />
            <Text style={styles.info}>Comedy Videos</Text>
          </Card>
        </TouchableWithoutFeedback>
    </View>
    )
  }
  render() {
    return (
      <Container>
          <Content>
            {this.imageStatus()}
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
    backgroundColor: 'transparent',
    backgroundColor: "rgba(0,0,0,0.9)",
    width: width / 3 -5,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: 2
  },
  icon: {
    width: 64,
    height: 64,
  },
  info: {
    top: 7,
    fontSize: 14,
    color: "#ffffff",
  }
});