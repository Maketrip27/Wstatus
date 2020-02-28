import React, { Component } from 'react';
import { Icon, Text, Card, CardItem, Right, Left } from 'native-base';
import { ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from "./Slider";
import styles1, { colors } from './Slider/styles/index.style';
import { sliderWidth, itemWidth } from './Slider/styles/SliderEntry.style';
import _ from 'lodash';

export default class CarouselView extends Component {
  _renderItem = ({ item, index }, parallaxProps) => {
    const { navigation } = this.props;
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        // parallax={true}
        parallaxProps={parallaxProps}
        onClickItem={(item) => navigation && navigation.push(item.path, { ...item })}
      />
    );
  }
  render() {
    const { navigation, data, title } = this.props;
    return (
      <Card style={{ width: "100%", padding: 0 }}>
        <CardItem
          footer
          bordered
        >
          <Text style={{ color: '#01776a', fontWeight: 'bold' }}>{title}</Text>
          <Left />
          <Right >
            <Icon
              name="arrow-forward"
              style={{ color: "#01776a" }}
              onPress={() => navigation && navigation.push("DailyStatus", { data, title })}
            />
          </Right>
        </CardItem>
        <ScrollView style={{ height: 150, padding: 5 }} horizontal={true} showsHorizontalScrollIndicator={false}>
          {_.shuffle(data).map((item, index) => this._renderItem({ item, index }))}
        </ScrollView>
        {/* <Carousel
          ref={(c) => { this._carousel = c; }}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={1}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles1.slider}
          contentContainerCustomStyle={styles1.sliderContentContainer}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        /> */}
      </Card >

    );
  }
}