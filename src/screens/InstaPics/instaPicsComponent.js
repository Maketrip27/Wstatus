import React, { Component } from 'react';
import { Container,Content, Text,Card,CardItem,Icon } from 'native-base';
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
      <View>
      <Card >
        <CardItem header bordered style={{paddingLeft: 0, height: 18}}>
          <Icon style={{color: Config.themeColor, paddingLeft:5}} name="md-images" />
          <Text style={{color: Config.themeColor,fontSize:18}}>Image Status</Text>
        </CardItem>
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
          <TouchableWithoutFeedback onPress={() => this._navigate('InstaPreviewList', { title: 'Miss You', tag: 'missyouquotes', video: false })}>
            <Card style={styles.menuBox}>
              <Image style={styles.icon} source={require("../../images/missyou.png")} />
              <Text style={styles.info}>Miss You</Text>
            </Card>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this._navigate('InstaPreviewList', { title: 'Broken Heart', tag: 'brokenheartquotes', video: false })}>
            <Card style={styles.menuBox}>
              <Image style={styles.icon} source={require("../../images/broken-heart.png")} />
              <Text style={styles.info}>Broken Heart</Text>
            </Card>
          </TouchableWithoutFeedback>
      </View>
    </Card>
    <Card style={{borderRadius:5}}>
        <CardItem header bordered style={{paddingLeft: 0, height: 18}}>
          <Icon style={{color: Config.themeColor, paddingLeft:5}} name="md-videocam" />
          <Text style={{color: Config.themeColor, fontSize:18}}>Video Status</Text>
        </CardItem>
        <View style={styles.container}>
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
          <TouchableWithoutFeedback onPress={() => this._navigate('StatusVideoList', { title: 'Sad Songs', tag: 'sadsong', video: false })}>
            <Card style={styles.menuBox}>
              <Image style={styles.icon} source={require("../../images/sad.png")} />
              <Text style={styles.info}>Sad Songs</Text>
            </Card>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this._navigate('StatusVideoList', { title: 'Creative', tag: 'creativevideo', video: false })}>
            <Card style={styles.menuBox}>
              <Image style={styles.icon} source={require("../../images/creative.png")} />
              <Text style={styles.info}>Creative</Text>
            </Card>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this._navigate('StatusVideoList', { title: 'Comedy', tag: 'comedyvideos', video: false })}>
            <Card style={styles.menuBox}>
              <Image style={styles.icon} source={require("../../images/comedy.png")} />
              <Text style={styles.info}>Comedy</Text>
            </Card>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this._navigate('StatusVideoList', { title: 'Recipes', tag: 'recipevideo', video: false })}>
            <Card style={styles.menuBox}>
              <Image style={styles.icon} source={require("../../images/recipe.png")} />
              <Text style={styles.info}>Recipes</Text>
            </Card>
          </TouchableWithoutFeedback>
        </View>
        </Card>
    </View>
    )
  }
  render() {
    return (
      <Container>
          <Content>
          <AdMopub unitId={Ad.dailyStatus}/>
            {this.imageStatus()}
            {/* <AdMopub unitId={Ad.dailyStatus}/> */}
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
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    borderRadius:5

  },
  icon: {
    width: 64,
    height: 64,
  },
  info: {
    top: 7,
    fontSize: 14,
    color: "black",
    fontWeight: 'bold'
  }
});